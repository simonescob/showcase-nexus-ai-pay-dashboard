import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import toast from 'react-hot-toast';

export const useTasks = (user, activeTab) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from API
  const fetchTasks = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);
      const response = await api.getTasks();
      setTasks(response || []);
    } catch (error) {
      setError('Failed to load tasks');
      toast.error('Failed to load tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Add task with optimistic updates
   const addTask = useCallback(async (taskTitle, taskDescription = '') => {
     const trimmedTitle = taskTitle.trim();
     const trimmedDescription = taskDescription.trim();

     // Client-side validation
     if (!trimmedTitle) {
       toast.error('Task title cannot be empty');
       return false;
     }

     if (trimmedTitle.length > 200) {
       toast.error('Task title must be less than 200 characters');
       return false;
     }

     if (trimmedDescription.length > 500) {
       toast.error('Task description must be less than 500 characters');
       return false;
     }

     // Check for duplicate tasks
     if (tasks.some(task => task.title.toLowerCase() === trimmedTitle.toLowerCase())) {
       toast.error('Task already exists');
       return false;
     }

     // Optimistic update - create temporary task with client-generated ID
     const tempId = `temp-${Date.now()}`;
     const optimisticTask = {
       id: tempId,
       title: trimmedTitle,
       description: trimmedDescription,
       completed: false,
       isOptimistic: true,
     };

     const previousTasks = [...tasks];
     setTasks([...tasks, optimisticTask]);

     try {
       const newTaskData = await api.createTask({
         title: trimmedTitle,
         description: trimmedDescription,
         completed: false,
       });

       console.log('Task created:', newTaskData);

       // Replace optimistic task with real task
       setTasks(prevTasks =>
         prevTasks.map(task =>
           task.id === tempId ? { ...newTaskData, isOptimistic: false } : task
         )
       );

       toast.success('Task added successfully');
       return true;
     } catch (error) {
       // Revert optimistic update on failure
       setTasks(previousTasks);
       toast.error('Failed to add task');
       console.error('Error adding task:', error);
       return false;
     }
   }, [tasks]);

  // Toggle task completion with optimistic updates
  const toggleTask = useCallback(async (id) => {
    const taskToUpdate = tasks.find(task => task.id === id);
    if (!taskToUpdate) return;

    // Optimistic update
    const previousTasks = [...tasks];
    const optimisticTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(optimisticTasks);

    try {
      await api.updateTask(id, {
        title: taskToUpdate.title,
        description: taskToUpdate.description || '',
        completed: !taskToUpdate.completed,
      });
    } catch (error) {
      // Revert optimistic update on failure
      setTasks(previousTasks);
      toast.error('Failed to update task');
      console.error('Error updating task:', error);
    }
  }, [tasks]);

  // Delete task with optimistic updates
  const deleteTask = useCallback(async (id) => {
    // Optimistic update
    const previousTasks = [...tasks];
    setTasks(tasks.filter(task => task.id !== id));

    try {
      await api.deleteTask(id);

      toast.success('Task deleted successfully');
    } catch (error) {
      // Revert optimistic update on failure
      setTasks(previousTasks);
      toast.error('Failed to delete task');
      console.error('Error deleting task:', error);
    }
  }, [tasks]);


  // Fetch tasks when user or activeTab changes
  useEffect(() => {
    if (user && activeTab === 'tasks') {
      fetchTasks();
    }
  }, [user, activeTab, fetchTasks]);

  return {
    tasks,
    loading,
    error,
    addTask,
    toggleTask,
    deleteTask,
    refetch: fetchTasks,
  };
};