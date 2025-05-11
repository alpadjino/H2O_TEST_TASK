import React, { createContext, useContext, useState } from 'react';
import { NameType, Payload, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface ReportCompanyContextType {
  dots: Payload<ValueType, NameType>[] | [];
  setDots: (dots: Payload<ValueType, NameType>[] | []) => void;
}

const ReportCompanyContext = createContext<ReportCompanyContextType | undefined>(undefined);

export const useReportCompany = () => {
  const context = useContext(ReportCompanyContext);
  if (!context) {
    throw new Error("useReportCompany должен использовать с ReportCompanyProvider");
  }
  return context;
};

export const ReportCompanyProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [dots, setDots] = useState<Payload<ValueType, NameType>[] | []>([]);

  return (
    <ReportCompanyContext.Provider value={{ dots, setDots }}>
      {children}
    </ReportCompanyContext.Provider>
  );
};