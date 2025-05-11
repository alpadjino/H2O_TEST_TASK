import React, { createContext, useContext, useState } from 'react';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface ChartContextType {
  chartX: number | undefined;
  chartY: number | undefined;
  setChartCoords: (x: number | undefined, y: number | undefined) => void;
  dots: Payload<ValueType, NameType>[] | [];
  setDots: (dots: Payload<ValueType, NameType>[] | []) => void;
}

const ChartContext = createContext<ChartContextType | undefined>(undefined);

export const useChart = () => {
  const context = useContext(ChartContext);
  if (!context) {
    throw new Error('useChart должен использовать с ChartProvider');
  }
  return context;
};

export const ChartProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [chartX, setChartX] = useState<number | undefined>();
  const [chartY, setChartY] = useState<number | undefined>();
  const [dots, setDots] = useState<Payload<ValueType, NameType>[] | []>([]);

  const setChartCoords = (x: number | undefined, y: number | undefined) => {
    setChartX(x);
    setChartY(y);
  };

  return (
    <ChartContext.Provider value={{ chartX, chartY, setChartCoords, dots, setDots }}>
      {children}
    </ChartContext.Provider>
  );
};