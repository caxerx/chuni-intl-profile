export interface JsonDiffResult<T = unknown> {
  added: Record<string, T>;
  deleted: Record<string, T>;
  updatedDiff: Record<string, Partial<T>>;
  updated: Record<string, T>;
}
