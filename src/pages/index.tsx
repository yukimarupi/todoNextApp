import { useState } from 'react';
import { useTodos, useAddTodo, useUpdateTodo, useDeleteTodo, useToggleTodoCompletion, useSearchTodos } from '../hooks/useTodos';

interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="説明"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea>
      <button type="submit">追加</button>
    </form>
  );
};

const TodoItem = ({ todo }: { todo: Todo }) => {
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const toggleCompletion = useToggleTodoCompletion();

  const handleUpdate = () => {
    const updatedTodo = { title: todo.title, description: todo.description };
    updateTodo.mutate({ id: todo.id, updatedTodo });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleCompletion.mutate(todo.id)}
      />
      <h3>{todo.title}</h3>
      <p>{todo.description}</p>
      <button onClick={handleUpdate}>更新</button>
      <button onClick={() => deleteTodo.mutate(todo.id)}>削除</button>
    </li>
  );
};

const SearchTodos = () => {
  const [query, setQuery] = useState('');
  const { data: todos, isLoading } = useSearchTodos(query);

  return (
    <div>
      <input
        type="text"
        placeholder="検索"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos?.map((todo: Todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Home = () => {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <p>Loading...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>TODOリスト</h1>
      <AddTodoForm />
      <SearchTodos />
      <ul>
        {todos?.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
