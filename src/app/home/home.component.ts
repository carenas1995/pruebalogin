import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: User;

  constructor(private router: Router, private userService: AuthService) { }

  ngOnInit() {
    this.user = {
      userLogin: "pruebaTecnica",
      password: "P@ssw0rd",
      connectionName: "DataPower"
    }
    this.online(1);
  }

  online(i: number) {
    if (i == 0) {
      this.userService.login(this.user).subscribe(res => {
        this.router.navigateByUrl('/', { skipLocationChange: true, replaceUrl: true }).then(() => {
          this.router.navigate(['usuarios']);
        });
      });
    }
    else {
      setTimeout(() => {
        this.router.navigate(['usuarios']);
      }, 2000);
    }
  }
}
