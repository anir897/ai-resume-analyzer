import React, { use } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import {type FormEvent, useState} from 'react'

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

}

const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
}


const Upload: React.FC = () => {
    const[isProcessing, setisProcessing] = useState(false);
    const[statusText,setstatusText] = useState('');
  return (
    <main className="bg-[url('/images/bg-home.jpg')] bg-cover">
    <Navbar/>
    <section className="main-section">
        <div className="page-heading">
            <h1>Smarter Resume Insights. Better Career Outcomes.</h1>
            {isProcessing ? (
                        <>
                            <h2>{statusText}</h2>
                            <img src="/images/resume-scan.gif" className="w-full" />
                        </>
                    ) : (
                        <h2>Drop your resume for an ATS score and improvement tips</h2>
                    )}
                     {!isProcessing && (
                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
                            <div className="form-div">
                                <label htmlFor="company-name">Company Name</label>
                                <input type="text" name="company-name" placeholder="Company Name" id="company-name" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-title">Job Title</label>
                                <input type="text" name="job-title" placeholder="Job Title" id="job-title" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="job-description">Job Description</label>
                                <textarea rows={5} name="job-description" placeholder="Job Description" id="job-description" />
                            </div>
                            <div className="form-div">
                                <label htmlFor="uploader">Upload Resume</label>
                                <div>uploader</div>
                            </div>
                            <button className="primary-button" type="submit">
                                Analyze Resume
                            </button>
                            
                        </form>
                    )}
                     
        </div>

    </section>
    </main>
  );
};

export default Upload;
