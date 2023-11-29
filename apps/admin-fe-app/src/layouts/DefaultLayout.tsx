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
      <div className="flex flex-row bg-background h-screen ">
        {/* Sidebar */}
        <div className="overflow-y-auto basis-1/6">
          <DeafultSideBar className="hidden lg:block bg-transparent" />{' '}
        </div>

        {/* Content area */}
        <div className="relative overflow-y-auto overflow-x-hidden basis-5/6">
          {/*  Site header */}
          <DefaultTopBar switchTheme={switchTheme} />
          <main>
            <div className="container px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
