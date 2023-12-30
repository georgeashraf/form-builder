import DesignerComponentWrapper from '../Wrappers/DesignerComponentWrapper';
import FormComponentWrapper from '../Wrappers/FormComponentWrapper';
import { ElementsType, FormElements } from '../types';
import { findPropertyFromScope } from '../helpers';
import LayoutComponentWrapper from '../Wrappers/LayoutComponentWrapper';
import { UISchema, DataSchema, SchemaProperty } from '@engine/shared-types';
import { FieldValues, useForm, UseFormReturn } from 'react-hook-form';
import { ajvResolver } from '@hookform/resolvers/ajv';
import { Button } from '@engine/design-system';

const renderElements = (
  item: UISchema[],
  dataSchema: DataSchema,
  isDesigner: boolean,
  form: UseFormReturn<FieldValues, any, undefined>
) => {
  return item.map((el) => {
    switch (el.type) {
      case 'VerticalLayout':
        const VericalLayout =
          FormElements['VerticalLayout' as ElementsType].formComponent;
        return isDesigner ? (
          <LayoutComponentWrapper
            key={el.key}
            element={{
              key: el.key,
              type: 'Layout',
              subtype: 'VerticalLayout',
              uiSchema: el,
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}
          </LayoutComponentWrapper>
        ) : (
          <VericalLayout
            key={el.key}
            elementInstance={{
              key: el.key,
              type: 'Layout',
              subtype: 'VerticalLayout',
              uiSchema: el,
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}
          </VericalLayout>
        );
      case 'HorizontalLayout':
        const HorizontalLayout =
          FormElements['HorizontalLayout' as ElementsType].formComponent;
        return isDesigner ? (
          <LayoutComponentWrapper
            key={el.key}
            element={{
              key: el.key,
              type: 'Layout',
              subtype: 'HorizontalLayout',
              uiSchema: el,
            }}
          >
            {' '}
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}{' '}
          </LayoutComponentWrapper>
        ) : (
          <HorizontalLayout
            key={el.key}
            elementInstance={{
              key: el.key,
              type: 'Layout',
              subtype: 'HorizontalLayout',
              uiSchema: el,
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}
          </HorizontalLayout>
        );
      case 'GroupAccordionLayout':
        const GroupAccordionLayout =
          FormElements['GroupAccordionLayout' as ElementsType].formComponent;
        return isDesigner ? (
          <LayoutComponentWrapper
            key={el.key}
            element={{
              key: el.key,
              type: 'Layout',
              subtype: 'GroupAccordionLayout',
              uiSchema: el,
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}
          </LayoutComponentWrapper>
        ) : (
          <GroupAccordionLayout
            key={el.key}
            elementInstance={{
              key: el.key,
              type: 'Layout',
              subtype: 'GroupAccordionLayout',
              uiSchema: el,
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner, form)
              : null}
          </GroupAccordionLayout>
        );

      case 'Control':
        const scope = el.scope;
        const elementSchemaProperties = findPropertyFromScope(
          scope || '',
          dataSchema as DataSchema
        );
        const elementDataSchema = {
          [el.key]: elementSchemaProperties,
        } as SchemaProperty;
        let element;
        let subtype = 'TextField';
        switch (elementSchemaProperties?.type) {
          case 'string':
            if (el.variant === 'TextArea') subtype = 'TextAreaField';
            if (el.variant === 'Date') subtype = 'DateField';
            if (el.variant === 'SingleSelect') subtype = 'SelectField';
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: subtype as ElementsType,
              dataSchema: elementDataSchema,
              uiSchema: el,
            };
            break;
          case 'number':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: 'NumberField' as ElementsType,
              dataSchema: elementDataSchema,
              uiSchema: el,
            };
            break;
          case 'array':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: 'MultiSelectField' as ElementsType,
              dataSchema: elementDataSchema,
              uiSchema: el,
            };
            break;
          case 'object':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: 'DateRangeField' as ElementsType,
              dataSchema: elementDataSchema,
              uiSchema: el,
            };
            break;

          default:
            break;
        }

        return element ? (
          isDesigner ? (
            <DesignerComponentWrapper key={element.key} element={element} />
          ) : (
            <FormComponentWrapper
              key={element.key}
              element={element}
              form={form}
            />
          )
        ) : (
          <div></div>
        );
    }
  });
};
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
          renderElements([uiSchema], dataSchema, isDesigner, form)}
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
