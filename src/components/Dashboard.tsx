import React, { useEffect, useState } from 'react';
import { LogOut, BookOpen, Clock, Users, Trophy } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import type { Module, UserAttempt } from '../types';

interface DashboardProps {
  onModuleSelect: (module: Module) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onModuleSelect }) => {
  const { user, signOut } = useAuth();
  const [modules, setModules] = useState<Module[]>([]);
  const [userAttempts, setUserAttempts] = useState<UserAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchModules();
    if (user) {
      fetchUserAttempts();
    }
  }, [user]);

  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from('modules')
        .select('*')
        .order('created_at');

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error fetching modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserAttempts = async () => {
    try {
      const { data, error } = await supabase
        .from('user_attempts')
        .select('*')
        .eq('user_id', user?.id)
        .order('completed_at', { ascending: false });

      if (error) throw error;
      setUserAttempts(data || []);
    } catch (error) {
      console.error('Error fetching user attempts:', error);
    }
  };

  const getModuleAttempt = (moduleId: string) => {
    return userAttempts.find(attempt => attempt.module_id === moduleId);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">ExamPro</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.email}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-5 h-5 mr-1" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Modules</p>
                <p className="text-2xl font-bold text-gray-900">{modules.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Trophy className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">{userAttempts.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-gray-900">
                  {userAttempts.length > 0 
                    ? Math.round(userAttempts.reduce((acc, attempt) => acc + (attempt.score / attempt.total_questions) * 100, 0) / userAttempts.length)
                    : 0}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const attempt = getModuleAttempt(module.id);
            const hasAttempted = !!attempt;
            const score = hasAttempted ? Math.round((attempt.score / attempt.total_questions) * 100) : 0;

            return (
              <div key={module.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900">{module.title}</h3>
                    {hasAttempted && (
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        score >= 70 ? 'bg-green-100 text-green-700' : 
                        score >= 50 ? 'bg-yellow-100 text-yellow-700' : 
                        'bg-red-100 text-red-700'
                      }`}>
                        {score}%
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">{module.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <BookOpen className="w-4 h-4 mr-1" />
                    <span className="mr-4">{module.total_questions} Questions</span>
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{module.duration_minutes} Minutes</span>
                  </div>
                  
                  <button
                    onClick={() => onModuleSelect(module)}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    {hasAttempted ? 'Retake Exam' : 'Start Exam'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Attempts */}
        {userAttempts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Attempts</h2>
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Module</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userAttempts.slice(0, 5).map((attempt) => {
                    const module = modules.find(m => m.id === attempt.module_id);
                    const score = Math.round((attempt.score / attempt.total_questions) * 100);
                    
                    return (
                      <tr key={attempt.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {module?.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            score >= 70 ? 'bg-green-100 text-green-800' : 
                            score >= 50 ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'
                          }`}>
                            {attempt.score}/{attempt.total_questions} ({score}%)
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {attempt.time_taken_minutes} min
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(attempt.completed_at).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};