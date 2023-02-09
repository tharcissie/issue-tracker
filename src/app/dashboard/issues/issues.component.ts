import { Component } from '@angular/core';
import { IssueService } from 'src/app/core/dashboard/issue/issue.service';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent {

  issues: Issue[] = []
  errorMessage: string

  constructor(private IssueService: IssueService) { }

  ngOnInit(): void {
    this.IssueService.getIssues().subscribe({
      next: data => {
        this.issues = data.data
      },
      error: err => this.errorMessage = err
    })
  }
}
