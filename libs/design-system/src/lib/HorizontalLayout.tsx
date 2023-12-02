import { ReactNode } from 'react';

const HorizontalLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`flex flex-row`}>{children}</div>;
};

export { HorizontalLayout };
