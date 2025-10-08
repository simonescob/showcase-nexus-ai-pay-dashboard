# Task Management Module Integration Guide

## Table of Contents
1. [Introduction](#introduction)
2. [Assumptions](#assumptions)
3. [API Setup](#api-setup)
4. [CRUD Operations](#crud-operations)
5. [Error Handling, Loading States, and User Feedback](#error-handling-loading-states-and-user-feedback)
6. [State Management](#state-management)
7. [Security Considerations](#security-considerations)
8. [Testing Strategies](#testing-strategies)
9. [Conclusion](#conclusion)

## Introduction
This guide provides a comprehensive approach to integrating a task management module into a React-based frontend application, communicating with RESTful API endpoints on a Node.js/Express backend. It covers setup, implementation, best practices, and testing to ensure a robust, secure, and maintainable solution.

## Assumptions
- Backend endpoints are defined at `/api/tasks`:
  - `GET /api/tasks` - Retrieve list of tasks
  - `POST /api/tasks` - Create a new task
  - `PUT /api/tasks/:id` - Update an existing task
  - `DELETE /api/tasks/:id` - Delete a task
- Frontend uses TypeScript for type safety.
- Authentication is handled via JWT tokens.
- Axios is used for HTTP requests (alternative Fetch examples provided).
- State management uses Redux Toolkit (Context API alternative noted).

## API Setup
### Installing Dependencies
First, install necessary packages:
```bash
npm install axios redux @reduxjs/toolkit react-redux
```

### Configuring Axios with Authentication
Create an API utility file to handle requests with JWT authentication.

```typescript
// src/utils/api.ts
import axios, { AxiosInstance, AxiosResponse } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
    });

    // Request interceptor to add JWT token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for token refresh or error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Handle unauthorized - redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public get<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.get(url);
  }

  public post<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.post(url, data);
  }

  public put<T>(url: string, data?: any): Promise<AxiosResponse<T>> {
    return this.client.put(url, data);
  }

  public delete<T>(url: string): Promise<AxiosResponse<T>> {
    return this.client.delete(url);
  }
}

export const apiClient = new ApiClient();
```

### Alternative with Fetch
If preferring native Fetch:

```typescript
// src/utils/api.ts
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('authToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

export const apiRequest = async <T>(
  url: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: { ...getAuthHeaders(), ...options.headers },
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
      throw new Error('Unauthorized');
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
```

## CRUD Operations
Define TypeScript interfaces for tasks:

```typescript
// src/types/task.ts
export interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}
```

### API Service Functions
Create service functions for CRUD operations:

```typescript
// src/services/taskService.ts
import { apiClient } from '../utils/api';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    const response = await apiClient.get<Task[]>('/api/tasks');
    return response.data;
  },

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const response = await apiClient.post<Task>('/api/tasks', taskData);
    return response.data;
  },

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    const response = await apiClient.put<Task>(`/api/tasks/${id}`, taskData);
    return response.data;
  },

  async deleteTask(id: string): Promise<void> {
    await apiClient.delete(`/api/tasks/${id}`);
  },
};
```

### Alternative with Fetch
```typescript
// src/services/taskService.ts
import { apiRequest } from '../utils/api';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';

export const taskService = {
  async getTasks(): Promise<Task[]> {
    return apiRequest<Task[]>('/api/tasks');
  },

  async createTask(taskData: CreateTaskRequest): Promise<Task> {
    return apiRequest<Task>('/api/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },

  async updateTask(id: string, taskData: UpdateTaskRequest): Promise<Task> {
    return apiRequest<Task>(`/api/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },

  async deleteTask(id: string): Promise<void> {
    await apiRequest<void>(`/api/tasks/${id}`, {
      method: 'DELETE',
    });
  },
};
```

## Error Handling, Loading States, and User Feedback
Implement hooks for managing async operations:

```typescript
// src/hooks/useAsync.ts
import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export const useAsync = <T>() => {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    setState({ data: null, loading: true, error: null });
    try {
      const data = await asyncFunction();
      setState({ data, loading: false, error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setState({ data: null, loading: false, error: errorMessage });
      throw error;
    }
  }, []);

  return { ...state, execute };
};
```

### Task Component with Error Handling and Loading
```typescript
// src/components/TaskList.tsx
import React, { useEffect } from 'react';
import { useAsync } from '../hooks/useAsync';
import { taskService } from '../services/taskService';
import { Task } from '../types/task';

const TaskList: React.FC = () => {
  const { data: tasks, loading, error, execute } = useAsync<Task[]>();

  useEffect(() => {
    execute(() => taskService.getTasks());
  }, [execute]);

  const handleDelete = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      // Refresh tasks after deletion
      execute(() => taskService.getTasks());
    } catch (err) {
      // Error handled by useAsync or show toast
      console.error('Failed to delete task:', err);
    }
  };

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {tasks?.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button onClick={() => handleDelete(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
```

For user feedback, integrate a toast notification library like `react-toastify`.

## State Management
### Using Redux Toolkit
Set up Redux store:

```typescript
// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

Tasks slice:

```typescript
// src/store/slices/tasksSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { taskService } from '../../services/taskService';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../../types/task';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await taskService.getTasks();
});

export const createTask = createAsyncThunk('tasks/createTask', async (taskData: CreateTaskRequest) => {
  return await taskService.createTask(taskData);
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }: { id: string; data: UpdateTaskRequest }) => {
  return await taskService.updateTask(id, data);
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: string) => {
  await taskService.deleteTask(id);
  return id;
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
        state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      });
  },
});

export default tasksSlice.reducer;
```

### Alternative with Context API
For simpler apps, use Context API:

```typescript
// src/contexts/TaskContext.tsx
import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Task, CreateTaskRequest, UpdateTaskRequest } from '../types/task';
import { taskService } from '../services/taskService';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

type TaskAction =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Task[] }
  | { type: 'FETCH_ERROR'; payload: string }
  | { type: 'CREATE_TASK'; payload: Task }
  | { type: 'UPDATE_TASK'; payload: Task }
  | { type: 'DELETE_TASK'; payload: string };

const taskReducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, tasks: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CREATE_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.id ? action.payload : task
        ),
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    default:
      return state;
  }
};

const TaskContext = createContext<{
  state: TaskState;
  dispatch: React.Dispatch<TaskAction>;
  fetchTasks: () => Promise<void>;
  createTask: (data: CreateTaskRequest) => Promise<void>;
  updateTask: (id: string, data: UpdateTaskRequest) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
} | null>(null);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(taskReducer, {
    tasks: [],
    loading: false,
    error: null,
  });

  const fetchTasks = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const tasks = await taskService.getTasks();
      dispatch({ type: 'FETCH_SUCCESS', payload: tasks });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', payload: error instanceof Error ? error.message : 'Failed to fetch tasks' });
    }
  };

  const createTask = async (data: CreateTaskRequest) => {
    try {
      const task = await taskService.createTask(data);
      dispatch({ type: 'CREATE_TASK', payload: task });
    } catch (error) {
      throw error;
    }
  };

  const updateTask = async (id: string, data: UpdateTaskRequest) => {
    try {
      const task = await taskService.updateTask(id, data);
      dispatch({ type: 'UPDATE_TASK', payload: task });
    } catch (error) {
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await taskService.deleteTask(id);
      dispatch({ type: 'DELETE_TASK', payload: id });
    } catch (error) {
      throw error;
    }
  };

  return (
    <TaskContext.Provider value={{ state, dispatch, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};
```

## Security Considerations
### Input Validation
Validate inputs on both frontend and backend. Use libraries like `joi` or `yup` for schema validation.

```typescript
// src/utils/validation.ts
import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(1).max(100),
  description: yup.string().max(500),
});

export const validateTask = async (data: any) => {
  return await taskSchema.validate(data, { abortEarly: false });
};
```

### Preventing XSS
- Use `DOMPurify` to sanitize user inputs before rendering.
- Avoid `dangerouslySetInnerHTML` unless absolutely necessary.

### CSRF Protection
- Ensure backend implements CSRF tokens.
- For JWT, tokens are stateless, but ensure proper CORS configuration.

### Secure Storage
- Store JWT tokens in `localStorage` or `sessionStorage`, but consider `httpOnly` cookies for better security.
- Implement token expiration and refresh logic.

## Testing Strategies
### Unit Tests for API Functions
Use Jest and React Testing Library.

```typescript
// src/services/__tests__/taskService.test.ts
import { taskService } from '../taskService';
import { apiClient } from '../../utils/api';

// Mock the API client
jest.mock('../../utils/api');
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe('taskService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch tasks successfully', async () => {
    const mockTasks = [{ id: '1', title: 'Test Task' }];
    mockedApiClient.get.mockResolvedValue({ data: mockTasks });

    const result = await taskService.getTasks();
    expect(result).toEqual(mockTasks);
    expect(mockedApiClient.get).toHaveBeenCalledWith('/api/tasks');
  });

  it('should create task successfully', async () => {
    const newTask = { title: 'New Task' };
    const createdTask = { id: '1', ...newTask };
    mockedApiClient.post.mockResolvedValue({ data: createdTask });

    const result = await taskService.createTask(newTask);
    expect(result).toEqual(createdTask);
    expect(mockedApiClient.post).toHaveBeenCalledWith('/api/tasks', newTask);
  });

  // Add more tests for update and delete
});
```

### Integration Tests
Use Cypress or Playwright for end-to-end testing.

```typescript
// cypress/integration/taskManagement.spec.ts
describe('Task Management', () => {
  beforeEach(() => {
    cy.login('test@example.com', 'password'); // Custom login command
    cy.visit('/tasks');
  });

  it('should display tasks', () => {
    cy.get('[data-cy=task-list]').should('be.visible');
    cy.get('[data-cy=task-item]').should('have.length.greaterThan', 0);
  });

  it('should create a new task', () => {
    cy.get('[data-cy=create-task-btn]').click();
    cy.get('[data-cy=task-title]').type('New Test Task');
    cy.get('[data-cy=task-description]').type('Description');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=task-list]').should('contain', 'New Test Task');
  });

  it('should update a task', () => {
    cy.get('[data-cy=task-item]').first().find('[data-cy=edit-btn]').click();
    cy.get('[data-cy=task-title]').clear().type('Updated Task');
    cy.get('[data-cy=submit-btn]').click();
    cy.get('[data-cy=task-list]').should('contain', 'Updated Task');
  });

  it('should delete a task', () => {
    cy.get('[data-cy=task-item]').first().find('[data-cy=delete-btn]').click();
    cy.get('[data-cy=confirm-delete]').click();
    cy.get('[data-cy=task-list]').should('not.contain', 'Updated Task');
  });
});
```

### Component Testing
```typescript
// src/components/__tests__/TaskList.test.tsx
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import TaskList from '../TaskList';

// Mock the task service
jest.mock('../../services/taskService');

describe('TaskList', () => {
  it('should render loading state initially', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(screen.getByText('Loading tasks...')).toBeInTheDocument();
  });

  it('should render tasks when loaded', async () => {
    const mockTasks = [
      { id: '1', title: 'Task 1', description: 'Desc 1', completed: false, createdAt: '', updatedAt: '' },
    ];
    // Mock the service to return tasks
    // ... setup mocks

    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
    });
  });
});
```

## Conclusion
This guide provides a solid foundation for integrating task management into your React application. Remember to adapt the code to your specific project structure and requirements. Always prioritize security, test thoroughly, and follow React best practices for maintainable code.