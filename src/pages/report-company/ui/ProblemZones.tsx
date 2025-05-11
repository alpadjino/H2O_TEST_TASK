import React, { useEffect, useState } from 'react'
import { useReportCompany } from '../ctx/ReportCompanyCtx';
import { randomNumber } from '@business/utils/randomNumber';
import { WarningIcon } from '@ui/atoms/Icons/WarningIcon';

type TExpansesArray = {
  expanse: string;
  sum: number;
}[];

const expansesTypes = [
  "Линейный персонал",
  "Подразделение разовых работ ФОТ",
  "Бензин (наличные)",
  "Закупка инвентаря",
  "Закупка спецодежды/СИЗ",
  "Ремонт оборудования",
  "Обслуживание автомобиля",
  "Форс-мажоры",
  "Рекламные бюджеты (Блогеры)",
  "Рекламные бюджеты (Контекст)",
];

/**
 * Функция имитатор. Разбивает общую сумму на несколько случайных расходов по категориям.
 * @param totalAmount Общая сумма для распределения.
 * @returns Массив расходов с категориями.
 */
const splitNumberIntoCategories = (totalAmount: number): TExpansesArray => {
  const categories: TExpansesArray = [];
  let remainingAmount = totalAmount;

  if (remainingAmount > 50000) {
    const max = Math.min(remainingAmount, 100000);
    const amount = randomNumber({ min: 50000, max });
    categories.push({
      expanse:
        expansesTypes[randomNumber({ min: 0, max: expansesTypes.length - 1 })],
      sum: amount,
    });
    remainingAmount -= amount;
  }

  if (remainingAmount > 10000) {
    while (remainingAmount > 10000) {
      const max = Math.min(remainingAmount, 50000);
      const min = Math.max(10000, Math.floor(remainingAmount / 3));
      const amount = randomNumber({ min, max });

      categories.push({
        expanse: expansesTypes[randomNumber({ min: 0, max: expansesTypes.length - 1 })],
        sum: amount,
      });
      remainingAmount -= amount;

      if (remainingAmount < 15000) break;
    }
  }

  if (remainingAmount > 0) {
    while (remainingAmount > 0) {
      const amount = randomNumber({ min: 1000, max: Math.min(remainingAmount, 10000),});
      categories.push({
        expanse: expansesTypes[randomNumber({ min: 0, max: expansesTypes.length - 1 })],
        sum: amount,
      });
      remainingAmount -= amount;
    }
  }

  return categories;
};

export const ProblemZones = () => {
  const { dots } = useReportCompany();
  const [expansesArray, setExpansesArray] = useState<TExpansesArray>([]);

  useEffect(() => {
    const expanses = dots.find((dot) => dot.dataKey === "Затраты");
    console.log("expanses", expanses);
    if (typeof expanses?.value === "number" && expanses?.value !== 0) {
      const number = expanses.value;
      const expansesArray = splitNumberIntoCategories(number);
      setExpansesArray(expansesArray);
    }
  }, [dots]);

  return (
    <React.Fragment>
      <h2 className="text-[20px] font-[700] leading-[44px] tracking-[-0.56px]">
        Проблемные зоны
      </h2>
      <div className="flex flex-col gap-[10px]">
        {expansesArray
          .filter(({ sum }) => sum > 9999)
          .map(({ expanse, sum }, index) => (
            <div key={index} className="flex items-center gap-[16px]">
              <div
                className={`flex items-center justify-center w-[30px] h-[30px] rounded-full ${
                  sum <= 50000 ? "bg-bright-orange-yellow" : "bg-soft-red"
                }`}
              >
                <WarningIcon fontSize={24} />
              </div>
              <div>
                <p className="text-dark-grayish-blue text-[14px] leading-[18px] tracking-[-0.56px] font-[600]">
                  {expanse}
                </p>
                <p className="text-[18px] leading-[120%] tracking-[0] font-[700]">
                  ₽ {sum}
                </p>
              </div>
            </div>
          ))}
      </div>
    </React.Fragment>
  );
}
