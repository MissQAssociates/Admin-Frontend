import { Injectable } from '@angular/core';
import { AccessDataService } from 'src/app/services/access-data.service';


@Injectable({
    providedIn: 'root'
})

export class BuiltInFunctions {
    public artisans = []

    constructor(
        private request: AccessDataService
    ) {}

    convertMonth(monthInput: number) {
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        return months[monthInput]
    }
}