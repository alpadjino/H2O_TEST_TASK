import { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from 'react-router';

import { ArrowDownIcon } from "@ui/atoms/Icons/ArrowDown";

import classNames from 'classnames';

interface Tab {
  title: string;
  content: string;
  link: string;
}

interface ITabs {
  tabs: Tab[]
};

const Tabs = ({ tabs }: ITabs) => {
  const { pathname } = useLocation();
  const navigate =  useNavigate()

  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleTabClick = (index: number) => {
    navigate(tabs[index].link);
    const node = tabRefs.current[index];
    if (node) {
      node.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handlePrev = () => {
    const currentIndex = tabs.findIndex((tab) => tab.link === pathname);
    const newIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;

    navigate(tabs[newIndex].link);

    // Используем setTimeout, чтобы дождаться обновления DOM после навигации
    setTimeout(() => {
      const newNode = tabRefs.current[newIndex];
      if (newNode) {
        newNode.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, 0);
  };

  const handleNext = () => {
    const currentIndex = tabs.findIndex((tab) => tab.link === pathname);
    const newIndex = currentIndex === tabs.length - 1 ? 0 : currentIndex + 1;

    navigate(tabs[newIndex].link);

    setTimeout(() => {
      const newNode = tabRefs.current[newIndex];
      if (newNode) {
        newNode.scrollIntoView({
          behavior: "smooth",
          inline: "center",
          block: "nearest",
        });
      }
    }, 0);
  };

  const tabClassname = (isSelected: boolean) => {
    return classNames(
      `text-[16px] relative text-center whitespace-nowrap transition-colors focus:outline-none`,
      {
        "text-gray-900 font-bold": isSelected,
        "text-gray-600 font-medium hover:text-gray-800": !isSelected,
      }
    );
  };

  const buttonClassname = `h-[40px] w-[40px] flex items-center justify-center rounded-full bg-white text-[#989FA3] hover:bg-gray-200 shadow-[0px_4px_18px_0px_rgba(210,209,209,0.5)]`;

  return (
    <div className="max-w-[754px]">
      <div className="relative flex items-center gap-[40px]">
        <div id='nav-buttons' className='flex gap-[8px]'>
          <button className={buttonClassname} onClick={handlePrev} aria-label="Предыдущий таб">
            <ArrowDownIcon className='rotate-90' />
          </button>
          <button className={buttonClassname} onClick={handleNext} aria-label="Следующий таб">
            <ArrowDownIcon className='rotate-270' />
          </button>
        </div>

        <div className="flex-1 overflow-x-auto scrollbar-hidden">
          <div className="relative">
            <div className="flex border-b border-gray-200 gap-3">
              {tabs.map((tab, index) => (
                <nav key={index}>
                  <Link
                    key={index}
                    to={tab.link}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    onClick={() => handleTabClick(index)}
                    className={tabClassname(tab.link === pathname)}
                    aria-selected={tab.link === pathname}
                    role="tab"
                    >
                    {tab.title}
                    <span
                      className={`absolute left-0 -bottom-[2px] h-[4px] bg-[#54D3C2] transition-all duration-300 ease-in-out origin-left ${
                        tab.link === pathname ? "w-full scale-x-100 opacity-100" : "w-full scale-x-0 opacity-0"
                      }`}
                    />
                  </Link>
                </nav>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Tabs };
