// src/pages/index.tsx
import { useTodos } from '../hooks/useTodos';

interface Todo {
    id: string;
    title: string;
    description: string;
    completed: boolean;
}

const Home = () => {
    const { data: todos, isLoading, error } = useTodos();

    if (isLoading) return <p>Loading...</p>;
    if (error instanceof Error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h1>TODOリスト</h1>
            <ul>
                {todos?.map((todo: Todo) => (
                    <li key={todo.id}>
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>{todo.completed ? '完了済み' : '未完了'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
