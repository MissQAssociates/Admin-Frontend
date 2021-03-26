import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { AccessDataService } from '../../../services/access-data.service';
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

imageUrl : string;
customer: any;
public usersData: any;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any, private http: AccessDataService) { 
    console.log(this.data.data, "::::datas sa modal")
    this.customer = this.data.data
    this.imageUrl = this.data.data.picture;
  }
  

  ngOnInit(): void {
    console.log('coasdf')
  }

  // succesAlert(Text, Icon, Timer): void {
  //   Swal.fire({
  //     icon: Icon,
  //     title: 'Message',
  //     text: Text,
  //     showConfirmButton: false,
  //     timer: Timer
  //   });
  // }
  suspendSelectedItem(customers: any) {
    console.log("Misud siya ariii....", "Customers: " ,customers);
    
    this.usersData.splice(this.usersData.indexOf(customers), 1)
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete ' + customers.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.suspendUser(customers).subscribe(res => {
          Swal.fire(
            'Deleted!',
            'A user was permanently deleted!',
            'success'
          )
        })
      }
    })
  }

activate(name){
  // this.succesAlert('Are you sure you want to activate '+ name, 'info', 1500);
}
}
