import { eachDayOfInterval, eachMonthOfInterval, format, isWithinInterval, Locale, parseISO } from 'date-fns';
import { MockData } from 'src/api/types';

export interface TransformDataProps {
  name: string;
  debt: number;
  revenue: number;
  expanses: number;
  income: number;
  total: number;
}

interface ProcessDataParams {
  data?: MockData;
  startDate: Date;
  endDate: Date;
  groupBy: "day" | "month";
  dateFormat: string;
  locale?: Locale;
}

const dataTransform = ({ data, startDate, endDate, groupBy, dateFormat, locale }: ProcessDataParams): { data: TransformDataProps[] } => {
  const filteredData = data?.filter((item) => {
    const itemDate = parseISO(item.date);
    return isWithinInterval(itemDate, { start: startDate, end: endDate });
  });

  const groupedData = filteredData?.reduce((acc, item) => {
    const itemDate = parseISO(item.date);
    const key = format(itemDate, groupBy === "day" ? "yyyy-MM-dd" : "yyyy-MM");
    const displayDate = locale ? format(itemDate, dateFormat, { locale }) : format(itemDate, dateFormat);

    if (!acc[key]) {
      acc[key] = {
        name: displayDate,
        debt: 0,
        revenue: 0,
        expanses: 0,
        income: 0,
        total: 0
      };
    }

    switch (item.type) {
      case "debt":
        acc[key].debt += parseFloat(item.amount);
        break;
      case "revenue":
        acc[key].revenue += parseFloat(item.amount);
        break;
      case "expanses":
        acc[key].expanses += parseFloat(item.amount);
        break;
      case "income":
        acc[key].income += parseFloat(item.amount);
        break;
    }

    return acc;
  }, {} as Record<string, TransformDataProps>);

  const timeUnits = groupBy === "day" ? eachDayOfInterval({ start: startDate, end: endDate }) : eachMonthOfInterval({ start: startDate, end: endDate });

  const completeData = timeUnits.map((unit) => {
    const key = format(unit, groupBy === "day" ? "yyyy-MM-dd" : "yyyy-MM");
    const displayDate = locale
      ? format(unit, dateFormat, { locale })
      : format(unit, dateFormat);

    return (
      groupedData?.[key] || {
        name: displayDate,
        debt: 0,
        revenue: 0,
        expanses: 0,
        income: 0,
        total: 0,
      }
    );
  });

  const subResults: TransformDataProps[] = completeData.sort((a, b) => {
    const dateA = parseISO(a.name);
    const dateB = parseISO(b.name);
    return dateA.getTime() - dateB.getTime();
  });

  const result = subResults.map((v) => ({ ...v, total: v.debt + v.expanses + v.income + v.revenue }))

  return { data: result };
};

export { dataTransform };
