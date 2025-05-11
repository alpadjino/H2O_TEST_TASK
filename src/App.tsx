import React from 'react';

import { Sidebar } from '@ui/molecules/Sidebar';
import { Navigate, Outlet, Route, Routes } from 'react-router';

import ReportCompany from './pages/report-company';
import { Tabs } from '@ui/molecules/Tabs';
import { ArrowDownIcon } from '@ui/atoms/Icons/ArrowDown';

const tabs = [
  {
    title: "Свод данных по сотрудникам",
    content: "Контент для 'Свод данных по сотрудникам'",
    link: "/reports/employees",
  },
  {
    title: "Сводный отчет внутри компании",
    content: "Контент для 'Сводный отчет внутри компании'",
    link: "/reports/company",
  },
  {
    title: "Сводный отчет по сделкам",
    content: "Контент для 'Сводный отчет по сделкам'",
    link: "/reports/deals",
  },
];

const Report = () => {
  return (
    <main className="grid grid-rows-[auto_1fr] bg-white w-full rounded-[56px_56px_0_0]">
      <header className="px-[40px] py-[50px] flex justify-between">
        <section id="tab-slider">
          <Tabs tabs={tabs} />
        </section>

        <section className="w-[361px] flex items-start gap-[23px]">
          <div className="h-[56px] w-[56px]">
            <img
              src="/kristina.png"
              alt="Аватар пользователя"
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col justify-center h-full">
            <span className="font-bold text-[16px] leading-[16px] tracking-[0.44px]">
              Kristina 🐰
            </span>
            <span className="font-semibold text-dark-grayish-blue text-[14px] leading-[14px] tracking-[0.15px] mt-1">
              менеджер продаж
            </span>
          </div>

          <div className="ml-auto my-auto">
            <ArrowDownIcon />
          </div>
        </section>
      </header>
      <section className='bg-[#F8F8F8] px-[40px] py-[28px] rounded-[56px_56px_0_0]'>
        <Outlet />
      </section>
    </main>
  );
};

const App: React.FC = () => {
  
  return (
    <div className="flex bg-linear-to-b from-moderate-cyan to-dark-moderate-cyan rounded-[56px_56px_0_0] min-h-screen">
      <Sidebar />

      <Routes>
        <Route path="reports" element={<Report />}>
          <Route path="company" element={<ReportCompany />} />
          <Route path="employees" element={<div>Свод данных по сотрудникам</div>} />
          <Route path="deals" element={<div>Сводный отчет по сделкам</div>} />
        </Route>

        <Route path="*" element={<Navigate to="/reports" />} />
      </Routes>
    </div>
  );
};

export default App;