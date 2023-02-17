import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  data: any;

  constructor() {
    const storedData = localStorage.getItem('currentUser');

    if (storedData) {
      this.data = JSON.parse(storedData);
    }
  }
}
