import { z } from "zod";

const types = z.enum([
    'object',
    'array',
    'string',
    'number',
    'boolean',
    'null',
  ]);
  
  export const uiSchemaSchema: z.ZodType<any> = z.lazy(() =>
    z.object({
      key: z.string(),
      type: z.string(),
      name: z.string(),
      required: z.boolean().optional(),
      label: z.string().optional(),
      scope: z.string().optional(),
      placeholder: z.string().optional(),
      elements: z.array(uiSchemaSchema).optional(),
    })
  );
  
  export const dataSchemaProperty: z.ZodType<any> = z.lazy(() =>
    z.record(
      z.string(),
      z.object({
        type: types.or(z.array(types)),
        description: z.string().optional(),
        properties: dataSchemaProperty.optional(),
        items: z.object({
          type: types.or(z.array(types)),
        }).optional(),
        minItems: z.number().optional(),
        maxItems: z.number().optional(),
        uniqueItems: z.boolean().optional(),
        required: z.array(z.string()).optional(),
        enum: z.array(types).optional(),
        pattern: z.string().optional(),
        multipleOf: z.number().optional(),
        maximum: z.number().optional(),
        exclusiveMaximum: z.number().optional(),
        minimum: z.number().optional(),
        exclusiveMinimum: z.number().optional(),
        maxLength: z.number().optional(),
        minLenght: z.number().optional(),
        dependentRequired: z.record(z.string(), z.array(z.string())).optional(),
      })
    )
  );
  
  export const dataSchemaSchema = z.object({
    $schema: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    type: types.or(z.array(types)),
    properties: dataSchemaProperty,
    required: z.array(z.string()).optional(),
  });