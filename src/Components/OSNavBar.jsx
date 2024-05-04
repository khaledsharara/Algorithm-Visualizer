import React from "react";

const OSNavBar = () => {
  return (
    <nav class="bg-white border-gray-200 dark:bg-gray-900">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a class="flex items-center space-x-3 rtl:space-x-reverse">
          <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gantt Chart Visualizer
          </span>
        </a>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <p className="text-xs text-white font-semibold">
            By Khaled Hesham, Abdelrahman Haitham, Menna Suliman & Abdullah
            Tarek
          </p>
        </div>
      </div>
    </nav>
  );
};

export default OSNavBar;
