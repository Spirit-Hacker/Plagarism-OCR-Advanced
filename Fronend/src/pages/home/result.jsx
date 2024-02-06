import React from "react";
import { useParams } from "react-router-dom";

const ResultPage = () => {
    const { data } = useParams();
    console.log("DATA on result page", data)

    return (
        <div className="bg-cover bg-center bg-[#000814] flex h-[110vh]">
            <div className="bg-[#000814] rounded-lg overflow-hidden  p-6 mb-20 mx-auto w-full">
                <h1 className="text-3xl font-bold mt-10 mb-4 text-center text-white">
                    Result
                </h1>
                {true && (
                    <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2 text-white">API Result</h2>
                        <pre className="overflow-auto p-4 border border-slate-800 rounded bg-[#000814] text-white">
                            {data}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ResultPage;
