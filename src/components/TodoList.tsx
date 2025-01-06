import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem'; // 個別のTodoアイテムをレンダリングするコンポーネント
import { Todo } from '../types/todo';

const TodoList = () => {
  const { data: todos, isLoading, error } = useTodos();

  if (isLoading) return <p>読み込み中...</p>;
  if (error) return <p>エラーが発生しました: {(error as Error).message}</p>;

  return (
    <div>
      <h2>TODOリスト</h2>
      <ul>
        {todos?.map((todo: Todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
