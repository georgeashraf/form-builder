import { cn } from '@engine/design-system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@engine/design-system';
import { BorderAllIcon, RowsIcon } from '@radix-ui/react-icons';

enum Routes {
  users,
  groups,
  departments,
  forms,
  formElements,
  layouts,
  formLayouts,
  formRules,
  enums,
  states,
  actions,
  transitions,
  bussinesRules,
}

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}
const DeafultSideBar = ({ className }: SidebarProps) => {
  const [active, setActive] = useState('');
  const location = useLocation();
  useEffect(() => {
    Object.keys(Routes).some((v) => {
      if (location.pathname.includes(v)) setActive(v);
    });
  }, [location]);
  return (
    <>
      <div className={cn('pb-12', className)}>
        <div className="space-y-4 py-4">
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Forms & Entities
            </h2>
            <div className="space-y-1">
              <Button variant="secondary" className="w-full justify-start">
                <BorderAllIcon className="mx-2" />
                Form Builder
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
