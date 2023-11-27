import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TransformationPipe implements PipeTransform {
  constructor() {}
  transform(value: any, metadata: ArgumentMetadata) {
    this.traverseValueObject(value);
    return value;
  }

  private traverseValueObject(obj: any) {
    for (const key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        this.traverseValueObject(obj[key]);
      }
      if (typeof obj[key] === 'string' && obj[key] !== null) {
        obj[key] = this.transformValues(obj[key]);
      }
    }
  }

  private transformValues(value: string | boolean | number) {
    if (this.isTrue(value)) return true;
    if (this.isFalse(value)) return false;
    if (this.isNumeric(value)) return Number(value);
    return value;
  }

  private isTrue(value: string | boolean | number): boolean {
    return value === true || value === 'true';
  }
  private isFalse(value: string | boolean | number): boolean {
    return value === false || value === 'false';
  }
  private isNumeric(value: string | boolean | number): boolean {
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    return (
      !isNaN(value as number) &&
      !isNaN(parseFloat(value as string)) &&
      isFinite(value as any)
    );
  }
}
