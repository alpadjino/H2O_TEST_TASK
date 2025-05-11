import { useEffect } from 'react';
import { useChart } from '../../ctx/ChartContext';

import { splitSummary } from '@business/utils/splitSummary';

export const CustomizedDot = (props: { cx?: number; cy?: number; dataKey?: string; }) => {
  const { chartX, chartY, dots } = useChart();

  const { cx, cy, dataKey } = props;
  const activeDot = dots?.find((dot) => dot.dataKey === dataKey);
  const areAllValuesValid = [cx, cy, chartX, chartY].every(
    (value) => value && typeof value === "number" && !isNaN(value)
  );

  const isClose =
    areAllValuesValid &&
    Math.abs(chartX! - cx!) < 10 &&
    Math.abs(chartY! - cy!) < 10;

  if (isClose) {
    return (
      <g>
        <circle
          cx={cx}
          cy={cy}
          r={8}
          fill="white"
          stroke={activeDot?.stroke}
          strokeWidth={3}
        />

        <g>
          <svg
            width="108"
            height="42"
            viewBox="0 0 108 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            x={cx ? cx - 54 : 0}
            y={cy ? cy - 50 : 0}
            z={9999}
          >
            <mask
              id="path-1-inside-1_2629_141"
              fill="white"
              textAnchor="center"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 0C2.68629 0 0 2.68629 0 6V30C0 33.3137 2.68629 36 6 36H47.0718L53.3453 41.4331C53.7211 41.7585 54.2789 41.7585 54.6547 41.4331L60.9282 36H102C105.314 36 108 33.3137 108 30V6C108 2.68629 105.314 0 102 0H6Z"
              />
            </mask>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6 0C2.68629 0 0 2.68629 0 6V30C0 33.3137 2.68629 36 6 36H47.0718L53.3453 41.4331C53.7211 41.7585 54.2789 41.7585 54.6547 41.4331L60.9282 36H102C105.314 36 108 33.3137 108 30V6C108 2.68629 105.314 0 102 0H6Z"
              fill="white"
            />
            <path
              d="M47.0718 36L48.0538 34.8661L47.631 34.5H47.0718V36ZM53.3453 41.4331L52.3634 42.5669L52.3634 42.5669L53.3453 41.4331ZM54.6547 41.4331L53.6727 40.2992H53.6727L54.6547 41.4331ZM60.9282 36V34.5H60.369L59.9462 34.8661L60.9282 36ZM1.5 6C1.5 3.51472 3.51472 1.5 6 1.5V-1.5C1.85786 -1.5 -1.5 1.85787 -1.5 6H1.5ZM1.5 30V6H-1.5V30H1.5ZM6 34.5C3.51472 34.5 1.5 32.4853 1.5 30H-1.5C-1.5 34.1421 1.85787 37.5 6 37.5V34.5ZM47.0718 34.5H6V37.5H47.0718V34.5ZM54.3273 40.2992L48.0538 34.8661L46.0898 37.1339L52.3634 42.5669L54.3273 40.2992ZM53.6727 40.2992C53.8606 40.1364 54.1394 40.1364 54.3273 40.2992L52.3634 42.5669C53.3028 43.3805 54.6972 43.3805 55.6366 42.5669L53.6727 40.2992ZM59.9462 34.8661L53.6727 40.2992L55.6366 42.5669L61.9102 37.1339L59.9462 34.8661ZM102 34.5H60.9282V37.5H102V34.5ZM106.5 30C106.5 32.4853 104.485 34.5 102 34.5V37.5C106.142 37.5 109.5 34.1421 109.5 30H106.5ZM106.5 6V30H109.5V6H106.5ZM102 1.5C104.485 1.5 106.5 3.51472 106.5 6H109.5C109.5 1.85786 106.142 -1.5 102 -1.5V1.5ZM6 1.5H102V-1.5H6V1.5Z"
              fill={activeDot?.stroke}
              mask="url(#path-1-inside-1_2629_141)"
            />
            <text
              x={53}
              y={20}
              fill="#333"
              fontSize={18}
              fontWeight={600}
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {splitSummary(activeDot?.value)} ₽
            </text>
          </svg>
        </g>
      </g>
    );
  }

  return (
    <svg>
      <path />
    </svg>
  );
};