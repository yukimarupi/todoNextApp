import React from 'react';
import { useDeleteTodo, useToggleTodoCompletion } from '../hooks/useTodos';
import { Todo } from '../types/todo';
import { Box, Checkbox, Typography, Button } from '@mui/material';

const TodoItem = ({ todo }: { todo: Todo }) => {
  const deleteTodo = useDeleteTodo();
  const toggleCompletion = useToggleTodoCompletion();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        mb: 2,
        border: '1px solid #ccc',
        borderRadius: '8px',
        backgroundColor: todo.completed ? '#e8f5e9' : '#ffffff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Checkbox
          checked={todo.completed}
          onChange={() => toggleCompletion.mutate(todo.id)}
          color="primary"
        />
        <Box>
          <Typography variant="h6" sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            {todo.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {todo.description}
          </Typography>
        </Box>
      </Box>
      <Button
        variant="outlined"
        color="error"
        size="small"
        onClick={() => deleteTodo.mutate(todo.id)}
      >
        削除
      </Button>
    </Box>
  );
};

export default TodoItem;
