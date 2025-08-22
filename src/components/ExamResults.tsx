import React from 'react';
import { CheckCircle, XCircle, Clock, Eye, Trophy, RotateCcw, Home } from 'lucide-react';
import type { Module, UserAttempt, Question } from '../types';

interface ExamResultsProps {
  module: Module;
  attempt: UserAttempt;
  questions: Question[];
  onRetakeExam: () => void;
  onBackToDashboard: () => void;
}

export const ExamResults: React.FC<ExamResultsProps> = ({
  module,
  attempt,
  questions,
  onRetakeExam,
  onBackToDashboard,
}) => {
  const percentage = Math.round((attempt.score / attempt.total_questions) * 100);
  const isPassed = percentage >= 70;

  const getGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const grade = getGrade(percentage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Results Header */}
        <div className={`bg-white rounded-2xl shadow-xl overflow-hidden mb-8 border-t-8 ${
          isPassed ? 'border-green-500' : 'border-red-500'
        }`}>
          <div className={`px-8 py-6 ${isPassed ? 'bg-green-50' : 'bg-red-50'}`}>
            <div className="flex items-center justify-center mb-4">
              {isPassed ? (
                <CheckCircle className="w-16 h-16 text-green-500" />
              ) : (
                <XCircle className="w-16 h-16 text-red-500" />
              )}
            </div>
            
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-2">
              {isPassed ? 'Congratulations!' : 'Keep Trying!'}
            </h1>
            
            <p className="text-center text-gray-600 mb-6">
              You've completed the <strong>{module.title}</strong> exam
            </p>

            {/* Score Display */}
            <div className="text-center">
              <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full text-4xl font-bold ${
                isPassed 
                  ? 'bg-green-100 text-green-700 border-4 border-green-500' 
                  : 'bg-red-100 text-red-700 border-4 border-red-500'
              }`}>
                {percentage}%
              </div>
              
              <div className="mt-4 flex justify-center space-x-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{attempt.score}</p>
                  <p className="text-sm text-gray-600">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{attempt.total_questions - attempt.score}</p>
                  <p className="text-sm text-gray-600">Incorrect</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{grade}</p>
                  <p className="text-sm text-gray-600">Grade</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="px-8 py-6 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
                <Clock className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Time Taken</p>
                  <p className="text-xl font-bold text-blue-700">{attempt.time_taken_minutes} min</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-purple-50 rounded-lg">
                <Trophy className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions</p>
                  <p className="text-xl font-bold text-purple-700">{attempt.total_questions}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center p-4 bg-orange-50 rounded-lg">
                <Eye className="w-8 h-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Violations</p>
                  <p className="text-xl font-bold text-orange-700">{attempt.proctoring_violations}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Results */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="px-8 py-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Question Review</h2>
            <p className="text-gray-600">Review your answers and see the correct solutions</p>
          </div>
          
          <div className="p-8">
            <div className="space-y-6">
              {questions.map((question, index) => {
                const userAnswer = attempt.answers[question.id];
                const isCorrect = userAnswer === question.correct_answer;
                
                return (
                  <div key={question.id} className={`p-6 rounded-lg border-2 ${
                    isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                  }`}>
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Q{index + 1}. {question.question_text}
                      </h3>
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 ml-4" />
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Your Answer:</p>
                        <div className={`p-3 rounded-lg ${
                          userAnswer ? (isCorrect ? 'bg-green-100' : 'bg-red-100') : 'bg-gray-100'
                        }`}>
                          {userAnswer ? (
                            <span className="font-medium">
                              {userAnswer.toUpperCase()}) {question[`option_${userAnswer}` as keyof Question]}
                            </span>
                          ) : (
                            <span className="text-gray-500 italic">No answer selected</span>
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-2">Correct Answer:</p>
                        <div className="p-3 rounded-lg bg-green-100">
                          <span className="font-medium text-green-800">
                            {question.correct_answer.toUpperCase()}) {question[`option_${question.correct_answer}` as keyof Question]}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onBackToDashboard}
            className="flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Dashboard
          </button>
          
          <button
            onClick={onRetakeExam}
            className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Retake Exam
          </button>
        </div>

        {/* Performance Message */}
        <div className="mt-8 text-center">
          {isPassed ? (
            <div className="bg-green-100 border border-green-300 rounded-lg p-6">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-green-800 mb-2">Excellent Work!</h3>
              <p className="text-green-700">
                You've successfully passed the {module.title} exam with a score of {percentage}%. 
                Keep up the great work and continue learning!
              </p>
            </div>
          ) : (
            <div className="bg-amber-100 border border-amber-300 rounded-lg p-6">
              <Trophy className="w-12 h-12 text-amber-500 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-amber-800 mb-2">Keep Practicing!</h3>
              <p className="text-amber-700">
                You scored {percentage}% on the {module.title} exam. 
                Review the concepts and try again when you're ready. You need 70% to pass.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};