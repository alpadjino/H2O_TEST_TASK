import { useEffect } from 'react';
import { useChart } from '../../ctx/ChartContext';

import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { CustomLegeng } from '../Legend';
import { CustomizedDot } from '../Dot';
import { MoneyOperationType } from 'src/api/types';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { TransformDataProps } from '../../utils/dataTransform';
import { useReportCompany } from '@pages/report-company/ctx/ReportCompanyCtx';

type TOperations = {
  operation: MoneyOperationType | "total";
  color: string;
}[];

const OPERATIONS: TOperations = [
  { operation: "debt", color: "rgba(245, 226, 48, 1)" },
  { operation: "expanses", color: "rgba(48, 199, 220, 1)" },
  { operation: "income", color: "rgba(69, 170, 242, 1)" },
  { operation: "revenue", color: "rgba(115, 207, 122, 1)" },
  { operation: "total", color: "rgba(172, 116, 252, 1)" },
];

const RUSSIAN_LABELS: Record<keyof Omit<TransformDataProps, "name">, string> = {
  debt: "Задолжность",
  expanses: "Затраты",
  income: "Прибыль",
  revenue: "Выручка",
  total: "Итог",
};

type TTypeProps = {
  payload: Payload<ValueType, NameType>[] | undefined;
};

const Tt = ({ payload }: TTypeProps) => {
  const { dots, setDots } = useChart();
  const { setDots: setCompanyDots } = useReportCompany();
  
  useEffect(() => {
    if (!payload || payload.length === 0) {
      return;
    }

    if (dots.length === 0) {
      setDots(payload);
      return;
    }

    const hasChanges = payload.some((item, index) => item.value !== dots[index].value);

    if (hasChanges) {
      setDots(payload);
      setCompanyDots(payload);
    }
  }, []);

  return <div />;
};

export const ChartContent = ({ data }: { data: TransformDataProps[] }) => {
  const { setChartCoords } = useChart();

  const translatedData = data.map((item) => {
    const newItem: Record<string, unknown> = {};
    Object.keys(item).forEach((key) => {
      const typedKey = key as keyof typeof item;
      if (typedKey !== "name") {
        newItem[RUSSIAN_LABELS[typedKey] || typedKey] = item[typedKey];
      }
    });
    return newItem;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ReLineChart
        data={translatedData}
        margin={{ top: 50, right: 55, left: 55, bottom: 5 }}
        onMouseMove={(state) => {
          setChartCoords(state.chartX, state.chartY);
        }}
      >
        <CartesianGrid horizontal={false} strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <Tooltip content={(props) => <Tt payload={props.payload} />} />
        <Legend content={<CustomLegeng />} />
        {OPERATIONS.map(({ operation, color }) => (
          <Line
            type="monotone"
            dataKey={RUSSIAN_LABELS[operation]}
            stroke={color}
            strokeWidth={3}
            dot={false}
            activeDot={(props: {
              dataKey?: string;
              cx?: number;
              cy?: number;
            }) => (
              <CustomizedDot
                cx={props.cx}
                cy={props.cy}
                dataKey={props.dataKey}
              />
            )}
          />
        ))}
      </ReLineChart>
    </ResponsiveContainer>
  );
};
