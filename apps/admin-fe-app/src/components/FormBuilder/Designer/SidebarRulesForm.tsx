import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@engine/design-system';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import {
  Controller,
  FieldValues,
  useFieldArray,
  UseFormReturn,
} from 'react-hook-form';
import { OPERATORS } from '../types';

const RulesForm = ({
  form,
}: {
  form: UseFormReturn<FieldValues, any, undefined>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'formRules',
  });
  return (
    <div className="flex flex-col">
      {fields.map(({ id }, index) => (
        <div className="flex border-2" key={index}>
          <Button
            variant={'outline'}
            className="gap-2"
            onClick={() => remove(index)}
          >
            <MinusCircledIcon />
          </Button>
          <div className="flex flex-col items-center">
            <Label className="mb-2">Operator</Label>
            <Controller
              control={form.control}
              name={`formRules[${index}].operator`}
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="h-8 w-[70px]">
                    <SelectValue placeholder={field.value} />
                  </SelectTrigger>
                  <SelectContent className="bg-base-100" side="top">
                    {OPERATORS.map((op) => (
                      <SelectItem key={op} value={`${op}`}>
                        {op}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col items-center">
            <Label className="mb-2">Value</Label>
            <Controller
              control={form.control}
              name={`formRules[${index}].value`}
              render={({ field }) => (
                <Input
                  {...field}
                  value={field.value}
                  placeholder="Placeholder"
                  className="w-full"
                />
              )}
            />
          </div>
        </div>
      ))}
      <Button
        variant={'outline'}
        className="gap-2"
        type='button'
        onClick={() => append({ operator: 'eq', value: 'value' })}
      >
        <PlusCircledIcon />
        Add Rule Condition
      </Button>

      <Button type="submit" variant={'secondary'}>
        Save Changes
      </Button>
    </div>
  );
};

export default RulesForm;
