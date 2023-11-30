import * as React from 'react';
import { cn } from './utils/helpers';

interface TextareaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, type, id, onChange, value, placeholder, ...props }, ref) => {
    return (
      <textarea
        {...props}
        dir="auto"
        id={id}
        onChange={onChange}
        title={props.disabled ? 'Readonly. Cannot edit.' : props.title}
        placeholder={placeholder}
        value={value}
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

export { Textarea };
