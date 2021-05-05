import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({
    name: 'sorting',
    pure: false,
})
export class SortingPipe implements PipeTransform {
    transform(value: Customer[], ...args: unknown[]): Customer[] {
        if (value.length === 0) {
            return value;
        }

        const sortedArray = value.sort((a, b) => {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });

        return sortedArray;
    }
}
