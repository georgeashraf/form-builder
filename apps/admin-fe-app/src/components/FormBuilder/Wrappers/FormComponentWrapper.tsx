import { UseFormReturn, FieldValues } from 'react-hook-form';
import { FormElementInstance, FormElements } from '../types';
const FormComponentWrapper = ({
  element,
  form,
}: {
  element: FormElementInstance;
  form: UseFormReturn<FieldValues, any, undefined>;
}) => {
  const FormElement = FormElements[element.subtype].formComponent;
  return <FormElement elementInstance={element} form={form} />;
};

export default FormComponentWrapper;
