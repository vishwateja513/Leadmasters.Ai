import React from 'react';
import { AlertTriangle, Clock, Eye, Shield, CheckCircle } from 'lucide-react';
import type { Module } from '../types';

interface ExamInstructionsProps {
  module: Module;
  onStartExam: () => void;
  onBack: () => void;
}

export const ExamInstructions: React.FC<ExamInstructionsProps> = ({
  module,
  onStartExam,
  onBack,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">{module.title}</h1>
            <p className="text-blue-100 mt-2">Please read all instructions carefully before starting</p>
          </div>

          <div className="p-8">
            {/* Exam Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex items-center bg-blue-50 p-4 rounded-lg">
                <CheckCircle className="w-8 h-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Questions</p>
                  <p className="text-xl font-bold text-blue-700">{module.total_questions}</p>
                </div>
              </div>
              
              <div className="flex items-center bg-purple-50 p-4 rounded-lg">
                <Clock className="w-8 h-8 text-purple-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Duration</p>
                  <p className="text-xl font-bold text-purple-700">{module.duration_minutes} Minutes</p>
                </div>
              </div>
              
              <div className="flex items-center bg-green-50 p-4 rounded-lg">
                <Shield className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Passing Score</p>
                  <p className="text-xl font-bold text-green-700">70%</p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Exam Instructions</h2>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">You have <strong>{module.duration_minutes} minutes</strong> to complete all {module.total_questions} questions.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Each question has only <strong>one correct answer</strong>. Select the best option.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">You can navigate between questions using the <strong>Previous</strong> and <strong>Next</strong> buttons.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Your answers are automatically saved as you proceed.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700">Click <strong>"Submit Exam"</strong> when you're finished, or it will auto-submit when time runs out.</p>
                  </div>
                </div>
              </div>

              {/* Proctoring Rules */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-amber-600 mr-3" />
                  <h3 className="text-lg font-bold text-amber-800">Proctoring Guidelines</h3>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800">The exam will run in <strong>full-screen mode</strong>. Do not exit full-screen during the exam.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800">Switching tabs or applications is <strong>not allowed</strong> and will be recorded as violations.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800">Right-click, copy, paste, and keyboard shortcuts are <strong>disabled</strong> during the exam.</p>
                  </div>
                  
                  <div className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-amber-800">Multiple violations may result in <strong>automatic exam submission</strong>.</p>
                  </div>
                </div>
              </div>

              {/* Technical Requirements */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-bold text-blue-800 mb-4">Technical Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-700 mb-2"><strong>Browser:</strong> Chrome, Firefox, Safari, or Edge</p>
                    <p className="text-blue-700 mb-2"><strong>Internet:</strong> Stable connection required</p>
                  </div>
                  <div>
                    <p className="text-blue-700 mb-2"><strong>Screen:</strong> Minimum 1024x768 resolution</p>
                    <p className="text-blue-700 mb-2"><strong>Notifications:</strong> Disable all system notifications</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t">
              <button
                onClick={onBack}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Dashboard
              </button>
              
              <button
                onClick={onStartExam}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
              >
                I Understand - Start Exam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};