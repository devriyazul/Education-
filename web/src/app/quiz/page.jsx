import QuizSystem from "../../components/QuizSystem";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-[#F7F9FC] dark:bg-[#121212] transition-colors duration-200">
      <main className="p-4 md:p-6">
        <QuizSystem 
          title="Web Development Fundamentals Quiz"
          timeLimit={600} // 10 minutes
        />
      </main>
    </div>
  );
}