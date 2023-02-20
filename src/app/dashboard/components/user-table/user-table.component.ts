import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() data: User[]

  pageSize = 5;
  currentPage = 1;

  get displayedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.reverse().slice(startIndex, endIndex);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
  }
}
