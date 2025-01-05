// APIを呼び出すフック

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// useQuery: データ取得をキャッシュし、自動で再取得する
// useMutation: データ変更リクエストを送信し、成功後にキャッシュを更新
// invalidateQueries: 特定のキーに関連するキャッシュを無効化して再取得をトリガー
import axios from '../lib/axios';

// TODOリスト全体を取得
export const useTodos = () =>
  useQuery(['todos'], async () => {
    const { data } = await axios.get('/todos');
    return data;
  });

// 新しいTODOを追加
export const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (todo: { title: string; description: string }) => {
      const { data } = await axios.post('/todos', todo);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// TODOを更新
export const useUpdateTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async ({ id, updatedTodo }: { id: number; updatedTodo: { title: string; description: string } }) => {
      const { data } = await axios.put(`/todos/${id}`, updatedTodo);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// TODOの完了状態を切り替える
export const useToggleTodoCompletion = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const { data } = await axios.patch(`/todos/${id}/complete`);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// TODOを削除する
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation(
    async (id: number) => {
      const { data } = await axios.delete(`/todos/${id}`);
      return data;
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['todos']),
    }
  );
};

// TODOを検索する
export const useSearchTodos = (query: string) =>
    useQuery(
      ['todos', query],
      async () => {
        const encodedQuery = encodeURIComponent(query); // クエリをエンコード
        const { data } = await axios.get(`/todos/search?query=${encodedQuery}`);
        return data;
      },
      {
        enabled: !!query, // queryが空の場合はリクエストを送信しない
      }
    );
