import { DesignerElementWrapper } from '../Designer';
import { DataSchema, ElementsType, UISchema } from '../types';
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
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
  },
};

const renderElements = (item: UISchema[], dataSchema: DataSchema) => {
  return item.map((el) => {
    switch (el.type) {
      case 'VerticalLayout':
        return (
          <div key={el.key} className={`flex flex-col`}>
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema)
              : null}
          </div>
        );
      case 'HorizontalLayout':
        return (
          <div key={el.key} className={`flex flex-row`}>
            {el?.elements?.length
              ? renderElements(el.elements, dataSchema)
              : null}
          </div>
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
              id: el.key,
              type: 'Input' as 'Input',
              subtype: 'TextField' as ElementsType,
              extraAttributes: { dataSchema: elementDataSchema, uiSchema: el },
            };
            break;

          default:
            break;
        }

        return element ? (
          <DesignerElementWrapper key={element.id} element={element} />
        ) : (
          <div></div>
        );
    }
  });
};
const FormRenderer = ({
  dataSchema,
  uiSchema,
  isDesigner = true
}: {
  dataSchema: DataSchema;
  uiSchema: UISchema;
  isDesigner: boolean
}) => {
  return <div>{renderElements([testSchema], testDataSchema as any)}</div>;
};

export default FormRenderer;
