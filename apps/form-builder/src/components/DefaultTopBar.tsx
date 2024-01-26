import { Avatar, AvatarFallback, AvatarImage } from '@engine/design-system';
import ThemeSwitcher from './ThemeSwitcher';
interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  switchTheme: (s: string) => void;
}
const DefaultTopBar = ({ switchTheme }: TopBarProps) => {
  return (
    <div className="fixed w-full z-30 flex bg-background p-2 items-center justify-center h-16 px-10">
      <div className="logo transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
        Form Builder
      </div>
      <div className="grow h-full flex items-center justify-center"></div>
      <div className="flex-none h-full text-center flex items-center justify-center">
        <div className="flex space-x-3 items-center px-3">
          <div className="hidden md:block text-sm md:text-md text-black">
            <ThemeSwitcher switchTheme={switchTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultTopBar;
