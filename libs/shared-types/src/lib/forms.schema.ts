import { z } from 'zod';
import { uiSchemaSchema, dataSchemaSchema } from './formSchemas.schema';

export const FormModelSchema = z.object({
  id: z.number(),
  key: z.string().uuid(),
  name: z.string().min(1).max(255),
  isPublished: z.boolean(),
  requestId: z.number(),
  uiSchema: uiSchemaSchema,
  dataSchema: dataSchemaSchema,
  createdAt: z.date(),
  updatedAt: z.date(),
  publishedAt: z.date(),
});

export const CreateFormSchema = FormModelSchema.omit({
  id: true,
  key: true,
  requestId: true,
  createdAt: true,
  updatedAt: true,
  publishedAt: true,
}).merge(z.object({ requestKey: z.string().uuid() }));

export const FormRelationsSchema = z.object({
  request: z.object({
    id: z.number(),
    key: z.string().uuid(),
    label: z.string().min(1).max(255),
    name: z.string().min(1).max(255),
    description: z.string().min(0),
    creator: z.string().uuid(),
    isPublished: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    publishedAt: z.date(),
  }),
});

export const FormWithRelationsSchema =
  FormModelSchema.merge(FormRelationsSchema);

export type FormModelType = z.infer<typeof FormModelSchema>;
export type CreateFormModelType = z.infer<typeof CreateFormSchema>;
export type FormRelationsType = z.infer<typeof FormRelationsSchema>;

export type FormColumnsType = keyof FormModelType;
export type FormIncludesType = keyof FormRelationsType;

export type SchemaPrimitiveType =
  | 'object'
  | 'array'
  | 'string'
  | 'number'
  | 'boolean'
  | 'null';

export type SchemaPropertyBody = {
  type: SchemaPrimitiveType | SchemaPrimitiveType[];
  description?: string;
  properties?: SchemaProperty;
  items?: { type: SchemaPrimitiveType | SchemaPrimitiveType[] };
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  required?: string[];
  enum?: SchemaPrimitiveType[];
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number;
  minimum?: number;
  exclusiveMinimum?: number;
  maxLength?: number;
  minLenght?: number;
  pattern?: string;
  dependentRequired?: {
    [key: string]: string[];
  };
};

export type SchemaProperty = {
  [key: string]: SchemaPropertyBody;
};
export type DataSchema = {
  $schema?: string;
  title?: string;
  description?: string;
  type: SchemaPrimitiveType | SchemaPrimitiveType[];
  properties: SchemaProperty;
  required?: string[];
};
export type UISchema = {
  key: string;
  type: string;
  name: string;
  required?: boolean;
  variant?: string;
  rows?: number;
  label?: string;
  scope?: string;
  placeholder?: string;
  elements?: UISchema[];
};
