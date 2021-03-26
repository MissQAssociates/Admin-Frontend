import { Component, OnInit } from '@angular/core';
import { BuiltInFunctions } from 'src/built-in-functions/functions.model';
import { AccessDataService } from '../services/access-data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  public transactions = []

  constructor(
    public built: BuiltInFunctions,
    private request: AccessDataService
  ) { }

  ngOnInit(): void {
    this.getAllTheCompletedJobs()
  }

  getAllTheCompletedJobs() {
    const allCompletedJobs = this.request.getCompletedJobs()
    allCompletedJobs.subscribe((data: any) => {
        data.forEach(element => {
            const artisan = this.request.returnArtisan(element.currentUser)
            artisan.subscribe((response: any) => {
                if(response != null) {
                    const bookingCost = this.request.returnBookings(element.customerId)
                    bookingCost.subscribe((res: any) => {
                        this.transactions.unshift({user: response, cost: res[0].cost})
                    })
                }
            })
        })
    })
}
}
