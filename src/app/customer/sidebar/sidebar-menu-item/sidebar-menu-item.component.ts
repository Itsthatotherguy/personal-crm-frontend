import { Component, Input, OnInit } from '@angular/core';
import { Customer } from '../../store/customer.model';

@Component({
    selector: 'app-sidebar-menu-item',
    templateUrl: './sidebar-menu-item.component.html',
    styleUrls: ['./sidebar-menu-item.component.css'],
})
export class SidebarMenuItemComponent implements OnInit {
    @Input() customer: Customer;
    avatarText: string;
    avatarColour: string;

    constructor() {}

    ngOnInit(): void {
        this.avatarText = this.getAvatarText();
        this.avatarColour = this.getAvatarHexColour();
    }

    private getAvatarText(): string {
        return this.customer.name[0].toUpperCase();
    }

    private getAvatarHexColour(): string {
        // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
        let hash = 0;

        for (let i = 0; i < this.customer.name.length; i++) {
            hash = this.customer.name.charCodeAt(i) + ((hash << 5) - hash);
        }

        // const h = hash % 360;
        const colour = (hash & 0x00ffffff).toString(16).toUpperCase();

        return '#' + '00000'.substring(0, 6 - colour.length) + colour;
    }
}
