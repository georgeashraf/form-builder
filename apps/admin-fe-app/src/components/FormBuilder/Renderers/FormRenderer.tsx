import { UISchema, DataSchema } from '@engine/shared-types';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { Button } from '@engine/design-system';
import { renderElements } from './ElementRenderer';

const FormRenderer = ({
  dataSchema,
  uiSchema,
  isDesigner = true,
}: {
  dataSchema: DataSchema;
  uiSchema?: UISchema;
  isDesigner: boolean;
}) => {
  const form = useForm({
    resolver: async (data, context, options) => {
      // you can debug your validation schema here
      console.log('formData', data);
      console.log(
        'validation result',
        await ajvResolver(dataSchema as any, { strict: false })(
          data,
          context,
          options
        )
      );
      return ajvResolver(dataSchema as any, { strict: false })(
        data,
        context,
        options
      );
    },
    mode: 'all',
  });
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data));
  };
  return (
    <div className="w-full h-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {dataSchema &&
          uiSchema &&
          renderElements([uiSchema as any], dataSchema, isDesigner, form)}
        {!isDesigner && (
          <div className="flex flex-row mt-10">
            <Button
              type="submit"
              variant="default"
              size="default"
              className="ml-auto hidden h-8 lg:flex px-5 py-3"
            >
              Submit
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default FormRenderer;
