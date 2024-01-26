import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@engine/design-system';
import { notifySuccess } from './Toasts/success';

export const Click2Copy = ({ text }: { text: string }) => {
  const copyToClipboard = () =>
    navigator.clipboard
      .writeText(text)
      .then(() => notifySuccess('Copied to clipboard'))
      .catch(() => {});

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div onClick={copyToClipboard}>{text}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Click to copy key</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
