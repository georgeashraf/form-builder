import { cn } from '@engine/design-system';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useNavigation } from 'react-router-dom';
import { Button } from '@engine/design-system';
import { BorderAllIcon, RowsIcon } from '@radix-ui/react-icons';

enum Routes {
  requests
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
const DeafultSideBar = ({ className }: SidebarProps) => {
  const [active, setActive] = useState('');
  const navigate = useNavigate()
  const location = useLocation();
  useEffect(() => {
    Object.keys(Routes).some((v) => {
      if (location.pathname.includes(v)) setActive(v);
    });
  }, [location]);
  return (
    <>
      <div className={cn('pb-12 h-screen', className)}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Forms & Entities
            </h2>
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start" onClick={()=> navigate('/requests')}>
                <BorderAllIcon className="mx-2" />
                Requests
              </Button>
            </div>
          </div>
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              User Permisions
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <RowsIcon className="mx-2" />
                test
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeafultSideBar;
