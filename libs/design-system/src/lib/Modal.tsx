import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { title } from 'process';
import { ReactNode } from 'react';
import './styles.css';
interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
  description: string;
  trigger?: ReactNode;
}
const Modal = ({
  isOpen,
  onClose,
  children,
  trigger,
  title,
  description,
}: Iprops) => (
  <Dialog.Root onOpenChange={onClose} open={isOpen}>
    <Dialog.Trigger asChild>
      {trigger ? trigger : <button className="Button violet">{title}</button>}
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          {description}
        </Dialog.Description>
        {children}
        <div
          style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}
        >
          {/* <Dialog.Close asChild>
            <button className="Button green">Save changes</button>
          </Dialog.Close> */}
        </div>
        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            <Cross2Icon />
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export { Modal };
