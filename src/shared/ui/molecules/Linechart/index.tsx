import { ChartProvider } from './ctx/ChartContext';

import { ResponsiveContainer } from "recharts";
import { ChartContent } from './ui/ChartContent';
import { TransformDataProps } from './utils/dataTransform';

interface ILineChart {
  data: TransformDataProps[];
};

export const LineChart = ({ data }: ILineChart) => {
  return (
    <ChartProvider>
      <ResponsiveContainer width="100%" height="100%">
        <ChartContent data={data} />
      </ResponsiveContainer>
    </ChartProvider>
  );
};