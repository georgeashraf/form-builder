import { Input, Label } from '@engine/design-system';
import { TextAlignCenterIcon } from '@radix-ui/react-icons';
import Designer from '../Designer';
import { FormElement, FormElementInstance } from '../types';

export const HorizontalLayoutElement: FormElement = {
  type: 'HorizontalLayout',
  construct: (id: string) => ({
    id,
    type: 'Layout',
    subtype: 'HorizontalLayout',
    extraAttributes: {
      UISchema: { type: 'HorizontalLayout', elements: [] },
    },
  }),
  designerBtnElement: {
    icon: TextAlignCenterIcon,
    label: 'Horizontal',
  },
  designerComponent: DesignerComponent,
  baseUISchema: { type: 'HorizontalLayout', elements: [] },

  //   formComponent: () => <div>Designer component</div>,
  //   propertiesComponent: () => <div>Designer component</div>,
};

function DesignerComponent({
  elementInstance,
}: {
  elementInstance: FormElementInstance;
}) {
  console.log(
    '🚀 ~ file: Horizontal.tsx:34 ~ elementInstance:',
    elementInstance
  );
  return (
    <div
      className={`grid grid-cols-5 grid-flow-row gap-4  divide-x `}
    >
      <div className='w-full h-full'>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>4</div>
    </div>
  );
}
