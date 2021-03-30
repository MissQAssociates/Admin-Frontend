import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit {

  constructor(private route:Router) { }

  ngOnInit(): void {
  }

  logout() {  
     this.route.navigate([''])  
  }

}
