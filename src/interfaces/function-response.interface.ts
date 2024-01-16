interface FunctionResponse<T> {
  error?: {
    status: number;
    friendlyMessage?: string;
    error?: Error
  }
  data?: T;
}

export default FunctionResponse;