import AddTodoForm from '../components/AddTodoForm';
import TodoList from '../components/TodoList';
import SearchTodos from '../components/SearchTodos';

const Home = () => {
  return (
    <div>
      <h1>TODOアプリ</h1>
      <AddTodoForm />
      <SearchTodos />
      <TodoList />
    </div>
  );
};

export default Home;
