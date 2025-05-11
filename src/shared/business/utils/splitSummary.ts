type SplitSummaryReturn<T> = T extends string | number ? string : T;

export function splitSummary<T>(summary: T): SplitSummaryReturn<T> {
  if (!summary) return summary as SplitSummaryReturn<T>;

  const num = Number(summary);
  if (isNaN(num)) return summary as SplitSummaryReturn<T>;

  return new Intl.NumberFormat("ru-RU").format(num) as SplitSummaryReturn<T>;
}
