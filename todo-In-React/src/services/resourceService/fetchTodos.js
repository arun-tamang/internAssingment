import { downloadTodos } from './downloadTodos';

export async function fetchTodos (id, tokens) {
  // console.log('fetchTodos called');
  return downloadTodos(id, tokens);
  // console.log('downloadedTodos', downloadedTodos);
}
