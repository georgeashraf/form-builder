import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DeafultSideBar from '../components/DefaultSideBar';
import DefaultTopBar from '../components/DefaultTopBar';

const DefaultLayout = ({
  switchTheme,
}: {
  switchTheme: (s: string) => void;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex">
        <DeafultSideBar className="flex-none bg-transparent h-screen basis-1/6" />
        <div className="flex-1 md:flex h-screen relative basis-5/6">
          <DefaultTopBar switchTheme={switchTheme} />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
