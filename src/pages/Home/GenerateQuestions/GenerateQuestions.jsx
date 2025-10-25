import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import questionsData from "../../../assets/questions.json";

const GenerateQuestion = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);

  const query = new URLSearchParams(location.search);
  const moduleType = query.get("module");
  const task = query.get("task");
  const topic = query.get("topic");

  useEffect(() => {
    if (!moduleType) return;

    const getFiltered = (key, count = 1) => {
      let items = questionsData[key] || [];
      if (topic && topic !== "All") {
        items = items.filter((q) => q.chapter_name === topic);
      }
      if (items.length <= count) return items;
      const shuffled = [...items].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    let generated = [];

    if (moduleType === "Writing") {
      if (task === "All" || !task) {
        // Full writing set
        generated = [
          ...getFiltered("informal_letter", 1),
          ...getFiltered("formal_letter", 1),
          ...getFiltered("Din åsikt_writting", 1),
        ];
      } else if (task === "Informal Letter") {
        generated = getFiltered("informal_letter", 1);
      } else if (task === "Formal Letter") {
        generated = getFiltered("formal_letter", 1);
      } else if (task === "Din åsikt") {
        generated = getFiltered("Din åsikt_writting", 1);
      }
    } else if (moduleType === "Speaking") {
      if (task === "All" || !task) {
        // Full speaking set
        generated = [
          ...getFiltered("Berätta", 1),
          ...getFiltered("reagera", 5),
          ...getFiltered("Din åsikt_speaking", 1),
        ];
      } else if (task === "Berätta") {
        generated = getFiltered("Berätta", 1);
      } else if (task === "Reagera") {
        generated = getFiltered("reagera", 1);
      } else if (task === "Din åsikt") {
        generated = getFiltered("Din åsikt_speaking", 1);
      }
    }

    setQuestions(generated);
  }, [moduleType, task, topic]);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-3xl bg-base-100 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Yki {moduleType} Question
        </h1>

        {(moduleType === "Speaking") ?
          <h2 className="text-sm text-gray-500 mb-3">
            <strong>**Dialogs cannot be generated yet!</strong>
          </h2> : <></>
        }

        {questions.length === 0 ? (
          <p className="text-center text-gray-600">
            No questions found. Try adjusting your filters.
          </p>
        ) : (
          <div className="space-y-8">
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
                <h2 className="text-sm text-gray-500 mb-3">
                  <strong>Question Type:</strong> {q.question_type}
                </h2>
                <h3 className="text-lg font-semibold mb-2">
                  {idx + 1}. {q.question_title}
                </h3>
                {q.sub_questions && q.sub_questions.length > 0 && (
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    {q.sub_questions.map((sub, i) => (
                      <li key={i}>{sub}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button onClick={handleBack} className="btn btn-secondary">
            Back to home
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerateQuestion;
