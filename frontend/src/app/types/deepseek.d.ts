declare module 'deepseek' {
  interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    choices: {
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
      index: number;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }
}