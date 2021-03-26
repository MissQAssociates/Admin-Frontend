import { Component, OnInit,  ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {AccessDataService} from '../../services/access-data.service'
import {MatDialog} from '@angular/material/dialog';
import {ViewProfileComponent} from './view-profile/view-profile.component';
import {MatPaginator} from '@angular/material/paginator';




@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
// "use strict";
export class CustomerComponent implements OnInit {
  customers: any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'view'];

  constructor(private customerService: AccessDataService, public dialog: MatDialog) {
    this.customerService.retrieveCustomer().subscribe(customers => {
      this.customers = customers;
      this.dataSource = new MatTableDataSource<any>(this.customers.data)
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }
  ngOnInit(): void {
  }
  
  viewcustomerProfile(id: string){
    this.customerService.findCustomer(id).subscribe(customer => {
      this.dialog.open(ViewProfileComponent, {data: customer});
    })
  }
  


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

