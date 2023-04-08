export interface ApiResponse {
  status: string;
  message: string;
  data: [] | null;
}

export interface ApiReqData {
  title: string;
  isDone: boolean;
}
