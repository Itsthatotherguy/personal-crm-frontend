import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from './customer.model';

@Pipe({
    name: 'filter',
    pure: false,
})
export class FilterPipe implements PipeTransform {
    transform(value: Customer[], filterString: string): Customer[] {
        if (value.length === 0) {
            return value;
        }

        if (!filterString || filterString.trim().length === 0) {
            return value;
        }

        return value.filter((customer) =>
            customer.name.toLowerCase().startsWith(filterString.toLowerCase())
        );
    }
}
