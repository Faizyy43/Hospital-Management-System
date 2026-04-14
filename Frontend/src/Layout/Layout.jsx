import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Navbar from "../modules/Patient/components/Navbar";

const Layout = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Navbar />

      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Right Section */}
      <div className="flex flex-col flex-1 relative pt-16">
        {/* Topbar */}
        <Topbar setIsOpen={setIsOpen} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
