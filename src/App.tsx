import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { useProctoring } from './hooks/useProctoring';
import { AuthForm } from './components/AuthForm';
import { Dashboard } from './components/Dashboard';
import { ExamInstructions } from './components/ExamInstructions';
import { ExamInterface } from './components/ExamInterface';
import { ExamResults } from './components/ExamResults';
import { supabase } from './lib/supabase';
import type { Module, UserAttempt, Question } from './types';

type AppState = 'dashboard' | 'instructions' | 'exam' | 'results';

function App() {
  const { user, loading } = useAuth();
  const { violations, violationCount, isFullscreen, enterFullscreen } = useProctoring(false);
  const [currentState, setCurrentState] = useState<AppState>('dashboard');
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [examAttempt, setExamAttempt] = useState<UserAttempt | null>(null);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);

  const handleModuleSelect = async (module: Module) => {
    setSelectedModule(module);
    setCurrentState('instructions');
    
    // Fetch questions for results later
    try {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .eq('module_id', module.id)
        .order('question_number');
      
      if (data) {
        setExamQuestions(data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleStartExam = async () => {
    try {
      await enterFullscreen();
    } catch (error) {
      console.error('Failed to enter fullscreen:', error);
    }
    setCurrentState('exam');
  };

  const handleExamComplete = (attempt: UserAttempt) => {
    setExamAttempt(attempt);
    setCurrentState('results');
  };

  const handleRetakeExam = () => {
    setCurrentState('instructions');
    setExamAttempt(null);
  };

  const handleBackToDashboard = () => {
    setCurrentState('dashboard');
    setSelectedModule(null);
    setExamAttempt(null);
    setExamQuestions([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading application...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  switch (currentState) {
    case 'instructions':
      return selectedModule ? (
        <ExamInstructions
          module={selectedModule}
          onStartExam={handleStartExam}
          onBack={handleBackToDashboard}
        />
      ) : null;

    case 'exam':
      return selectedModule ? (
        <ExamInterface
          module={selectedModule}
          violations={violations}
          violationCount={violationCount}
          isFullscreen={isFullscreen}
          onExamComplete={handleExamComplete}
          onBack={handleBackToDashboard}
        />
      ) : null;

    case 'results':
      return selectedModule && examAttempt ? (
        <ExamResults
          module={selectedModule}
          attempt={examAttempt}
          questions={examQuestions}
          onRetakeExam={handleRetakeExam}
          onBackToDashboard={handleBackToDashboard}
        />
      ) : null;

    default:
      return (
        <Dashboard onModuleSelect={handleModuleSelect} />
      );
  }
}

export default App;