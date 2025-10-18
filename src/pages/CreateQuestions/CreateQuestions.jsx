import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import questionsData from "../../assets/questions.json"; // ✅ correct relative path

const CreateQuestions = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    language: "",
    module: "",
    task: "",
    topic: "",
  });

  const [tasks, setTasks] = useState([]);

  const languages = ["Swedish"];
  const modules = ["Writing", "Speaking"];

  // derive topics dynamically from JSON
  const allTopics = [
    "All",
    ...new Set(
      Object.values(questionsData)
        .flat()
        .map((q) => q.chapter_name)
    ),
  ];

  // Update available tasks when module changes
  useEffect(() => {
    if (filters.module === "Writing") {
      setTasks(["All", "Informal Letter", "Formal Letter", "Din åsikt"]);
    } else if (filters.module === "Speaking") {
      setTasks(["All", "Berätta", "Reagera", "Din åsikt"]);
    } else {
      setTasks([]);
    }
  }, [filters.module]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerate = (e) => {
    e.preventDefault();

    const params = new URLSearchParams(filters).toString();
    navigate(`/generate?${params}`);
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
