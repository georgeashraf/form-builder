import { cn } from '@engine/design-system';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  BorderAllIcon,
  HamburgerMenuIcon,
  ListBulletIcon,
  RowsIcon,
} from '@radix-ui/react-icons';
enum Routes {
  requests,
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  sidebarOpen: boolean;
}
const DeafultSideBar = ({ setSidebarOpen, sidebarOpen }: SidebarProps) => {
  const [active, setActive] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    Object.keys(Routes).some((v) => {
      if (location.pathname.includes(v)) setActive(v);
    });
  }, [location]);
  return (
    <aside
      className={cn(
        'w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-background ',
        sidebarOpen ? 'translate-x-none' : '-translate-x-48'
      )}
    >
      <div
        className={cn(
          'w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between  bg-background  absolute top-2 rounded-full h-12',
          sidebarOpen ? 'translate-x-0' : 'translate-x-24 scale-x-0'
        )}
      ></div>
      {/* Side Bar Toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-text  bg-background absolute top-2 p-3 rounded-full text-text"
      >
        <HamburgerMenuIcon />
      </button>
      {/* Large Side Bar */}
      <div
        className={cn(
          'text-text mt-20 flex-col space-y-2 w-full h-[calc(100vh)]',
          sidebarOpen ? 'flex' : 'hidden'
        )}
      >
        <Link to="/requests">
          <div className=" w-full text-text  bg-background p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
            <BorderAllIcon />
            <div>Requests</div>
          </div>
        </Link>
        <Link to="/lists">
          <div className=" w-full text-text  bg-background p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
            <ListBulletIcon />
            <div>Lists</div>
          </div>
        </Link>
      </div>
      {/* Small Side Bar */}
      <div
        className={cn(
          'mt-20  flex-col space-y-2 w-full h-[calc(100vh)]',
          sidebarOpen ? 'hidden' : 'flex'
        )}
      >
        <div className=" justify-end pr-5 text-text w-full bg-background p-3 rounded-full transform ease-in-out duration-300 flex">
          <Link to="/requests">
            <BorderAllIcon />
          </Link>
        </div>
        <div className=" justify-end pr-5 text-text w-full bg-background p-3 rounded-full transform ease-in-out duration-300 flex">
          <Link to="/Lists">
            <ListBulletIcon />
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default DeafultSideBar;
