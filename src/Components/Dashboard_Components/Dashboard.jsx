import React, { useState } from "react";

import Dbmain from "./Dbmain"; // Assuming path is correct
import Sidemenu from "../Sidemanu_Components/Sidemenu";
import Header from "../Header_Components/Header";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}

      <Sidemenu sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />      {/* Main content */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        {/* Header */}

        <Header toggleSidebar={toggleSidebar} />
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
