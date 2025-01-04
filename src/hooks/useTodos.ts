import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axios';

// Fetch all todos
export const useTodos = () =>
  useQuery(['todos'], async () => {
    const { data } = await axios.get('/todos');
    return data;
  });

// Add a new todo
export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (todo: { title: string; description: string }) => {
      const { data } = await axios.post('/todos', todo);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// Update a todo
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, updatedTodo }: { id: number; updatedTodo: { title: string; description: string } }) => {
      const { data } = await axios.put(`/todos/${id}`, updatedTodo);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// Toggle todo completion
export const useToggleTodoCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const { data } = await axios.patch(`/todos/${id}/complete`);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// Delete a todo
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const { data } = await axios.delete(`/todos/${id}`);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// Search todos
export const useSearchTodos = (query: string) =>
  useQuery(['todos', query], async () => {
    const { data } = await axios.get(`/todos/search?query=${query}`);
    return data;
  });
