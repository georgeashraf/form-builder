import { Row } from '@tanstack/react-table';

import { Button } from '.././button';
import { useNavigate } from 'react-router-dom';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../DropDownMenu';
export type DataTableRowActionsProps = {
  setRefetch: (x: boolean) => void;
  setActiveModal: (x: any | undefined) => void;
  row: Row<any>;
  refetch: boolean;
  activeModal: any | undefined;
};
export function DataTableRowActions({
  row,
  setActiveModal,
  setRefetch,
  refetch,
  activeModal,
}: DataTableRowActionsProps) {
  const navigate = useNavigate();

  const closeModal = () => {
    setActiveModal(undefined);
    setRefetch(!refetch);
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          {/* <DropdownMenuSeparator />
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Tags className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Labels
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuRadioGroup value={"xxx"}>
              {labels.map((label) => (
                <DropdownMenuRadioItem key={label.value} value={label.value}>
                  {label.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator /> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
