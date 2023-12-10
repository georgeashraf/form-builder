import useDesigner from './Hooks/useDesigner';
import FormRenderer from './Renderers/FormRenderer';

const FormPreview = () => {
  const { dataSchema, uiSchema } = useDesigner();
  return (
    <div className="flex w-full h-full">
      <FormRenderer
        dataSchema={dataSchema}
        uiSchema={uiSchema}
        isDesigner={false}
      />
    </div>
  );
};

export default FormPreview;
