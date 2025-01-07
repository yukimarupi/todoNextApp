import React from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';
import { Box, Typography } from '@mui/material';

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <Typography>読み込み中...</Typography>;
  if (error) return <Typography color="error">エラーが発生しました: {(error as Error).message}</Typography>;

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        TODOリスト
      </Typography>
      {todos?.map((todo: Todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </Box>
  );
};

export default TodoList;
