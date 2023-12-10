import { cn } from '@engine/design-system';
import { Children, ReactNode } from 'react';
import { FormElementInstance, FormElements } from './types';

const FormLayoutWrapper = ({
  element,
  children,
}: {
  element: FormElementInstance;
  children: ReactNode;
}) => {
  const DesignerElement = FormElements[element.subtype].formComponent;
  return (
    <div
      className={cn(
        'relative flex flex-col text-foreground hover:cursor-pointer rounded-md ',
        element.type === 'Layout' ? 'h-full' : 'h-[120px]'
      )}
    >
      <div
        className={cn(
          'flex w-full items-center rounded-md  px-4 py-2 pointer-events-none opacity-100',
          element.type === 'Layout' ? 'h-full' : 'h-[120px]'
        )}
      >
        <DesignerElement elementInstance={element}>{children}</DesignerElement>
      </div>
    </div>
  );
};

export default FormLayoutWrapper;
