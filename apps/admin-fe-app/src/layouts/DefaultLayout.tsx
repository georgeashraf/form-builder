import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DeafultSideBar from '../components/DefaultSideBar';

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="bg-background">
      {/* <!-- ===== Page Wrapper Start ===== --> */}
      <div className="grid lg:grid-cols-6 h-screen">
        {/* <!-- ===== Sidebar Start ===== --> */}
        <DeafultSideBar className="hidden lg:block bg-transparent" />
        {/* <!-- ===== Sidebar End ===== --> */}

        <div className="col-span-3 lg:col-span-4 lg:border-l">
          <div className="h-full px-4 py-6 lg:px-8">
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                <Outlet />
              </div>
            </main>

            {/* <!-- ===== ain Content End ===== --> */}
          </div>
        </div>
      </div>
      {/* <!-- ===== Page Wrapper End ===== --> */}
    </div>
  );
};

export default DefaultLayout;
