import React, { useState } from "react";
import { FaCog } from "react-icons/fa";

import Header from "../Header_Components/Header";
import Sidemenu from "../Sidemanu_Components/Sidemenu";
import Dbmain from "./Dbmain";

const Dashboard = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <Sidemenu />
      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}

        <Header />

        {/* Main section */}
        <main className="flex flex-col flex-1 p-4 overflow-y-auto justify-start lg:gap-10 bg-gray-100">
          <div>
            <h1 className="font-bold text-base"> Hello, QubicGen</h1>
            <h1 className="font-light text-xs">Have a nice day</h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <Dbmain />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
