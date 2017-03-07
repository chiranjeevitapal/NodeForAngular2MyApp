import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'replaceStringPipe'})
export class ReplaceStringPipe implements PipeTransform {
  transform(value: string): string {
    let newValue = value.replace(/[^a-zA-Z0-9_-]/g,'-');
    return `${newValue}`;
  }
}
