import { Modal } from '@engine/design-system';
import { DataSchema, UISchema } from '@engine/shared-types';
import { ReactNode } from 'react';
import useDesigner from './Hooks/useDesigner';
import FormRenderer from './Renderers/FormRenderer';

const FormPreview = ({
  previewDataSchema,
  previewUISchema,
  trigger,
}: {
  previewDataSchema?: DataSchema;
  previewUISchema?: UISchema;
  trigger?: ReactNode;
}) => {
  const { dataSchema, uiSchema } = useDesigner();
  return (
    <div className="w-full">
      <Modal
        trigger={trigger}
        title="Preview Form"
        description="Form display preview"
      >
        <div className="flex w-full h-full">
          <FormRenderer
            dataSchema={previewDataSchema ?? dataSchema}
            uiSchema={previewUISchema ?? uiSchema}
            isDesigner={false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default FormPreview;
