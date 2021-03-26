import { Component, OnInit, ViewChild } from '@angular/core';
import { AccessDataService } from '../../services/access-data.service';
import Swal from 'sweetalert2';
import { BuiltInFunctions } from '../../../built-in-functions/functions.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public eachUsersCredits = []

  customers: any;
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'email', 'phone', 'address', 'view', 'bday', 'primarynum', 'activate', 'suspend', 'block', 'credits', 'deduct'];
  public userToAdd = {
    certainUserCredits: 200,
    certainUserID: '',
    userSituation: ''
  }
  public certainUserCredits = 200
  public addDeduct = 0
  public usersData: any;

  constructor(
    private http: AccessDataService,
    private built: BuiltInFunctions,
    public dialog: MatDialog
  ) {
    this.http.getAllDataFromBackend().subscribe((data: any) => {
      data.forEach((element: any) => {
        element.bday = this.built.convertMonth(new Date(element.bday).getMonth()) + '_' + new Date(element.bday).getDate() + '_' + new Date(element.bday).getFullYear()
        var nameHandler = ''
        var location = ''
        element.name.split(' ').forEach((newName: any) => {
          nameHandler += newName + '_'
        })
        element.address.split(' ').forEach((element: any) => {
          location += element + '_'
        });
        element.name = nameHandler
        element.address = location
        nameHandler = ''
      })
      this.dataSource = new MatTableDataSource<any>(data)
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  ngOnInit(): void {
    this.http.getAllDataFromBackend().subscribe((data: any) => {
      this.usersData = data;
    })
    // this.built.getAllTheCompletedJobs()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  counter(i: number) {
    return new Array(i);
  }

  blockCertainUser(user: any, situa: any) {
    if (situa == 'block') {
      this.alertForActivateSuspendOrBlock(user, 'Block')
    } else if (situa == 'suspend') {
      this.alertForActivateSuspendOrBlock(user, 'Suspend')
    } else {
      this.alertForActivateSuspendOrBlock(user, 'Activate')
    }
  }

  countAddAndDeduct(data: any) {
    if (data == 'add') {
      if (this.usersData.length < this.addDeduct + 5) {
        Swal.fire('Oopsss', 'Sorry, no more data to show', 'error')
      } else {
        this.addDeduct += 5
      }
    } else {
      if (this.addDeduct <= 0) {
        Swal.fire('Oopsss', 'Sorry, no more data to show', 'error')
      } else {
        this.addDeduct -= 5
      }
    }
  }

  addCredits(user: any) {
    this.alertForTheValueAsk(user)
  }

  deductCredits(user: any) {
    console.log(user)
    Swal.fire({
      title: user.name,
      text: 'Percent of credits you want to deduct?',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add now!',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        this.userToAdd.certainUserCredits = login
        this.userToAdd.certainUserID = user._id
        this.userToAdd.userSituation = 'Activate';
        const creditsAdd = this.http.deductCreditsToCertainUser(this.userToAdd)
        creditsAdd.subscribe((result: any) => {
          console.log(result)
          Swal.fire('Yyaayy', user.name + ' has now a current credits of ' + (Number(result.certainUserCredits) - Number(login)), 'success')
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }


  alertForTheValueAsk(userChosen: any) {
    Swal.fire({
      title: userChosen.name,
      text: 'How many credits you want to add for this user?',
      input: 'number',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Add now!',
      showLoaderOnConfirm: true,
      preConfirm: (login) => {
        console.log(login)
        this.userToAdd.certainUserCredits = login
        this.userToAdd.certainUserID = userChosen._id
        this.userToAdd.userSituation = 'Activate';
        const creditsAdd = this.http.addCreditsToCertainUser(this.userToAdd)
        creditsAdd.subscribe((result: any) => {
          Swal.fire('Yyaayy', userChosen.name + ' has now a current credits of ' + (Number(result.certainUserCredits) + Number(login)), 'success')
        })
      },
      allowOutsideClick: () => !Swal.isLoading()
    })
  }


  alertForActivateSuspendOrBlock(user: any, situation: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to ' + situation + ' ' + user.name + '?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, ' + situation + ' it!'
    }).then((result) => {
      if (result.isConfirmed) {
        const edit = this.http.editCertainUserSituation(user._id, situation)
        edit.subscribe((result: any) => {
          if (result == false) {
            Swal.fire('Sorry', "You can't " + situation + " " + user.name + " since he/she don't have any credits", 'error')
          } else {
            Swal.fire(user.name, 'This user was ' + situation + 'ed!', 'success')
          }
        })
      }
    })
  }

  viewImage(imageURL, user) {
    const viewUsersCredits = this.http.getUserCredits(user._id);
    viewUsersCredits.subscribe((data: any) => {
      Swal.fire({
        title: user.name,
        text: user.name + "'s credits is " + data[0].certainUserCredits,
        imageUrl: imageURL,
        imageWidth: 300,
        imageHeight: 350,
        imageAlt: 'Custom image',
      })
    })
  }

}