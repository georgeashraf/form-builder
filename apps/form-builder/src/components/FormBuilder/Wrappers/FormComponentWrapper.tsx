import { ControlEffect } from '@engine/shared-types';
import { UseFormReturn, FieldValues } from 'react-hook-form';
import { FormElementInstance, FormElements } from '../types';
const FormComponentWrapper = ({
  element,
  form,
  effect,
}: {
  element: FormElementInstance;
  form: UseFormReturn<FieldValues, any, undefined>;
  effect?: ControlEffect;
}) => {
  const FormElement = FormElements[element.subtype].formComponent;
  return <FormElement elementInstance={element} form={form} effect={effect} />;
};

export default FormComponentWrapper;
