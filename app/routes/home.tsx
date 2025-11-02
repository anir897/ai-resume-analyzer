import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import {resumes} from "../../constants";
import type { ReactNode } from "react";
import React from "react";
import ResumeCard from "../components/ResumeCard";




export function meta({}: Route.MetaArgs) {
  return [
    { title: "ResumeGuru" },
    { name: "description", content: "A friendly assistant that helps you get hired." },
  ];
}

export default function Home() {
  function callbackfn(value: Resume, index: number, array: Resume[]): ReactNode {
    throw new Error("Function not implemented.");
  }

  return <main className="bg-[url('/images/bg-main.svg')] bg-cover">
    <Navbar/>
    <section className="main-section">
      <div className="page-heading">
        <h1>Apply Smart, Track Easy & Get Hired Faster.</h1>
        <h2>Har Application Pe Nazar, Har Resume Pe Sudhaar.</h2>

      </div>
    </section>
  {resumes.length > 0 && (
  <div className="resume-section">
    {resumes.map((resume) => (
      <ResumeCard key={resume.id} resume={resume} />
    ))}
  </div>
)}


  </main>;
}
