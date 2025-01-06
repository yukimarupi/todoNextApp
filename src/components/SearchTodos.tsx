import { useState } from 'react';
import { useSearchTodos } from '../hooks/useTodos';
import { Todo } from '../types/todo';

const SearchTodos = () => {
  const [query, setQuery] = useState('');
  const { data: todos, isLoading, error } = useSearchTodos(query);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="検索"
        value={query}
        onChange={handleSearch}
        style={{ marginBottom: '1rem' }}
      />
      {isLoading ? (
        <p>検索中...</p>
      ) : error ? (
        <p>エラーが発生しました: {(error as Error).message}</p>
      ) : (
        <ul>
          {todos?.length > 0 ? (
            todos.map((todo: Todo) => (
              <li key={todo.id}>
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </li>
            ))
          ) : (
            <p>該当するTODOが見つかりません</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchTodos;
