export function formatScore(score: number): string {
  const intl = new Intl.NumberFormat("en-US");
  return intl.format(score);
}
