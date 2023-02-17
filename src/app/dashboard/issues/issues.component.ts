import { Component, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IssueService } from 'src/app/core/dashboard/issue/issue.service';
import { Issue } from 'src/app/interfaces/issue';
import { IssueTableComponent } from '../components/issue-table/issue-table.component';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css'],
})
export class IssuesComponent {
  issues: Issue[] = [];
  errorMessage: string;
  deleteLoading: boolean = false;
  deleted: boolean = false;

  @ViewChild(IssueTableComponent) IssueTableComponent: IssueTableComponent;

  constructor(
    private IssueService: IssueService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.IssueService.getIssues().subscribe({
      next: (data) => {
        this.issues = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  onDeleteIssue(id: number) {
    this.deleteLoading = true;
    this.IssueService.deleteIssue(id).subscribe({
      next: (response) => {
        this.refreshIssues();
        this.deleteLoading = false;
        this.deleted = true;
        this.IssueTableComponent.closeModal();
        this.toastr.error('Issue Deleted Successfully', '');
      },
      error: (err) => ((this.errorMessage = err), (this.deleteLoading = false)),
    });
  }

  refreshIssues() {
    this.IssueService.clearCache();
    this.IssueService.getIssues().subscribe({
      next: (data) => {
        this.issues = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
