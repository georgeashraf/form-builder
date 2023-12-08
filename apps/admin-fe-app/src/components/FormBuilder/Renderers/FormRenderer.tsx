import { DesignerElementWrapper } from '../Designer';
import { ElementsType, FormElements, UISchema } from '../types';

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
          scope: '#/properties/person/properties/firstName',
        },
        {
          type: 'Control',
          key: 'kapiej',
          label: 'X2',
          scope: '#/properties/person/properties/lastName',
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
          scope: '#/properties/person/properties/firstName',
        },
        {
          key: 'ndyusj',
          label: 'X4',
          type: 'Control',
          scope: '#/properties/person/properties/lastName',
        },
      ],
    },
  ],
};
const renderElements = (item: UISchema[]) => {
  return item.map((el) => {
    switch (el.type) {
      case 'VerticalLayout':
        return (
          <div key={el.key} className={`flex flex-col`}>
            {el?.elements?.length ? renderElements(el.elements) : null}
          </div>
        );
      case 'HorizontalLayout':
        return (
          <div key={el.key} className={`flex flex-row`}>
            {el?.elements?.length ? renderElements(el.elements) : null}
          </div>
        );
      case 'Control':
        const DesignerElementComponent =
          FormElements['TextField'].designerComponent;
        const element = {
          id: '455',
          type: 'Input' as 'Input',
          subtype: 'TextField' as ElementsType,
          extraAttributes: {
            dataSchema: {
              key: '455',
              type: 'string',
              pattern: '',
              nullable: true,
              maxLength: 255,
              minLength: 1,
              errorMessage: { type: 'foo must be an Integer' },
            },
            uiSchema: el,
          },
        };
        return (
          <DesignerElementWrapper key={element.id} element={element} />
        );
    }
  });
};
const FormRenderer = () => {
  return <div>{renderElements([testSchema])}</div>;
};

export default FormRenderer;
