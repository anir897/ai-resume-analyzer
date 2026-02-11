import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        files.forEach(async (file) => {
            await fs.delete(file.path);
        });
        await kv.flush();
        loadFiles();
    };

    if (isLoading) {
        return (
            <main className="bg-[url('/images/bg-home.jpg')] bg-cover min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Loading...</div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="bg-[url('/images/bg-home.jpg')] bg-cover min-h-screen flex items-center justify-center">
                <div className="text-white text-xl">Error {error}</div>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-home.jpg')] bg-cover min-h-screen p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">Authenticated as: {auth.user?.username}</h1>
                    <div className="mb-4">
                        <h2 className="text-xl font-semibold mb-2">Existing files:</h2>
                        <div className="flex flex-col gap-4">
                            {files.map((file) => (
                                <div key={file.id} className="flex flex-row gap-4">
                                    <p>{file.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
                            onClick={() => handleDelete()}
                        >
                            Wipe App Data
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default WipeApp;