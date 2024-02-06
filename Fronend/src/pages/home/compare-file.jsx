import React, { useState } from "react";
import Loader from "../../components/Loader";
import PieChart from "../../components/PieChart";
import { useNavigate } from "react-router-dom";

const FileComparison = () => {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [comparisonResult, setComparisonResult] = useState(null);
  const [loader, setLoader] = useState(false);
  const [fileUpload1, setFileUpload1] = useState(false);
  const [fileUpload2, setFileUpload2] = useState(false);
  const navigate = useNavigate();

  const handleFile1Change = (e) => {
    setFile1(e.target.files[0]);
    setFileUpload1(true);
  };

  const handleFile2Change = (e) => {
    setFile2(e.target.files[0]);
    setFileUpload2(true);
  };

  const handleCompareFiles = async () => {
    try {
      setLoader(true);
      const formData = new FormData();
      formData.append("docfile1", file1);
      formData.append("docfile2", file2);

      const response = await fetch("http://127.0.0.1:8000/two_file_comparison/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await response.json();
      console.log("Comparison result:", data);
      setComparisonResult(data.result);
      setLoader(false);
    } catch (error) {
      console.error("Error occurred during comparison:", error.message);
    }
  };

  return (
    <div className={`bg-cover w-full h-[100vh] bg-center text-white bg-[#000814] flex ${loader ? "justify-center items-center" : "justify-center"} px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-14 overflow-y-auto`}>
      { loader ? <Loader/> :
      !comparisonResult ?
      <div className="bg-[#000814] w-full flex flex-col items-center rounded-lg overflow-hidden shadow-xl mb-20 mx-auto">
        <h1 className="text-3xl font-semibold mt-10 mb-4 text-start text-white">
          File Comparison
        </h1>
        <div className="flex flex-col w-[30%]">
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="file1" className="text-lg w-full bg-slate-800 py-2 px-4 rounded-lg cursor-pointer font-semibold mb-2 text-white text-center">Upload File 1</label>
              {
                fileUpload1 && (
                  <p className="text-xs text-pink-500 font-semibold">File Added</p>
                )
              }
              <input
                type="file"
                id="file1"
                accept=".docx, .pdf, .txt"
                onChange={handleFile1Change}
                className="w-full hidden px-3 py-2 text-gray-300 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label htmlFor="file2" className="text-lg w-full bg-slate-800 py-2 px-4 rounded-lg cursor-pointer font-semibold mb-2 text-white text-center">Upload File 2</label>
              {
                fileUpload2 && (
                  <p className="text-xs text-pink-500 font-semibold">File Added</p>
                )
              }
              <input
                type="file"
                id="file2"
                accept=".docx, .pdf, .txt"
                onChange={handleFile2Change}
                className="w-full hidden px-3 py-2 text-gray-300 placeholder-gray-300 border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              />
            </div>
        </div>
        <div className="flex w-[40%] justify-center mt-6">
          <button
            onClick={handleCompareFiles}
            className="bg-yellow-500 w-full text-black font-semibold px-6 py-3 rounded"
          >
            Compare Files
          </button>
        </div>
      </div>
      :
        <div className="flex w-[80%] justify-between">
          <div className="mt-6 flex flex-col gap-4">
            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB]">Comparison Result</h2>
            <p><span className="text-cyan-400 font-semibold">Similarity: </span>{`${comparisonResult}%`}</p>
            <div onClick={() => navigate("/")} className="text-black font-semibold cursor-pointer mt-4 bg-yellow-500 w-[150px] text-center rounded-lg py-2">Go back</div>
          </div>
          <PieChart data={comparisonResult}/>
        </div>
      }
    </div>
  );
};

export default FileComparison;
