import { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './Dialog';
interface Iprops {
  children: ReactNode;
  title: string;
  description: string;
  trigger?: ReactNode;
}
const Modal = ({
  children,
  trigger,
  title,
  description,
}: Iprops) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);

export { Modal };
