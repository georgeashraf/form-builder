import { ReactNode } from 'react';

const VerticalLayout = ({ children }: { children: ReactNode }) => {
  return <div className={`flex flex-col`}>{children}</div>;
};

export { VerticalLayout };
