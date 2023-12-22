import DesignerComponentWrapper from '../Wrappers/DesignerComponentWrapper';
import FormComponentWrapper from '../Wrappers/FormComponentWrapper';
import {
  DataSchema,
  ElementsType,
  FormElements,
  SchemaProperty,
  UISchema,
} from '../types';
import { findPropertyFromScope } from '../helpers';
import LayoutComponentWrapper from '../Wrappers/LayoutComponentWrapper';

const renderElements = (
  item: UISchema[],
  dataSchema: DataSchema,
  isDesigner: boolean
) => {
  return item.map((el) => {
    switch (el.type) {
      case 'VerticalLayout':
        const VericalLayout =
          FormElements['VerticalLayout' as ElementsType].designerComponent;
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
            cols={el?.elements?.length}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}
          </VericalLayout>
        );
      case 'HorizontalLayout':
        const HorizontalLayout =
          FormElements['HorizontalLayout' as ElementsType].designerComponent;
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
            cols={el?.elements?.length}
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
        switch (elementSchemaProperties?.type) {
          case 'string':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: el.variant === 'TextArea' ? 'TextAreaField' as ElementsType : 'TextField' as ElementsType ,
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
    <div>
      {dataSchema &&
        uiSchema &&
        renderElements([uiSchema], dataSchema, isDesigner)}
    </div>
  );
};

export default FormRenderer;
