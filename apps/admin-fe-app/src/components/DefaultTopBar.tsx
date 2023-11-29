import { Avatar, AvatarFallback, AvatarImage } from '@engine/design-system';
import ThemeSwitcher from './ThemeSwitcher';
interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  switchTheme: (s: string) => void;
}
const DefaultTopBar = ({ switchTheme }: TopBarProps) => {
  return (
    <nav className='flex justify-end'>
      <Avatar>
        <AvatarImage src="" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
      <ThemeSwitcher switchTheme={switchTheme} />
    </nav>
  );
};

export default DefaultTopBar;
