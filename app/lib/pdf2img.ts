export interface PdfConversionResult {
    imageUrl: string;
    file: File | null;
    error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
    if (pdfjsLib) return pdfjsLib;
    if (loadPromise) return loadPromise;

    isLoading = true;
    loadPromise = (async () => {
        try {
            // Import pdfjs-dist - for v5.x, use the main export
            // @ts-ignore - pdfjs-dist types may not be fully compatible
            const lib = await import("pdfjs-dist");
            
            // Set the worker source - use CDN to match the installed version
            // This ensures the worker version matches the library version
            if (lib.GlobalWorkerOptions) {
                // Get the version from the library itself to ensure it matches
                const version = lib.version || "5.4.394";
                // Use jsDelivr CDN to get the worker that matches the installed version
                lib.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
            }
            
            pdfjsLib = lib;
            isLoading = false;
            return lib;
        } catch (err) {
            isLoading = false;
            loadPromise = null;
            console.error("Failed to load PDF.js:", err);
            throw new Error(`Failed to load PDF.js: ${err}`);
        }
    })();

    return loadPromise;
}

export async function convertPdfToImage(
    file: File
): Promise<PdfConversionResult> {
    try {
        const lib = await loadPdfJs();

        // Check if getDocument is available in the lib
        if (!lib.getDocument) {
            throw new Error("PDF.js getDocument method not found. The library may not be loaded correctly.");
        }

        const arrayBuffer = await file.arrayBuffer();
        const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
        const page = await pdf.getPage(1);

        const viewport = page.getViewport({ scale: 4 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        if (context) {
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = "high";
        }

        await page.render({ canvasContext: context!, viewport }).promise;

        return new Promise((resolve) => {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        // Create a File from the blob with the same name as the pdf
                        const originalName = file.name.replace(/\.pdf$/i, "");
                        const imageFile = new File([blob], `${originalName}.png`, {
                            type: "image/png",
                        });

                        resolve({
                            imageUrl: URL.createObjectURL(blob),
                            file: imageFile,
                        });
                    } else {
                        resolve({
                            imageUrl: "",
                            file: null,
                            error: "Failed to create image blob",
                        });
                    }
                },
                "image/png",
                1.0
            ); // Set quality to maximum (1.0)
        });
    } catch (err) {
        console.error("PDF conversion error:", err);
        const errorMessage = err instanceof Error ? err.message : String(err);
        return {
            imageUrl: "",
            file: null,
            error: `Failed to convert PDF: ${errorMessage}`,
        };
    }
}