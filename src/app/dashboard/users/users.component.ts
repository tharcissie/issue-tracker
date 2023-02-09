import { Component } from '@angular/core';
import { UserService } from 'src/app/core/dashboard/user/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  users: User[] = []
  errorMessage: string

  constructor(private UserService: UserService) { }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe({
      next: data => {
        this.users = data.data
      },
      error: err => this.errorMessage = err
    })
  }
}
