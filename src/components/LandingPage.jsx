import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-gray-900 mb-4"
      >
        Welcome to Tailwind UI App
      </motion.h1>

      <p className="text-gray-600 mb-8 text-center max-w-md">
        A modern UI built using React + TailwindCSS + shadcn/ui components.
      </p>

      <a
        href="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700"
      >
        Get Started
      </a>
    </div>
  );
}
