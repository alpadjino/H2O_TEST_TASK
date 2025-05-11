import classNames from 'classnames';

export const ReportCard: React.FC<{ percent: number, value: string; label: string; selected: boolean }> = ({ value, label, selected, percent }) => {
  const cardClassname = classNames(
    `flex flex-col items-center justify-center text-center rounded-[24px] max-w-full md:max-w-[264px] p-[32px_53px] shadow leading-[44px] tracking-[-0.56px]`,
    {
      "bg-moderate-cyan text-white": selected,
      "bg-white text-very-dark-grayish-blue": !selected,
    }
  );

  const percentClassname = classNames('px-[38px] rounded-[24px] font-[16px] h-[36px] text-center', {
    "bg-[#F8F8F840]": selected,
    "bg-[#54D3C226] text-moderate-cyan": !selected && percent >= 0,
    "bg-[#FC5C6526] text-soft-red": !selected && percent <= 0,
  })

  return (
    <div className={cardClassname}>
      <div className={`${percentClassname}`}>
        <p className={`text-[16px] font-bold`}>{percent} %</p>
      </div>
      <p className="font-bold text-[28px] mt-[13px] leading-[44px] whitespace-nowrap">{value}</p>
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
};