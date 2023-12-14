import { cn } from '@engine/design-system';
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
      <>
        <DefaultTopBar switchTheme={switchTheme} />
        <DeafultSideBar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={cn(
            'h-screen  relative transform ease-in-out duration-500 pt-20 px-2 md:px-5 pb-4 ',
            sidebarOpen ? 'ml-12 md:ml-60' : 'ml-12'
          )}
        >
          <Outlet />
        </div>
      </>
    </>
  );
};

export default DefaultLayout;
