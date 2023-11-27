import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { ZodSchema } from 'zod';
type ZodErrorType = {
  code: string;
  expected: string;
  received: string;
  path: string[];
  message: string;
}[];
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}
  transform(value: any, metadata: ArgumentMetadata) {
    try {
      this.schema.parse(value);
    } catch (error) {
      throw new BadRequestException(
        JSON.stringify(this.formatError(error.issues))
      );
    }
    return value;
  }

  private formatError(errors: ZodErrorType) {
    let errorResponse: { [key: string]: string } = {};
    for (const err of errors) {
      errorResponse[err?.path.join(' . ')] = err.message;
    }
    return errorResponse;
  }
}
