import { Link } from "react-router-dom";
import "./guidelines.css"
import { gsap } from "gsap";
import { useLayoutEffect } from "react";

const routes = [
  {
    title: "Text",
    description: "Check plagarism in your text.",
    route: "/text-plagarism",
  },
  {
    title: "File",
    description: "Check plagarism in your documents.",
    route: "/document-plagarism",
  },
  {
    title: "OCR",
    description: "Check for plagiarism in images.",
    route: "/image-plagiarism-check",
  },
  {
    title: "Compare Text",
    description: "Compare multiple texts.",
    route: "/compare-text",
  },
  {
    title: "Compare File",
    description: "Compare multiple documents.",
    route: "/compare-file",
  },
];

const Guidelines = () => {
  const animation = 10;
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const timeLine = gsap.timeline();
      timeLine.from("img", {
        y: -30 + "px",
        duration: 1.7,
        repeat: -1,
        yoyo: true,
      })
      .from(".img", {
        opacity: 0,
        duration: 0.6,
        delay: 1.7
      })
      .from("h1, h5, hr", {
        y: -100 + "px",
        duration: 2,
        stagger: 0.5,
        opacity: 0
      })
    });

    return () => ctx.revert();
  }, [animation]);

  return (
    <div className="bg-[#000814] py-20 px-10 w-full">
      <div className="main w-full flex items-center bg-[#000814] gap-10 text-white">
        <section className="flex flex-col gap-10 w-full relative">
          <div className="flex flex-col gap-4">
            <h5 className="sub-title text-3xl text-start font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Welcome To Plagarism Checker with OCR</h5>
            <hr className="w-[35%] border-slate-600 absolute left-[45%] top-[13%] translate-x-[-50%] translate-y-[-13%]" />
          </div>
          <div className="flex flex-col gap-3 text-start">
            <h1 className="title font-semibold">"Uncover the Truth: Plagiarism Checker with OCR, Your Guardian of Originality!"</h1>
            <h1 className="title font-semibold text-slate-400">"Scan, Detect, Create: Elevate Your Content with Our Plagiarism Checker and OCR Combo!"</h1>
            <h1 className="title font-semibold">"From Ink to Pixels, Ensure Authenticity Every Step of the Way!"</h1>
            <h1 className="title font-semibold text-slate-400">"Stay Ahead of the Curve: Trust Our OCR-Powered Plagiarism Checker for Unmatched Accuracy!"</h1>
            <h1 className="title font-semibold">"Don't Blend In, Stand Out! Verify Your Content's Authenticity Today!"</h1>
            <h1 className="title font-semibold text-slate-400">"No More Copy-Paste Blunders: Let Our Plagiarism Checker with OCR Be Your Content's Shield!"</h1>
          </div>
        </section>
      
        <img src="https://i.ibb.co/6R10B7H/main-01.png" className="img" alt="INFERNO"/>
      </div>
    </div>
  );
};

export default Guidelines;

