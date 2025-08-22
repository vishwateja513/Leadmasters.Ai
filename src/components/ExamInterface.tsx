import React, { useState, useEffect, useCallback } from 'react';
import { Clock, AlertTriangle, CheckCircle, ArrowLeft, ArrowRight, Flag, Eye } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import type { Module, Question, UserAttempt } from '../types';

interface ExamInterfaceProps {
  module: Module;
  violations: string[];
  violationCount: number;
  isFullscreen: boolean;
  onExamComplete: (attempt: UserAttempt) => void;
  onBack: () => void;
}

export const ExamInterface: React.FC<ExamInterfaceProps> = ({
  module,
  violations,
  violationCount,
  isFullscreen,
  onExamComplete,
  onBack,
}) => {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(module.duration_minutes * 60);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    fetchQuestions();
  }, [module.id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchQuestions = async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('module_id', module.id)
        .order('question_number');

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = useCallback((questionId: string, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  }, []);

  const handleSubmitExam = async () => {
    if (submitting) return;
    setSubmitting(true);

    try {
      // Calculate score
      const score = questions.reduce((total, question) => {
        return total + (answers[question.id] === question.correct_answer ? 1 : 0);
      }, 0);

      const timeTaken = Math.ceil((module.duration_minutes * 60 - timeLeft) / 60);

      const attemptData = {
        user_id: user?.id,
        module_id: module.id,
        score,
        total_questions: questions.length,
        time_taken_minutes: timeTaken,
        answers,
        proctoring_violations: violationCount,
        completed_at: new Date().toISOString(),
      };

      const { data, error } = await supabase
        .from('user_attempts')
        .insert([attemptData])
        .select()
        .single();

      if (error) throw error;

      // Exit fullscreen
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }

      onExamComplete(data);
    } catch (error) {
      console.error('Error submitting exam:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading exam questions...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const answeredQuestions = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold">{module.title}</h1>
            <span className="ml-4 text-gray-400">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            {/* Proctoring Status */}
            <div className="flex items-center">
              <Eye className={`w-5 h-5 mr-2 ${isFullscreen ? 'text-green-500' : 'text-red-500'}`} />
              <span className={`text-sm ${isFullscreen ? 'text-green-500' : 'text-red-500'}`}>
                {isFullscreen ? 'Secure Mode' : 'Exit Fullscreen Detected!'}
              </span>
              {violationCount > 0 && (
                <span className="ml-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs">
                  {violationCount} violations
                </span>
              )}
            </div>
            
            {/* Timer */}
            <div className="flex items-center">
              <Clock className={`w-5 h-5 mr-2 ${timeLeft < 300 ? 'text-red-500' : 'text-blue-500'}`} />
              <span className={`font-mono text-lg ${timeLeft < 300 ? 'text-red-500' : 'text-blue-500'}`}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4">
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {answeredQuestions} of {questions.length} questions answered
          </p>
        </div>
      </div>

      {/* Violation Warning */}
      {!isFullscreen && (
        <div className="bg-red-600 px-6 py-3 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          <span className="text-sm">
            Please return to fullscreen mode immediately. This violation has been recorded.
          </span>
        </div>
      )}

      <div className="flex flex-1">
        {/* Question Navigation Sidebar */}
        <div className="w-64 bg-gray-800 border-r border-gray-700 p-4 h-screen overflow-y-auto">
          <h3 className="font-semibold mb-4 text-gray-300">Question Navigator</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => (
              <button
                key={question.id}
                onClick={() => setCurrentQuestionIndex(index)}
                className={`w-10 h-10 rounded text-sm font-medium transition-colors ${
                  currentQuestionIndex === index
                    ? 'bg-blue-600 text-white'
                    : answers[question.id]
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-600 hover:bg-gray-500 text-gray-300'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          
          <div className="mt-6 space-y-2 text-sm text-gray-400">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
              <span>Current</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-600 rounded mr-2"></div>
              <span>Answered</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-gray-600 rounded mr-2"></div>
              <span>Not answered</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {currentQuestion && (
            <div className="max-w-4xl mx-auto">
              {/* Question */}
              <div className="bg-gray-800 rounded-lg p-8 mb-6">
                <div className="flex items-center mb-4">
                  <Flag className="w-5 h-5 text-blue-500 mr-2" />
                  <span className="text-sm text-gray-400">Question {currentQuestion.question_number}</span>
                </div>
                <h2 className="text-xl font-semibold mb-6 leading-relaxed">
                  {currentQuestion.question_text}
                </h2>

                {/* Options */}
                <div className="space-y-4">
                  {[
                    { key: 'a', text: currentQuestion.option_a },
                    { key: 'b', text: currentQuestion.option_b },
                    { key: 'c', text: currentQuestion.option_c },
                    { key: 'd', text: currentQuestion.option_d },
                  ].map((option) => (
                    <label
                      key={option.key}
                      className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                        answers[currentQuestion.id] === option.key
                          ? 'bg-blue-600 border-blue-500'
                          : 'bg-gray-700 hover:bg-gray-600 border-gray-600'
                      } border-2`}
                    >
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={option.key}
                        checked={answers[currentQuestion.id] === option.key}
                        onChange={(e) => handleAnswerSelect(currentQuestion.id, e.target.value)}
                        className="sr-only"
                      />
                      <div className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                        answers[currentQuestion.id] === option.key
                          ? 'border-white bg-white'
                          : 'border-gray-400'
                      }`}>
                        {answers[currentQuestion.id] === option.key && (
                          <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                        )}
                      </div>
                      <span className="text-lg">
                        <span className="font-medium mr-3">{option.key.toUpperCase()})</span>
                        {option.text}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Previous
                </button>

                <div className="flex space-x-4">
                  {currentQuestionIndex === questions.length - 1 ? (
                    <button
                      onClick={handleSubmitExam}
                      disabled={submitting}
                      className="flex items-center px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 rounded-lg transition-colors font-medium"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Submit Exam
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex(prev => Math.min(questions.length - 1, prev + 1))}
                      className="flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Next
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </div>
              </div>

              {/* Submit Early Option */}
              {currentQuestionIndex < questions.length - 1 && answeredQuestions > 0 && (
                <div className="mt-6 text-center">
                  <button
                    onClick={handleSubmitExam}
                    disabled={submitting}
                    className="text-sm text-gray-400 hover:text-white underline"
                  >
                    Submit exam early with current answers
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};