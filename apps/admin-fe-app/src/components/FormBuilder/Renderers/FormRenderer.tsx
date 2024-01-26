import { UISchema, DataSchema, ControlEffect } from '@engine/shared-types';
import { useForm } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { Button } from '@engine/design-system';
import { ElementRenderer } from './ElementRenderer';
import useDesigner from '../Hooks/useDesigner';
import { useEffect, useState } from 'react';
import { evaluateRule } from '../helpers';
import { EffectMap } from '../types';

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
      // console.log('formData', data);
      // console.log(
      //   'validation result',
      //   await ajvResolver(dataSchema as any, { strict: false })(
      //     data,
      //     context,
      //     options
      //   )
      // );
      return ajvResolver(dataSchema as any, { strict: false })(
        data,
        context,
        options
      );
    },
    mode: 'all',
  });
  const [forceRender, setForceRender] = useState(false);

  const { elementsToWatch, uiElementsState } = useDesigner();

  // Handle Rules
  // TODO: if element removed from ui remove its value from for object
  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (
        type === 'change' &&
        name &&
        Array.from(elementsToWatch.keys()).includes(name)
      ) {
        const result = evaluateRule(
          value[name],
          elementsToWatch.get(name)?.rule!
        );
        const elementRule = elementsToWatch.get(name);
        if (result) {
          elementRule &&
            uiElementsState.set(
              elementRule.dependableElementName,
              elementRule?.rule?.effect!
            );
        } else {
          elementRule &&
            uiElementsState.set(
              elementRule.dependableElementName,
              EffectMap.get(elementRule?.rule?.effect!) as ControlEffect
            );
        }
        setForceRender((prevCheck) => !prevCheck);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 4));
  };
  return (
    <div className="w-full h-full">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {dataSchema && uiSchema && (
          <ElementRenderer
            item={[uiSchema as any]}
            dataSchema={dataSchema}
            isDesigner={isDesigner}
            form={form}
          />
        )}
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
