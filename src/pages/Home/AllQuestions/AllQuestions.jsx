import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import questionsData from "../../../assets/questions.json";

const AllQuestions = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);

    const query = new URLSearchParams(location.search);
    const moduleType = query.get("module"); // Writing or Speaking

    useEffect(() => {
        if (!moduleType) return;

        let list = [];

        if (moduleType === "Writing") {
            list = [
                ...questionsData["informal_letter"],
                ...questionsData["formal_letter"],
                ...questionsData["Din åsikt_writting"],
            ];
        } else if (moduleType === "Speaking") {
            list = [
                ...questionsData["Berätta"],
                ...questionsData["reagera"],
                ...questionsData["Din åsikt_speaking"],
            ];
        }

        setQuestions(list);
    }, [moduleType]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-base-200 p-6">
            <div className="w-full max-w-4xl bg-base-100 shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    All YKI {moduleType} Questions
                </h1>

                <div className="space-y-6">
                    {questions.map((q, idx) => (
                        <div
                            key={idx}
                            className="relative border border-base-300 rounded-xl p-4 shadow-sm"
                        >
                            {/* Copy Button */}
                            <button
                                onClick={() => {
                                    const fullText = `${q.question_title}${q.sub_questions?.length
                                        ? "\n• " + q.sub_questions.join("\n• ")
                                        : ""
                                        }`;

                                    navigator.clipboard.writeText(fullText);

                                    const btn = document.getElementById(`copy-${idx}`);
                                    btn.innerText = "Copied!";
                                    setTimeout(() => {
                                        btn.innerText = "Copy again";
                                    }, 5200);
                                }}
                                id={`copy-${idx}`}
                                className="absolute top-2 right-2 btn btn-xs flex items-center gap-1 text-sm text-gray-600 hover:text-primary cursor-pointer"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8 7H6a2 2 0 00-2 2v9a2 2 0 002 2h9a2 2 0 002-2v-2M15 3h2a2 2 0 012 2v9a2 2 0 01-2 2h-2M15 3H6a2 2 0 00-2 2v9"
                                    />
                                </svg>
                                <span className="copy-text">Copy</span>
                            </button>

                            {/* Question Data */}
                            <p className="text-xs text-gray-500 mb-1">
                                <strong>{q.question_type}</strong>
                            </p>
                            <h3 className="text-lg font-semibold mb-2">
                                {idx + 1}. {q.question_title}
                            </h3>

                            {q.sub_questions?.length > 0 && (
                                <ul className="list-disc pl-6 space-y-1 text-sm">
                                    {q.sub_questions.map((sub, i) => (
                                        <li key={i}>{sub}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <button onClick={() => navigate(-1)} className="btn btn-secondary">
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllQuestions;
