import { ToDoItem } from './toDoItem';

export interface ApiResponse {
  status: string;
  message: string;
  data: ToDoItem[] | null;
}

export interface ApiReqData {
  title: string | undefined;
  isDone: boolean;
}
