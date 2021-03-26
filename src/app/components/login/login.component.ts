import { Component, OnInit } from '@angular/core';
import { AccessDataService } from '../../services/access-data.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public usernameAndPassword = {
    username: "",
    password: ""
  }

  constructor(
    private request: AccessDataService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.request.login(this.usernameAndPassword).subscribe(data => {
      if(data) {
        this.route.navigate(['/dashboard'])
      }else {
        Swal.fire('Oooppss', "You've entered an invalid credentials", 'error')
      }
    })
  }

}
