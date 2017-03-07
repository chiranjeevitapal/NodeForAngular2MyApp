import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unique',
    pure: false
})

export class UniquePipe implements PipeTransform {
    transform(items: any[], arg: any): any {
        var uniqueArgs: string[] = [];
        var uniqueItems: any[] = [];
        items.filter(item => {
            if (uniqueArgs.indexOf(item[arg]) == -1) {
                uniqueArgs.push(item[arg]);
                uniqueItems.push(item);
            }
        })
        return uniqueItems;
    }
}
