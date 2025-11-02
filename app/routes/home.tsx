import type { Route } from "./+types/home";
import Navbar from "../components/Navbar";
import {resumes} from "../../constants";
import type { ReactNode } from "react";
import React from "react";
import ResumeCard from "../components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";





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


  const {auth } = usePuterStore();
  const navigate = useNavigate();

  useEffect(() => {
        if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  return <main className="bg-[url('/images/bg-home.jpg')] bg-cover">
    <Navbar/>
    {}
    <section className="main-section py-16">
      <div className="page-heading">
        <h1>Apply Smart, Track Easy & Get Hired Faster.</h1>
        <h2>Har Application Pe Nazar, Har Resume Pe Sudhaar.</h2>

      </div>
   
  {resumes.length > 0 && (
  <div className="resume-section flex flex-row gap-2">
    {resumes.map((resume) => (
      <ResumeCard
  key={resume.id}
  resume={resume}
  feedback={resume.feedback}
  imagePath={resume.imagePath}
/>
    ))}
  </div>
)}

 </section>
  </main>;
}
