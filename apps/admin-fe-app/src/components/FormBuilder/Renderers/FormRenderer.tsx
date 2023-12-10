import DesignerComponentWrapper from '../DesignerComponentWrapper';
import FormComponentWrapper from '../FormComponentWrapper';
import FormLayoutWrapper from '../FormLayoutWrapper';
import {
  DataSchema,
  ElementsType,
  FormElement,
  FormElements,
  UISchema,
} from '../types';
import { findPropertyFromScope } from '../utils';

const testSchema = {
  type: 'VerticalLayout',
  key: 'jdudd',
  elements: [
    {
      type: 'HorizontalLayout',
      key: 'malii9a',
      elements: [
        {
          type: 'Control',
          key: 'noiau',
          label: 'X1',
          scope: '#/properties/firstName',
        },
        {
          type: 'Control',
          key: 'kapiej',
          label: 'X2',
          scope: '#/properties/lastName',
        },
      ],
    },
    {
      type: 'HorizontalLayout',
      key: 'aasueod',

      elements: [
        {
          key: 'insos',
          label: 'X3',
          type: 'Control',
          scope: '#/properties/firstName',
        },
        {
          key: 'ndyusj',
          label: 'X4',
          type: 'Control',
          scope: '#/properties/lastName',
        },
      ],
    },
  ],
};
const testDataSchema = {
  type: 'object',
  key: 'x',
  properties: {
    firstName: {
      key: 'y',
      type: 'string',
    },
    lastName: {
      key: 'z',
      type: 'string',
    },
  },
};

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
          <VericalLayout
            key={el.key}
            elementInstance={{
              key: el.key,
              type: 'Layout',
              subtype: 'VerticalLayout',
              extraAttributes: { uiSchema: el },
            }}
            cols={el?.elements?.length}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}
          </VericalLayout>
        ) : (
          <FormLayoutWrapper
            key={el.key}
            element={{
              key: el.key,
              type: 'Layout',
              subtype: 'VerticalLayout',
              extraAttributes: { uiSchema: el },
            }}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}
          </FormLayoutWrapper>
        );
      case 'HorizontalLayout':
        const HorizontalLayout =
          FormElements['HorizontalLayout' as ElementsType].designerComponent;
        return isDesigner ? (
          <HorizontalLayout
            key={el.key}
            elementInstance={{
              key: el.key,
              type: 'Layout',
              subtype: 'HorizontalLayout',
              extraAttributes: { uiSchema: el },
            }}
            cols={el?.elements?.length}
          >
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}
          </HorizontalLayout>
        ) : (
          <FormLayoutWrapper
            key={el.key}
            element={{
              key: el.key,
              type: 'Layout',
              subtype: 'HorizontalLayout',
              extraAttributes: { uiSchema: el },
            }}
          >
            {' '}
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema, isDesigner)
              : null}{' '}
          </FormLayoutWrapper>
        );
      case 'Control':
        const scope = el.scope;
        const elementDataSchema = findPropertyFromScope(
          scope || '',
          dataSchema as DataSchema
        );
        let element;
        switch (elementDataSchema?.type) {
          case 'string':
            element = {
              key: el.key,
              type: 'Input' as 'Input',
              subtype: 'TextField' as ElementsType,
              extraAttributes: { dataSchema: elementDataSchema, uiSchema: el },
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
  uiSchema: UISchema;
  isDesigner: boolean;
}) => {
  console.log('🚀 ~ file: FormRenderer.tsx:157 ~ isDesigner:', isDesigner);
  return (
    <div>
      {dataSchema &&
        uiSchema &&
        renderElements([uiSchema], dataSchema, isDesigner)}
    </div>
  );
};

export default FormRenderer;
