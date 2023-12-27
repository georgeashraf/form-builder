import { Button, Modal } from '@engine/design-system';
import useDesigner from './Hooks/useDesigner';
import FormRenderer from './Renderers/FormRenderer';

const FormPreview = () => {
  const { dataSchema, uiSchema } = useDesigner();
  return (
    <div className="w-full">
      <Modal
        trigger={<Button type="submit">Preview</Button>}
        title="Preview Form"
        description="Form display preview"
      >
        <div className="flex w-full h-full">
          <FormRenderer
            dataSchema={dataSchema}
            uiSchema={uiSchema}
            isDesigner={false}
          />
        </div>
      </Modal>
    </div>
  );
};

export default FormPreview;
