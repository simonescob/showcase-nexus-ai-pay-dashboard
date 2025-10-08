import React from 'react';
import { Trash2 } from 'lucide-react';

const TasksTab = ({ tasks, newTask, setNewTask, newTaskDescription, setNewTaskDescription, toggleTask, addTask, deleteTask, loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">Tasks</h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">Loading...</span>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center p-4 rounded-2xl bg-gray-100 dark:bg-gray-700">
                <div className="w-5 h-5 bg-gray-300 dark:bg-gray-600 rounded mr-4"></div>
                <div className="flex-1 h-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="w-3 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-4xl font-display font-bold bg-gradient-to-r from-gray-900 to-primary dark:from-white dark:to-primary bg-clip-text text-transparent">Tasks</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-full">
            <div className={`w-2 h-2 rounded-full ${tasks.filter(t => t.completed).length > 0 ? 'bg-success animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              {tasks.filter(t => t.completed).length}/{tasks.length} completed
            </span>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">Your Tasks</h3>
          <div className="flex flex-col space-y-4 w-full md:w-auto md:flex-row md:space-y-0 md:space-x-4 md:items-center">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 200) {
                    setNewTask(value);
                  }
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    addTask();
                  }
                }}
                placeholder="Task title..."
                maxLength={200}
                className="flex-1 md:flex-none md:w-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300"
              />
              <textarea
                value={newTaskDescription}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 500) {
                    setNewTaskDescription(value);
                  }
                }}
                placeholder="Task description (optional)..."
                maxLength={500}
                rows={2}
                className="flex-1 md:flex-none md:w-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 resize-none"
              />
            </div>
            <button
              onClick={addTask}
              className="bg-gradient-to-r from-primary to-accent text-white px-6 py-3 rounded-2xl hover:scale-105 hover:shadow-lg transition-all duration-300 shadow-md font-semibold"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="space-y-4">
          {tasks.map((task, index) => (
            <div
              key={task.id}
              className={`group flex items-center p-4 rounded-2xl border transition-all duration-300 hover:shadow-lg animate-slide-up ${
                task.completed
                  ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700'
                  : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="mr-4 w-5 h-5 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary focus:ring-2 transition-all duration-300"
              />
              <div className="flex-1">
                <span className={`text-lg transition-all duration-300 block ${
                  task.completed
                    ? 'line-through text-gray-500 dark:text-gray-400'
                    : 'text-gray-900 dark:text-white group-hover:text-primary'
                }`}>
                  {task.title}
                </span>
                {task.description && (
                  <span className={`text-sm transition-all duration-300 block mt-1 ${
                    task.completed
                      ? 'line-through text-gray-400 dark:text-gray-500'
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {task.description}
                  </span>
                )}
              </div>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                task.completed ? 'bg-success animate-pulse' : 'bg-gray-300 dark:bg-gray-600'
              }`}></div>
              <button
                onClick={() => deleteTask(task.id)}
                className="ml-3 p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksTab;