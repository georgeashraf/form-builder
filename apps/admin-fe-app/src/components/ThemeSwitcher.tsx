import { Tabs, TabsList, TabsTrigger } from '@engine/design-system';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';

const ThemeSwitcher = ({
  switchTheme,
}: {
  switchTheme: (s: string) => void;
}) => {
  return (
    <Tabs>
      <TabsList className="border">
        <TabsTrigger value="light" onClick={() => switchTheme('light')}>
          <SunIcon className="h-[1.2rem] w-[1.2rem]" />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => switchTheme('dark')}>
          <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-90 transition-all dark:rotate-0" />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ThemeSwitcher;
