import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BarChart3, CheckSquare, Settings, CreditCard, User, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import OverviewTab from '../components/OverviewTab';
import AnalyticsTab from '../components/AnalyticsTab';
import TasksTab from '../components/TasksTab';
import SettingsTab from '../components/SettingsTab';
import BillingTab from '../components/BillingTab';
import { api } from '../utils/api';
import { useTasks } from '../hooks/useTasks';

const Dashboard = () => {
  console.log('Dashboard component rendering...');
  const { user, logout, updateSubscription, role } = useAuth();
  const { tab: urlTab } = useParams();
  const navigate = useNavigate();
  console.log('Dashboard user:', user);
  console.log('Dashboard role:', role);
  const [activeTab, setActiveTab] = useState('overview');
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [analyticsData, setAnalyticsData] = useState([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Use the custom tasks hook
  const { tasks, loading: tasksLoading, addTask: addTaskToList, toggleTask, deleteTask } = useTasks(user, activeTab);

  // Fetch analytics data when analytics tab is active
  useEffect(() => {
    if (user && activeTab === 'analytics') {
      fetchAnalytics();
    }
  }, [user, activeTab]);

  // Sync activeTab with URL param
  useEffect(() => {
    const validTabs = ['overview', 'analytics', 'tasks', 'settings', 'billing'];
    if (validTabs.includes(urlTab)) {
      setActiveTab(urlTab);
    } else {
      navigate('/dashboard/overview', { replace: true });
    }
  }, [urlTab, navigate]);

  const fetchAnalytics = async () => {
    try {
      setAnalyticsLoading(true);
      const response = await api.getAnalytics();
      setAnalyticsData(response.data || []);
    } catch (error) {
      toast.error('Failed to load analytics');
      console.error('Error fetching analytics:', error);
      // Fallback to mock data if API fails
      setAnalyticsData([
        { day: 'Mon', completed: 4, pending: 2 },
        { day: 'Tue', completed: 3, pending: 3 },
        { day: 'Wed', completed: 5, pending: 1 },
        { day: 'Thu', completed: 2, pending: 4 },
        { day: 'Fri', completed: 6, pending: 0 },
        { day: 'Sat', completed: 1, pending: 2 },
        { day: 'Sun', completed: 3, pending: 1 },
      ]);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  const addTask = async () => {
    const success = await addTaskToList(newTask, newTaskDescription);
    if (success) {
      setNewTask('');
      setNewTaskDescription('');
    }
  };

  const handleSubscribe = async (plan) => {
    try {
      // Create Stripe checkout session
      const response = await api.createCheckoutSession(plan);

      if (response.url) {
        // Redirect to Stripe Checkout
        window.location.href = response.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      toast.error('Failed to create checkout session');
      console.error('Error creating checkout session:', error);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab user={user} tasks={tasks} />;
      case 'analytics':
        return (
          <AnalyticsTab
            role={role}
            analyticsData={analyticsData}
            loading={analyticsLoading}
            onUpgrade={() => navigate('/dashboard/billing')}
          />
        );
      case 'tasks':
        return (
          <TasksTab
            tasks={tasks}
            newTask={newTask}
            setNewTask={setNewTask}
            newTaskDescription={newTaskDescription}
            setNewTaskDescription={setNewTaskDescription}
            toggleTask={toggleTask}
            addTask={addTask}
            deleteTask={deleteTask}
            loading={tasksLoading}
          />
        );
      case 'settings':
        return <SettingsTab />;
      case 'billing':
        return <BillingTab onSubscribe={handleSubscribe} currentPlan={role} />;
      default:
        return <OverviewTab user={user} tasks={tasks} />;
    }
  };

  return (
    <div className="flex h-screen bg-white dark:bg-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white dark:bg-gray-800 shadow-2xl border-r border-gray-200 dark:border-gray-700">
        <div className="p-8">
          <h2 className="text-3xl font-display font-bold text-blue-600 dark:text-blue-400">ProdDash</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Productivity Dashboard</p>
        </div>
        <nav className="mt-8 px-4">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(`/dashboard/${tab.id}`)}
                className={`group w-full flex items-center px-6 py-4 text-left transition-all duration-500 rounded-2xl mb-2 relative overflow-hidden ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-xl scale-105'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-102 hover:shadow-lg'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`p-2 rounded-xl mr-4 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-white/20'
                    : 'bg-gray-100 dark:bg-gray-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900'
                }`}>
                  <Icon className={`w-5 h-5 transition-all duration-300 ${
                    activeTab === tab.id ? 'text-white' : 'text-gray-600 dark:text-gray-300 group-hover:text-blue-600'
                  }`} />
                </div>
                <span className="font-medium text-lg">{tab.label}</span>
                {/* {activeTab === tab.id && (
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
                )} */}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="bg-white dark:bg-gray-800 shadow-2xl px-8 py-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-6">
            <h1 className="text-2xl font-display font-semibold text-gray-900 dark:text-white">Dashboard</h1>
            <div className="hidden md:flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {console.log('Navbar user object:', user)}
            <div className="hidden md:flex items-center space-x-3 bg-blue-50 dark:bg-blue-900 px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={logout}
              className="group flex items-center px-6 py-3 text-sm bg-red-500 text-white rounded-2xl hover:bg-red-600 transition-all duration-300 shadow-xl hover:shadow-2xl"
            >
              <LogOut className="w-4 h-4 mr-2 group-hover:animate-bounce-gentle" />
              Logout
            </button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-8 bg-gray-50 dark:bg-gray-900">
          <div className="animate-fade-in max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;