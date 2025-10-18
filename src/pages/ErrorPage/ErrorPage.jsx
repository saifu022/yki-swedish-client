import { motion } from "framer-motion";
import { Ghost } from "lucide-react"; // nice icon from lucide-react
import { useNavigate } from "react-router";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center space-y-6"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex justify-center"
        >
          <Ghost className="w-24 h-24 text-indigo-400" />
        </motion.div>

        <h1 className="text-6xl font-extrabold tracking-tight text-indigo-400">
          404
        </h1>

        <h2 className="text-2xl font-semibold text-gray-200">
          Oops! The page you’re looking for has vanished 👻
        </h2>

        <p className="text-gray-400 max-w-md mx-auto">
          It might have been moved, renamed, or never existed.  
          Let’s get you back on track.
        </p>

        <div className="pt-4">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 transition-colors rounded-full font-semibold shadow-lg"
          >
            Take Me Home
          </button>
        </div>
      </motion.div>

      <footer className="absolute bottom-6 text-sm text-gray-500">
        © {new Date().getFullYear()} YKI Question Generator
      </footer>
    </div>
  );
};

export default ErrorPage;
