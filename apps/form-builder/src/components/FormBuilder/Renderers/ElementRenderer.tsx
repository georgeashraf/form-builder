import {
  UISchema,
  DataSchema,
  SchemaProperty,
  ControlEffect,
} from '@engine/shared-types';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { findPropertyFromScope } from '../helpers';
import useDesigner from '../Hooks/useDesigner';
import { FormElements, ElementsType, EffectMap } from '../types';
import DesignerComponentWrapper from '../Wrappers/DesignerComponentWrapper';
import FormComponentWrapper from '../Wrappers/FormComponentWrapper';
import LayoutComponentWrapper from '../Wrappers/LayoutComponentWrapper';

export const ElementRenderer = ({
  item,
  dataSchema,
  isDesigner,
  form,
}: {
  item: UISchema[];
  dataSchema: any;
  isDesigner: boolean;
  form: UseFormReturn<FieldValues, any, undefined>;
}) => {
  const { elementsToWatch, uiElementsState } = useDesigner();
  return (
    <>
      {item.map((el) => {
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}{' '}
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}
              </HorizontalLayout>
            );
          case 'GroupAccordionLayout':
            const GroupAccordionLayout =
              FormElements['GroupAccordionLayout' as ElementsType]
                .formComponent;
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}
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
                {el?.elements?.length ? (
                  <ElementRenderer
                    item={el.elements}
                    dataSchema={dataSchema}
                    isDesigner={isDesigner}
                    form={form}
                  />
                ) : null}
              </GroupAccordionLayout>
            );

          case 'Control':
            const scope = el.scope;
            if (
              el.rule?.condition?.scope &&
              !elementsToWatch.has(el.rule?.condition?.scope?.split('/').pop()!)
            ) {
              elementsToWatch.set(
                el.rule?.condition?.scope?.split('/').pop()!,
                {
                  rule: el.rule,
                  dependableElementName: el.name,
                }
              );
              uiElementsState.set(
                el.name,
                EffectMap.get(el.rule.effect!) as ControlEffect
              );
            }
            const elementSchemaProperties = findPropertyFromScope(
              scope || '',
              dataSchema as DataSchema
            );
            const elementDataSchema = {
              [el.name ?? el.key]: elementSchemaProperties,
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
                  effect={uiElementsState.get(element.uiSchema.name)}
                />
              )
            ) : (
              <div></div>
            );
        }
      })}
    </>
  );
};
