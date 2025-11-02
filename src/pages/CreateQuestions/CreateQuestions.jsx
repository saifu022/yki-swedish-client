import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import questionsDataFin from "../../assets/questions_fin_eng.json";
import questionsDataSw from "../../assets/questions_sw_eng.json"; // ✅ correct relative path

const CreateQuestions = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    language: "",
    module: "",
    task: "",
    topic: "",
  });

  const [tasks, setTasks] = useState([]);
  const [allTopics, setAllTopics] = useState([]);

  const languages = ["Swedish", "Finnish"];
  const modules = ["Writing", "Speaking"];

  // derive topics dynamically from JSON

  const findTopics = (language) => {
    if (language === "Swedish") {
      setAllTopics([
        "All",
        ...new Set(
          Object.values(questionsDataSw)
            .flat()
            .map((q) => q.chapter_name_fi)
        ),
      ]);
    } else if (language === "Finnish") {
      setAllTopics([
        "All",
        ...new Set(
          Object.values(questionsDataFin)
            .flat()
            .map((q) => q.chapter_name_fi)
        ),
      ]);
    }

  };

  // Update available tasks when module changes
  useEffect(() => {
    if (filters.language === "Swedish" && filters.module === "Writing") {
      setTasks(["All", "Informal Letter", "Formal Letter", "Din åsikt"]);
      findTopics(filters.language);
    } else if (filters.language === "Swedish" && filters.module === "Speaking") {
      setTasks(["All", "Berätta", "Reagera", "Din åsikt"]);
      findTopics(filters.language);
    } else if (filters.language === "Finnish" && filters.module === "Writing") {
      setTasks(["All", "Informal Letter", "Formal Letter", "Mielipide"]);
      findTopics(filters.language);
    } else if (filters.language === "Finnish" && filters.module === "Speaking") {
      setTasks(["All", "Kertaus", "Situations", "Mielipide"]);
      findTopics(filters.language);
    } else {
      setTasks([]);
    }
  }, [filters.module, filters.language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(filters).toString();
    navigate(`/generate/sw/?${params}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-6">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Yki Questions</h1>

        <form onSubmit={handleGenerate} className="space-y-4">
          {/* Language */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Language</span>
            </label>
            <select
              name="language"
              className="select select-bordered w-full"
              value={filters.language}
              onChange={handleChange}
              required
            >
              <option value="">Select language</option>
              {languages.map((lan) => (
                <option key={lan} value={lan}>
                  {lan}
                </option>
              ))}
            </select>
          </div>

          {/* Module */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Module</span>
            </label>
            <select
              name="module"
              className="select select-bordered w-full"
              value={filters.module}
              onChange={handleChange}
              required
            >
              <option value="">Select module</option>
              {modules.map((mod) => (
                <option key={mod} value={mod}>
                  {mod}
                </option>
              ))}
            </select>
          </div>

          {/* Task */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Task</span>
            </label>
            <select
              name="task"
              className="select select-bordered w-full"
              value={filters.task}
              onChange={handleChange}
              required
              disabled={!tasks.length}
            >
              <option value="">Select task</option>
              {tasks.map((task) => (
                <option key={task} value={task}>
                  {task}
                </option>
              ))}
            </select>
          </div>

          {/* Topic */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Topic</span>
            </label>
            <select
              name="topic"
              className="select select-bordered w-full"
              value={filters.topic}
              onChange={handleChange}
            >
              {allTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </div>

          <div className="pt-4">
            <button type="submit" className="btn btn-primary w-full">
              Generate Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateQuestions;
