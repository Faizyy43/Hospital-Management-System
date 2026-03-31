import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">

      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      <div className="flex flex-col flex-1">
        <Topbar setIsOpen={setIsOpen} />

        <main className="flex-1 p-5 overflow-y-auto">
          <div className="max-w-7xl mx-auto w-full">
            <Outlet />
            
          </div>
        </main>
      </div>

    </div>
  );
};

export default Layout;