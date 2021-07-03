export function useIsProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}
