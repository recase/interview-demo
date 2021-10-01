import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findByKeyValue'
})
export class FindByKeyValuePipe implements PipeTransform {
  transform(value: Array<{ [key: string]: any }>, key: string, cmpValue: string): string {
    const element = value.find((val) => val[key] === cmpValue);
    if (element) {
      return element.name;
    }
    return '';
  }
}
