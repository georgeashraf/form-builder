import { cn } from '@engine/design-system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BorderAllIcon,
  HamburgerMenuIcon,
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
        'w-60 fixed transition transform ease-in-out duration-1000 z-50 flex h-screen bg-[#1E293B] ',
        sidebarOpen ? 'translate-x-none' : '-translate-x-48'
      )}
    >
      <div
        className={cn(
          'w-full -right-6 transition transform ease-in duration-300 flex items-center justify-between  bg-[#1E293B]  absolute top-2 rounded-full h-12',
          sidebarOpen ? 'translate-x-0' : 'translate-x-24 scale-x-0'
        )}
      ></div>
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="-right-6 transition transform ease-in-out duration-500 flex border-4 border-white dark:border-[#0F172A] bg-[#1E293B] absolute top-2 p-3 rounded-full text-white"
      >
        <HamburgerMenuIcon />
      </button>
      <div
        className={cn(
          'text-white mt-20 flex-col space-y-2 w-full h-[calc(100vh)]',
          sidebarOpen ? 'flex' : 'hidden'
        )}
      >
        <div className=" w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
          <div>Home</div>
        </div>
        <div className=" w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
          <div>Table</div>
        </div>
        <div className=" w-full text-white hover:text-purple-500 dark:hover:text-blue-500 bg-[#1E293B] p-2 pl-8 rounded-full transform ease-in-out duration-300 flex flex-row items-center space-x-3">
          <div>Graph</div>
        </div>
      </div>
      <div
        className={cn(
          'mt-20  flex-col space-y-2 w-full h-[calc(100vh)]',
          sidebarOpen ? 'hidden' : 'flex'
        )}
      >
        <div className=" justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </div>
        <div className=" justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        </div>
        <div className=" justify-end pr-5 text-white hover:text-purple-500 dark:hover:text-blue-500 w-full bg-[#1E293B] p-3 rounded-full transform ease-in-out duration-300 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
            />
          </svg>
        </div>
      </div>
    </aside>
  );
};

export default DeafultSideBar;
