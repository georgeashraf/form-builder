import ThemeSwitcher from './ThemeSwitcher';
interface TopBarProps extends React.HTMLAttributes<HTMLDivElement> {
  switchTheme: (s: string) => void;
}
const DefaultTopBar = ({ switchTheme }: TopBarProps) => {
  return (
    <nav>
      <ThemeSwitcher switchTheme={switchTheme} />
    </nav>
  );
};

export default DefaultTopBar;
