import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // 環境変数でAPIのベースURLを設定
});

export default axiosInstance;
