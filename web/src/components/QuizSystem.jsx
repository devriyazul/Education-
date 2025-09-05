import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Clock, Trophy, RotateCcw, ChevronRight } from "lucide-react";

const sampleQuestions = [
  {
    id: 1,
    type: "multiple-choice",
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "High Tech Modern Language", 
      "Home Tool Markup Language",
      "Hyperlink Text Management Language"
    ],
    correctAnswer: 0,
    explanation: "HTML stands for HyperText Markup Language, which is the standard markup language for creating web pages."
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "Which CSS property is used to change the text color?",
    options: [
      "text-color",
      "color",
      "font-color", 
      "text-style"
    ],
    correctAnswer: 1,
    explanation: "The 'color' property in CSS is used to set the color of text."
  },
  {
    id: 3,
    type: "true-false",
    question: "JavaScript is the same as Java programming language.",
    correctAnswer: false,
    explanation: "JavaScript and Java are completely different programming languages with different purposes and syntax."
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "What is the correct way to create a function in JavaScript?",
    options: [
      "function = myFunction() {}",
      "function myFunction() {}",
      "create myFunction() {}",
      "def myFunction() {}"
    ],
    correctAnswer: 1,
    explanation: "The correct syntax to create a function in JavaScript is 'function myFunction() {}'."
  },
  {
    id: 5,
    type: "fill-blank",
    question: "The _____ tag is used to create a paragraph in HTML.",
    correctAnswer: "p",
    explanation: "The <p> tag is used to define a paragraph in HTML."
  }
];

function MultipleChoiceQuestion({ question, selectedAnswer, onAnswerSelect, showResult }) {
  return (
    <div className="space-y-3">
      {question.options.map((option, index) => {
        let bgColor = "bg-white dark:bg-[#262626] border-[#E3E8F4] dark:border-[#374151]";
        let textColor = "text-[#1F2937] dark:text-[#E5E7EB]";
        
        if (showResult) {
          if (index === question.correctAnswer) {
            bgColor = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
            textColor = "text-green-800 dark:text-green-300";
          } else if (index === selectedAnswer && index !== question.correctAnswer) {
            bgColor = "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
            textColor = "text-red-800 dark:text-red-300";
          }
        } else if (selectedAnswer === index) {
          bgColor = "bg-[#EBF4FF] dark:bg-blue-900/20 border-[#2563EB] dark:border-blue-600";
          textColor = "text-[#2563EB] dark:text-blue-400";
        }

        return (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(index)}
            disabled={showResult}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200
              ${bgColor} ${textColor}
              ${!showResult ? 'hover:border-[#2563EB] dark:hover:border-blue-600' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                {String.fromCharCode(65 + index)}. {option}
              </span>
              {showResult && index === question.correctAnswer && (
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              )}
              {showResult && index === selectedAnswer && index !== question.correctAnswer && (
                <XCircle size={20} className="text-red-600 dark:text-red-400" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function TrueFalseQuestion({ question, selectedAnswer, onAnswerSelect, showResult }) {
  const options = ["True", "False"];
  
  return (
    <div className="space-y-3">
      {options.map((option, index) => {
        const isTrue = index === 0;
        const isCorrect = (isTrue && question.correctAnswer) || (!isTrue && !question.correctAnswer);
        
        let bgColor = "bg-white dark:bg-[#262626] border-[#E3E8F4] dark:border-[#374151]";
        let textColor = "text-[#1F2937] dark:text-[#E5E7EB]";
        
        if (showResult) {
          if (isCorrect) {
            bgColor = "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700";
            textColor = "text-green-800 dark:text-green-300";
          } else if (selectedAnswer === isTrue && !isCorrect) {
            bgColor = "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700";
            textColor = "text-red-800 dark:text-red-300";
          }
        } else if (selectedAnswer === isTrue) {
          bgColor = "bg-[#EBF4FF] dark:bg-blue-900/20 border-[#2563EB] dark:border-blue-600";
          textColor = "text-[#2563EB] dark:text-blue-400";
        }

        return (
          <button
            key={index}
            onClick={() => !showResult && onAnswerSelect(isTrue)}
            disabled={showResult}
            className={`
              w-full p-4 rounded-lg border-2 text-left transition-all duration-200
              ${bgColor} ${textColor}
              ${!showResult ? 'hover:border-[#2563EB] dark:hover:border-blue-600' : ''}
            `}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium text-lg">{option}</span>
              {showResult && isCorrect && (
                <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
              )}
              {showResult && selectedAnswer === isTrue && !isCorrect && (
                <XCircle size={20} className="text-red-600 dark:text-red-400" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function FillBlankQuestion({ question, selectedAnswer, onAnswerSelect, showResult }) {
  const isCorrect = selectedAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase();
  
  let inputClasses = "w-full p-3 border-2 rounded-lg font-medium bg-white dark:bg-[#262626] text-[#1F2937] dark:text-[#E5E7EB]";
  
  if (showResult) {
    if (isCorrect) {
      inputClasses += " border-green-200 dark:border-green-700 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300";
    } else {
      inputClasses += " border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300";
    }
  } else {
    inputClasses += " border-[#E3E8F4] dark:border-[#374151] focus:border-[#2563EB] dark:focus:border-blue-600 focus:outline-none";
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-[#1F2937] dark:text-[#E5E7EB]">
        {question.question.split('_____').map((part, index, array) => (
          <span key={index}>
            {part}
            {index < array.length - 1 && (
              <input
                type="text"
                value={selectedAnswer || ''}
                onChange={(e) => !showResult && onAnswerSelect(e.target.value)}
                disabled={showResult}
                className={`inline-block mx-2 px-2 py-1 min-w-[120px] text-center ${inputClasses}`}
                placeholder="Type your answer..."
              />
            )}
          </span>
        ))}
      </p>
      
      {showResult && (
        <div className="mt-4">
          {isCorrect ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle size={20} className="mr-2" />
              <span>Correct!</span>
            </div>
          ) : (
            <div className="flex items-center text-red-600 dark:text-red-400">
              <XCircle size={20} className="mr-2" />
              <span>Correct answer: {question.correctAnswer}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function QuizSystem({ title = "Web Development Quiz", timeLimit = 300 }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    sampleQuestions.forEach((question, index) => {
      const userAnswer = answers[index];
      if (question.type === "multiple-choice") {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === "true-false") {
        if (userAnswer === question.correctAnswer) correct++;
      } else if (question.type === "fill-blank") {
        if (userAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase()) correct++;
      }
    });
    return correct;
  };

  const handleSubmitQuiz = () => {
    setQuizCompleted(true);
    setShowResults(true);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setTimeLeft(timeLimit);
  };

  const handleRetakeQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setTimeLeft(timeLimit);
  };

  if (!quizStarted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-8 text-center">
          <div className="mb-6">
            <Trophy size={64} className="mx-auto text-[#2563EB] dark:text-[#3B82F6] mb-4" />
            <h2 className="font-poppins font-bold text-2xl text-[#1F2937] dark:text-[#E5E7EB] mb-2">
              {title}
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF]">
              Test your knowledge with this interactive quiz
            </p>
          </div>

          <div className="bg-[#F3F4F6] dark:bg-[#374151] rounded-lg p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="font-bold text-2xl text-[#2563EB] dark:text-[#3B82F6]">
                  {sampleQuestions.length}
                </div>
                <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Questions</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-[#2563EB] dark:text-[#3B82F6]">
                  {formatTime(timeLimit)}
                </div>
                <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Time Limit</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-[#2563EB] dark:text-[#3B82F6]">
                  {Math.round((1 / sampleQuestions.length) * 100)}%
                </div>
                <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">Per Question</div>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const percentage = Math.round((score / sampleQuestions.length) * 100);
    
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-8">
          {/* Results Header */}
          <div className="text-center mb-8">
            <Trophy size={64} className={`mx-auto mb-4 ${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`} />
            <h2 className="font-poppins font-bold text-3xl text-[#1F2937] dark:text-[#E5E7EB] mb-2">
              Quiz Completed!
            </h2>
            <p className="text-[#6B7280] dark:text-[#9CA3AF] text-lg">
              You scored {score} out of {sampleQuestions.length} questions
            </p>
          </div>

          {/* Score Display */}
          <div className="bg-[#F3F4F6] dark:bg-[#374151] rounded-lg p-6 mb-8 text-center">
            <div className={`text-6xl font-bold mb-2 ${percentage >= 70 ? 'text-green-500' : percentage >= 50 ? 'text-yellow-500' : 'text-red-500'}`}>
              {percentage}%
            </div>
            <div className="text-[#6B7280] dark:text-[#9CA3AF]">
              {percentage >= 70 ? 'Excellent!' : percentage >= 50 ? 'Good job!' : 'Keep practicing!'}
            </div>
          </div>

          {/* Question Review */}
          <div className="space-y-6 mb-8">
            <h3 className="font-montserrat font-bold text-xl text-[#1F2937] dark:text-[#E5E7EB]">
              Review Your Answers
            </h3>
            
            {sampleQuestions.map((question, index) => {
              const userAnswer = answers[index];
              let isCorrect = false;
              
              if (question.type === "multiple-choice") {
                isCorrect = userAnswer === question.correctAnswer;
              } else if (question.type === "true-false") {
                isCorrect = userAnswer === question.correctAnswer;
              } else if (question.type === "fill-blank") {
                isCorrect = userAnswer?.toLowerCase().trim() === question.correctAnswer.toLowerCase();
              }

              return (
                <div key={index} className="border border-[#E3E8F4] dark:border-[#374151] rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h4 className="font-medium text-[#1F2937] dark:text-[#E5E7EB] flex-1">
                      {index + 1}. {question.question}
                    </h4>
                    <div className={`ml-4 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                      {isCorrect ? <CheckCircle size={20} /> : <XCircle size={20} />}
                    </div>
                  </div>
                  
                  <div className="bg-[#F8F9FA] dark:bg-[#262626] rounded-lg p-4 text-sm">
                    <div className="text-[#6B7280] dark:text-[#9CA3AF]">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center">
            <button
              onClick={handleRetakeQuiz}
              className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Quiz Header */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-poppins font-bold text-xl text-[#1F2937] dark:text-[#E5E7EB]">
            {title}
          </h2>
          <div className="flex items-center gap-2 text-[#2563EB] dark:text-[#3B82F6]">
            <Clock size={20} />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-[#E5E7EB] dark:bg-[#374151] rounded-full h-2 mb-2">
          <div 
            className="bg-[#2563EB] dark:bg-[#3B82F6] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-sm text-[#6B7280] dark:text-[#9CA3AF]">
          Question {currentQuestion + 1} of {sampleQuestions.length}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#E3E8F4] dark:border-[#2A2A2A] p-8 mb-6">
        <div className="mb-6">
          <h3 className="font-montserrat font-bold text-xl text-[#1F2937] dark:text-[#E5E7EB] mb-4">
            {currentQuestion + 1}. {question.question}
          </h3>
          
          <div className="inline-block bg-[#EBF4FF] dark:bg-blue-900/20 text-[#2563EB] dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium mb-6">
            {question.type === "multiple-choice" ? "Multiple Choice" : 
             question.type === "true-false" ? "True/False" : "Fill in the Blank"}
          </div>
        </div>

        {/* Question Content */}
        {question.type === "multiple-choice" && (
          <MultipleChoiceQuestion
            question={question}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            showResult={false}
          />
        )}
        
        {question.type === "true-false" && (
          <TrueFalseQuestion
            question={question}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            showResult={false}
          />
        )}
        
        {question.type === "fill-blank" && (
          <FillBlankQuestion
            question={question}
            selectedAnswer={answers[currentQuestion]}
            onAnswerSelect={handleAnswerSelect}
            showResult={false}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
          disabled={currentQuestion === 0}
          className="bg-[#F3F4F6] dark:bg-[#374151] text-[#6B7280] dark:text-[#9CA3AF] px-6 py-3 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentQuestion === sampleQuestions.length - 1 ? (
          <button
            onClick={handleSubmitQuiz}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(prev => prev + 1)}
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
          >
            Next
            <ChevronRight size={20} />
          </button>
        )}
      </div>
    </div>
  );
}