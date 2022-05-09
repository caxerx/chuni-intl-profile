export interface JsonDiffResult {
  added: unknown;
  deleted: unknown;
  updated: unknown;
}

export interface User {
  userId: string;
  username: string;
}
