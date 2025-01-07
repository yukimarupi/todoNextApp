import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import AddTodoForm from '../components/AddTodoForm';
import SearchTodos from '../components/SearchTodos';
import TodoList from '../components/TodoList';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        TODOアプリ
      </Typography>
      <Box sx={{ my: 4 }}>
        <AddTodoForm />
        <SearchTodos />
        <TodoList />
      </Box>
    </Container>
  );
};

export default Home;
