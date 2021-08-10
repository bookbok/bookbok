export function useIsProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function unreachable(v: never): never {
  throw new Error('unreachable');
}
