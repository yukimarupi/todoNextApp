import React, { useState } from 'react';
import { useSearchTodos } from '../hooks/useTodos';
import { Todo } from '../types/todo';
import { Box, TextField, Typography, List, ListItem } from '@mui/material';

const SearchTodos = () => {
  const [query, setQuery] = useState('');
  const { data: todos, isLoading, error } = useSearchTodos(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <TextField
        label="検索"
        value={query}
        onChange={handleSearch}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      {isLoading ? (
        <Typography>検索中...</Typography>
      ) : error ? (
        <Typography color="error">エラーが発生しました: {(error as Error).message}</Typography>
      ) : (
        <List>
          {todos?.length > 0 ? (
            todos.map((todo: Todo) => (
              <ListItem key={todo.id} sx={{ borderBottom: '1px solid #ccc', py: 1 }}>
                <Typography variant="h6">{todo.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {todo.description}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography>該当するTODOが見つかりません</Typography>
          )}
        </List>
      )}
    </Box>
  );
};

export default SearchTodos;
