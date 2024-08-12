export function extractErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}
