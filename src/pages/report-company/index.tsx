import { useState } from 'react';
import { useGetDataQuery } from '@api/mockApi';

import { LineChart } from '@ui/molecules/Linechart';

import { ru } from "date-fns/locale/ru";
import { endOfDay, subDays, subYears } from "date-fns";
import { dataTransform } from '@ui/molecules/Linechart/utils/dataTransform';

import { DivisionType } from '@api/types';
import { ReportCard } from './ui/ReportCard';
import { ProblemZones } from './ui/ProblemZones';
import { ReportCompanyProvider } from './ctx/ReportCompanyCtx';
import { randomNumber } from '@business/utils/randomNumber';

function ReportCompany() {
  const [moneyType, setMoneyType] = useState<DivisionType | "">("");
  const [sortedBy, setSortedBy] = useState<"week" | "month" | "year">("week");

  const { data } = useGetDataQuery(
    { type: moneyType },
    {
      selectFromResult: ({ data }) => {
        const now = new Date();

        if (sortedBy === "week") {
          const weekStart = subDays(now, 7);
          const weekEnd = endOfDay(now);
          
          return dataTransform({ data, startDate: weekStart, endDate: weekEnd, groupBy: "day", dateFormat: "dd.MM" });
        }
        
        if (sortedBy === "month") {
          const thirtyDaysAgo = subDays(now, 30);
          const today = endOfDay(now);
          
          return dataTransform({ data, startDate: thirtyDaysAgo, endDate: today, groupBy: 'day', dateFormat: 'dd.MM' });
        }
        
        const oneYearAgo = subYears(now, 1);
        const today = endOfDay(now);
          
        return dataTransform({ data, startDate: oneYearAgo, endDate: today, groupBy: "month", dateFormat: "MMM yyyy", locale: ru });
      }
    }
  );

  return (
    <div>
      <h1 className="text-[28px] font-[800] leading-[44px] tracking-[-0.56px] mb-[19px]">
        Сводный отчет
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-[38px]">
        <div>
          <section className="flex flex-col md:flex-row gap-[40px] mb-6">
            <button onClick={() => setMoneyType("")}>
              <ReportCard percent={randomNumber({})} value="₽ 10 157 764" label="Итоги" selected={moneyType === ""} />
            </button>
            <button onClick={() => setMoneyType("B2B")}>
              <ReportCard percent={randomNumber({})} value="₽ 8 615 253" label="В2B" selected={moneyType === "B2B"} />
            </button>
            <button onClick={() => setMoneyType("B2C")}>
              <ReportCard percent={randomNumber({})} value="₽ -1 542 511" label="В2C" selected={moneyType === "B2C"} />
            </button>
          </section>

          <section className="h-[426px] bg-white rounded-[32px] px-[33px] py-[18px] gap-[25px]">
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-[20px] font-[700] leading-[44px] tracking-[-0.56px]">
                Общая статистика
              </h2>

              <div className="flex gap-5 pb-1">
                <button
                  onClick={() => setSortedBy("week")}
                  className={`pb-2 px-1 relative ${
                    sortedBy === "week"
                      ? "text-very-dark-grayish-blue font-[700] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-moderate-cyan after:animate-underline"
                      : "text-light-gray"
                  }`}
                >
                  Неделя
                </button>

                <button
                  onClick={() => setSortedBy("month")}
                  className={`pb-2 px-1 relative ${
                    sortedBy === "month"
                      ? "text-very-dark-grayish-blue font-[700] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-moderate-cyan after:animate-underline"
                      : "text-light-gray"
                  }`}
                >
                  Месяц
                </button>

                <button
                  onClick={() => setSortedBy("year")}
                  className={`pb-2 px-1 relative ${
                    sortedBy === "year"
                      ? "text-very-dark-grayish-blue font-[700] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-moderate-cyan after:animate-underline"
                      : "text-light-gray"
                  }`}
                >
                  Год
                </button>
              </div>
            </div>

            <div id="diagrams" className="w-full h-full">
              <LineChart data={data} />
            </div>
          </section>
        </div>
        <section className="bg-white h-full rounded-[32px] px-[32px] py-[17px]">
          <ProblemZones />
        </section>
      </div>
    </div>
  )
}

export default function ReportCompanyPage() {
  return (
    <ReportCompanyProvider>
      <ReportCompany />
    </ReportCompanyProvider>
);
}
