import DesignerComponentWrapper from '../Wrappers/DesignerComponentWrapper';
import FormComponentWrapper from '../Wrappers/FormComponentWrapper';
import { ElementsType, FormElements } from '../types';
import { findPropertyFromScope } from '../helpers';
import LayoutComponentWrapper from '../Wrappers/LayoutComponentWrapper';
import { UISchema, DataSchema, SchemaProperty } from '@engine/shared-types';

const renderElements = (
  item: UISchema[],
  dataSchema: DataSchema,
  isDesigner: boolean
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
              ? renderElements(el.elements, dataSchema, isDesigner)
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
              ? renderElements(el.elements, dataSchema, isDesigner)
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
              ? renderElements(el.elements, dataSchema, isDesigner)
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
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}
          </HorizontalLayout>
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
            if (el.variant === 'DateRange') subtype = 'DateRangeField';
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
          case 'array':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: 'MultiSelectField' as ElementsType,
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
            <FormComponentWrapper key={element.key} element={element} />
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
  return (
    <div className="w-full h-full">
      {dataSchema &&
        uiSchema &&
        renderElements([uiSchema], dataSchema, isDesigner)}
    </div>
  );
};

export default FormRenderer;
