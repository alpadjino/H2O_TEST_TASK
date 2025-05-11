import { WarningIcon } from '@ui/atoms/Icons/WarningIcon';
import { useChart } from '../../ctx/ChartContext';
import { splitSummary } from '@business/utils/splitSummary';

export const CustomLegeng = () => {
  const { dots } = useChart();

  return (
    <div className="flex flex-nowrap pt-[10px] pb-[30px] gap-[20px]">
      {dots?.map(({ dataKey, stroke, value }) => (
        <div key={dataKey} className="flex gap-4 items-center">
          <div className={`flex items-center justify-center w-[28px] h-[28px] rounded-full`} style={{ backgroundColor: stroke }}>
            {(dataKey === "Прибыль" || dataKey === "Затраты") && <WarningIcon fontSize={20} />}
          </div>
          <div className="flex flex-col">
            <div className="text-[14px] font-[600] text-dark-grayish-blue">
              {dataKey ?? ""}
            </div>
            <div className="text-[16px] font-[700] whitespace-nowrap">₽ {splitSummary(value)}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
