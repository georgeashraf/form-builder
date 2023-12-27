import { FormElementInstance, FormElements } from '../types';
const FormComponentWrapper = ({
  element,
}: {
  element: FormElementInstance;
}) => {
  const FormElement = FormElements[element.subtype].formComponent;
  return <FormElement elementInstance={element} />;
};

export default FormComponentWrapper;
