import { useUpdateTodo, useDeleteTodo, useToggleTodoCompletion } from '../hooks/useTodos';
import { Todo } from '../types/todo';

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

export default TodoItem;
