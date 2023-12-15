import { Avatar, AvatarFallback, AvatarImage } from '@engine/design-system';
import ThemeSwitcher from './ThemeSwitcher';
interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  switchTheme: (s: string) => void;
}
const DefaultTopBar = ({ switchTheme }: TopBarProps) => {
  return (
    <div className="fixed w-full z-30 flex bg-background p-2 items-center justify-center h-16 px-10">
      <div className="logo ml-12  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
        LOGO HERE
      </div>
      <div className="grow h-full flex items-center justify-center"></div>
      <div className="flex-none h-full text-center flex items-center justify-center">
        <div className="flex space-x-3 items-center px-3">
          <div className="flex-none flex justify-center">
            <div className="w-8 h-8 flex ">
              <Avatar>
                <AvatarImage src="" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div className="hidden md:block text-sm md:text-md text-black">
            <ThemeSwitcher switchTheme={switchTheme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultTopBar;
