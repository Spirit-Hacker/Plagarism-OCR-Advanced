import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import PieChart from "../../components/PieChart";
import { MdDownload } from "react-icons/md";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Text = () => {
  const [textInput, setTextInput] = useState('');
  const [result, setResult] = useState(null); // State to store the result
  const navigate = useNavigate();
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [loader, setLoader] = useState(false);
  const pdfRef = useRef();

  const handleTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleGetStarted = async () => {
    try {
      setLoader(true);
      const formData = new URLSearchParams();
      formData.append('q', textInput);
  
      const response = await fetch("http://127.0.0.1:8000/text_similarity/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Plagiarism check result:", data);

      // Set the result data in state
      setResult(data);
      console.log("Text Data : ", data)
      // navigate(`/result${data}`);

      setLoader(false);
    } catch (error) {
      console.error("Error occurred during plagiarism check:", error.message);
      setLoader(false); // Reset loader state
    }
  };

  const downloadPDF = () => {
    setIsGeneratingPDF(true);

    html2canvas(document.body).then(canvas => {
      const pdf = new jsPDF('l', 'mm', 'a4');
      pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, pdf.internal.pageSize.width+10, pdf.internal.pageSize.height);
      pdf.save('download.pdf');
      setIsGeneratingPDF(false);
    });
  }

  return (
    <div className={`bg-cover w-full h-[100vh] bg-center text-white bg-[#000814] flex ${loader ? "justify-center items-center" : "justify-center"} px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 overflow-y-auto`}>
      { loader ? <Loader/> :
        !result ? 
        <div className="w-[60%] rounded-lg overflow-hidden shadow-xl p-6 mt-5 mb-20" ref={pdfRef}>
          <h1 className="text-3xl font-semibold mb-4 text-center text-white">
            Text Plagiarism
          </h1>
          <div className="flex w-[100%] flex-col items-center justify-center gap-6">
            <div className="w-full">
              <h2 className="text-lg font-semibold mb-2 text-left text-white">Enter Text</h2>
              <textarea
                value={textInput}
                onChange={handleTextInputChange}
                className="w-full px-3 py-2 bg-slate-800 placeholder-gray-300 text-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
                rows="10"
                placeholder="Enter your text here..."
              ></textarea>
            </div>
            <div className="w-full max-w-lg flex flex-col items-center justify-center">
              <button
                onClick={handleGetStarted}
                className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded block w-full mb-4"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        :
        
        <div className="text-start w-[80%] flex justify-between items-center">
          <div className="flex flex-col gap-4">
            
            <h2 ref={pdfRef} className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Results</h2>
            <p ref={pdfRef}><span className="text-cyan-400 font-semibold">Plagiarism Percentage:</span> {`${result?.percent}%`}</p>
            <p ref={pdfRef}><span className="text-cyan-400 font-semibold">Plagiarized Text:</span> {`${result?.plagiarized_text}`}</p>
            <p ref={pdfRef} className="font-semibold text-cyan-400">Links:</p>
            <ul ref={pdfRef} className="flex flex-col gap-3">
              {Object.entries(result?.link).map(([link, percentage]) => (
                <li key={link}>{link} : <span className="text-red-500">{percentage}%</span></li>
              ))}
            </ul>
            <div onClick={() => navigate("/")} className="text-black font-semibold cursor-pointer mt-4 bg-yellow-500 w-[150px] text-center rounded-lg py-2">Go back</div>
          </div>
          <div className="flex flex-col gap-16 justify-end items-end">
          <PieChart ref={pdfRef} data={result?.percent}/>
          <div onClick={downloadPDF} disabled={isGeneratingPDF} className="font-semibold bg-yellow-500 py-2 rounded-lg flex items-center justify-center gap-3 cursor-pointer text-black w-[200px]">
              <p>Download Result</p>
              <MdDownload/>
            </div> 
          </div>
        </div>
        
      }
    </div>
  );
};

export default Text;
