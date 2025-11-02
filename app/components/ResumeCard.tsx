import React from "react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import ScoreCircle from "./ScoreCircle";


const ResumeCard: React.FC<{ resume: Resume ; feedback: Feedback ; imagePath : string}> = ({ resume,feedback,imagePath ,}) => {
  return (
   
        <Link to={`/resume/${resume.id}`} className="flex-col gap-2 resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header flex">
                <div className="flex flex-col gap-2">
                    <h2 className="text-black font-bold break-word">
                    {resume.companyName}
                    </h2>
                    <h3 className="text-lg break-word text-gray-500">
                    {resume.jobTitle}
                    </h3>
                </div>
                <div className="shrink-0 ">
                    <ScoreCircle score={feedback.overallScore}/>

                </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full ">
                    <img src={imagePath} alt="resume" className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"/>
                </div>
            </div>
            
        </Link>
  );
};

export default ResumeCard