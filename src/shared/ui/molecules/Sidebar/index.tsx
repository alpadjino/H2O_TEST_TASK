import React, { JSX } from "react";

import { BadgeIcon } from "@ui/atoms/Icons/BadgeIcon";
import { CalendarIcon } from "@ui/atoms/Icons/CalendarIcon";
import { ClosedBoxIcon } from "@ui/atoms/Icons/ClosedBoxIcon";
import { UsersIcon } from "@ui/atoms/Icons/UsersIcon";
import { SettingsIcon } from "@ui/atoms/Icons/SettingsIcon";
import { PieChartIcon } from "@ui/atoms/Icons/PieChartIcon";
import { ExchangeIcon } from "@ui/atoms/Icons/ExchangeIcon";

import LogoH2O from "@assets/logo.svg";

export const Sidebar = () => {
  interface TMenuList {
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
    width: number;
    height?: number;
  }

  const ASIDE_MENU_LIST: TMenuList[] = [
    {
      icon: CalendarIcon,
      width: 20,
    },
    {
      icon: BadgeIcon,
      width: 22,
    },
    {
      icon: ClosedBoxIcon,
      width: 22,
    },
    {
      icon: UsersIcon,
      width: 26,
    },
    {
      icon: ExchangeIcon,
      width: 22,
    },
    {
      icon: PieChartIcon,
      width: 24,
    },
    {
      icon: SettingsIcon,
      width: 22,
    },
  ];

  return (
    <aside className="w-[100px] px-[24px] py-[40px] bg-linear-to-b from-moderate-cyan to-dark-moderate-cyan rounded-[56px_0_0_56px]">
      <div className="mb-[60px]">
        <img src={LogoH2O} alt="Логотип H2O" className="max-w-full" />
      </div>
      <nav>
        <ul className="space-y-[16px]">
          {ASIDE_MENU_LIST.map(({ icon: Icon, width }, index) => (
            <li key={index} className="flex items-center justify-center">
              <button className="cursor-pointer flex items-center justify-center h-[48px] w-[48px] hover:bg-very-soft-cyan/75 rounded-[12px]">
                <Icon height={28} width={width} />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
