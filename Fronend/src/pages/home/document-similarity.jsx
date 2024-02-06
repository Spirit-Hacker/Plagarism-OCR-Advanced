import React, { useRef, useState } from "react";
import "./document-similarity.css"
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import PieChart from "../../components/PieChart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Document = () => {
  const [file, setFile] = useState(null);
  const [plagiarismResult, setPlagiarismResult] = useState(null);
  const [fileUpload, setFileUpload] = useState(false);
  const pdfRef=useRef()
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileUpload(true)
  };

  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()

  const handleGetStarted = async () => {
    try {
      setLoader(true)
      const formData = new FormData();
      formData.append("docfile", file);

      const response = await fetch("http://127.0.0.1:8000/doc_similarity/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Plagiarism check result:", data);

      // Set the plagiarism result in state
      setPlagiarismResult(data);
      setLoader(false);
    } catch (error) {
      console.error("Error occurred during plagiarism check:", error.message);
    }
  };
  const downloadPDF = () => {
    setIsGeneratingPDF(true);
    console.log("Download result of doc similiarity")

    html2canvas(document.body).then(canvas => {
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.width+10, pdf.internal.pageSize.height);
      pdf.save('download.pdf');
      setIsGeneratingPDF(false);
    });
  }
  return (
    <div className={`bg-cover w-full h-[100vh] bg-center text-white bg-[#000814] flex ${loader ? "justify-center items-center" : "justify-center"} px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 overflow-y-auto`}>
      
      {loader ? <Loader/> :
      !plagiarismResult ? 
      <div className="bg-[#000814] w-full flex flex-col items-center rounded-lg overflow-hidden shadow-xl mb-20 mx-auto">
        <h1 className="text-3xl font-semibold mt-10 mb-4 text-center text-white">
          Document Plagiarism
        </h1>
        <div className="flex w-[60%] flex-col items-center justify-center gap-10">
          <div className="w-full flex flex-col items-center justify-center">
            <label htmlFor="file" className="text-lg bg-slate-800 py-2 px-4 rounded-lg cursor-pointer font-semibold mb-2 text-white text-center">Upload Document</label>
            {
              fileUpload && (
                <p className="text-xs text-pink-500 font-semibold">File Added</p>
              )
            }
            <input
              type="file"
              id="file"
              accept=".docx, .pdf, .txt"
              onChange={handleFileChange}
              className="w-full hidden px-3 py-2 text-gray-300 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
            />
          </div>
          <div className="w-full max-w-lg flex flex-col items-center justify-center">
            <button
              onClick={handleGetStarted}
              disabled={!file}
              className="bg-yellow-500 cursor-pointer text-black font-semibold px-4 py-2 rounded block w-full mb-4"
            >
              Submit
            </button>
          </div>
        </div>
      </div> :
          <div className=" w-[80%] flex justify-between items-center">
            <div className="flex flex-col gap-4 pt-10">
              <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Plagiarism Check Result</h2>
              <p ref={pdfRef}><span className="text-lg text-cyan-400 font-semibold">Plagarized Content:</span> {plagiarismResult.percent}%</p>
              {/* <p>Plagiarized Text: {plagiarismResult.plagiarized_text}</p> */}
              <p className="text-lg text-cyan-400 font-semibold">Links:</p>
                <ul className="text-white">
                    {Object.entries(plagiarismResult.link).map(([link, percentage]) => (
                      <li key={link}>{link}: {percentage}%</li>
                    ))}
                </ul>
              <div onClick={() => navigate("/")} className="text-black font-semibold cursor-pointer mt-4 bg-yellow-500 w-[150px] text-center rounded-lg py-2">Go back</div>
            </div>
            <div className="flex flex-col gap-16 justify-end items-end">
          <PieChart ref={pdfRef} data={plagiarismResult.percent}/>
          <div onClick={downloadPDF} disabled={isGeneratingPDF} className="font-semibold bg-yellow-500 py-2 rounded-lg flex items-center justify-center gap-3 cursor-pointer text-black w-[200px]">
              <p>Download Result</p>
              {/* <MdDownload/> */}
            </div> 
          </div>
          </div>
        }
    </div>
  );
};

export default Document;
