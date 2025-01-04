// src/hooks/useTodos.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../lib/axios';

// Fetch all todos
const fetchTodos = async () => {
    const { data } = await axios.get('/todos');
    return data;
};

// Add a new todo
const addTodo = async (todo: { title: string; description: string }) => {
    const { data } = await axios.post('/todos', todo);
    return data;
};

// Update a todo
const updateTodo = async (id: number, updatedTodo: { title: string; description: string }) => {
    const { data } = await axios.put(`/todos/${id}`, updatedTodo);
    return data;
};

// Toggle todo completion
const toggleTodoCompletion = async (id: number) => {
    const { data } = await axios.patch(`/todos/${id}/complete`);
    return data;
};

// Delete a todo
const deleteTodo = async (id: number) => {
    const { data } = await axios.delete(`/todos/${id}`);
    return data;
};

// Custom hooks
export const useTodos = () => useQuery(['todos'], fetchTodos);

export const useAddTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(addTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos']),
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ id, updatedTodo }: { id: number; updatedTodo: { title: string; description: string } }) =>
            updateTodo(id, updatedTodo),
        {
            onSuccess: () => queryClient.invalidateQueries(['todos']),
        }
    );
};

export const useToggleTodoCompletion = () => {
    const queryClient = useQueryClient();
    return useMutation(toggleTodoCompletion, {
        onSuccess: () => queryClient.invalidateQueries(['todos']),
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation(deleteTodo, {
        onSuccess: () => queryClient.invalidateQueries(['todos']),
    });
};
