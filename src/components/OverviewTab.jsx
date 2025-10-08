import React, { useState, useEffect } from 'react';
import { CheckSquare, BarChart3, Zap } from 'lucide-react';
import { api } from '../utils/api';

const OverviewTab = ({ user }) => {
  const [analytics, setAnalytics] = useState({
    tasksCompleted: 0,
    tasksPending: 0,
    productivityScore: 0,
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await api.getAnalytics();
        const completed = data.completed || 0;
        const pending = data.pending || 0;
        const productivityScore = (completed + pending) > 0 ? Math.round((completed / (completed + pending)) * 100) : 0;

        setAnalytics({
          tasksCompleted: completed,
          tasksPending: pending,
          productivityScore: productivityScore,
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
        // Keep default values on error
      }
    };

    fetchAnalytics();
  }, []);
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 p-10 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-600 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-4xl font-display font-bold text-blue-600 dark:text-blue-400 mb-4">
            Welcome back{user?.name ? `, ${user.name}` : ''}!
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Here's an overview of your productivity metrics and achievements.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="group bg-blue-600 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 text-white relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <CheckSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tasks Completed</h3>
            <p className="text-5xl font-bold mb-2">{analytics.tasksCompleted}</p>
            <p className="text-blue-100 text-sm">+12% from last week</p>
          </div>
        </div>
        <div className="group bg-blue-600 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 text-white relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Tasks Pending</h3>
            <p className="text-5xl font-bold mb-2">{analytics.tasksPending}</p>
            <p className="text-blue-100 text-sm">-3 from yesterday</p>
          </div>
        </div>
        <div className="group bg-blue-600 p-8 rounded-3xl shadow-2xl hover:scale-105 transition-all duration-500 text-white relative overflow-hidden cursor-pointer">
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Productivity Score</h3>
            <p className="text-5xl font-bold mb-2">{analytics.productivityScore}%</p>
            <p className="text-blue-100 text-sm">Excellent performance!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;