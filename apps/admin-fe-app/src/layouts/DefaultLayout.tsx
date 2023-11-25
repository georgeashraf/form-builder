import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DeafultSideBar from '../components/DefaultSideBar';
import DefaultTopBar from '../components/DefaultTopBar';

const DefaultLayout = ({
  switchTheme,
}: {
  switchTheme: (s: string) => void;
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background">
      {/* <!-- ===== Page Wrapper Start ===== --> */}

      <div className="grid lg:grid-cols-6 h-screen">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <DeafultSideBar className="hidden lg:block bg-transparent" />
        {/* <!-- ===== Sidebar End ===== --> */}
        {/* <!-- ===== Top Bar Start ===== --> */}
        <div className="lg:col-end-10 lg:col-span-2">
          <DefaultTopBar switchTheme={switchTheme} />
        </div>

        {/* <!-- ===== Top Bar End ===== --> */}
        <div className="col-span-4 lg:col-span-4">
          <div className="h-full px-4 py-6 lg:px-8">
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>

            {/* <!-- ===== Main Content End ===== --> */}
          </div>
        </div>
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
