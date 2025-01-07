import React, { useState } from 'react';
import { useAddTodo } from '../hooks/useTodos';
import { Box, Button, TextField, Typography } from '@mui/material';

const AddTodoForm = () => {
  const addTodo = useAddTodo();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo.mutate({ title, description });
    setTitle('');
    setDescription('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400, mx: 'auto', mt: 4 }}
    >
      <Typography variant="h4" align="center">
        TODOを追加
      </Typography>
      <TextField
        label="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        multiline
        rows={4}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        追加
      </Button>
    </Box>
  );
};

export default AddTodoForm;
