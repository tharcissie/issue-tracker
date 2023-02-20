import {
  Component,
  Input,
  Output,
  TemplateRef,
  EventEmitter,
  OnInit,
} from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IssueService } from 'src/app/core/dashboard/issue/issue.service';
import { Project } from 'src/app/interfaces/Project';
import { ProjectService } from 'src/app/core/dashboard/project/project.service';
import { ToastrService } from 'ngx-toastr';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'app-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.css'],
})
export class IssueTableComponent implements OnInit {
  @Input() data: Issue[];
  @Input() deleteLoading: boolean;
  @Output() deleteIssueClick: EventEmitter<number> = new EventEmitter();
  updateLoading: boolean = false;
  sendingToJiraLoading: boolean = false;
  updateForm: FormGroup;
  file: string;
  modalRef: BsModalRef;

  projects: Project[] = [];
  errorMessage: string;
  isAdmin: boolean;
  userProjectId: number;
  userProjectIssues: any;

  p: number = 1;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private IssueService: IssueService,
    private ProjectService: ProjectService,
    private toastr: ToastrService
  ) {
    const storedData = localStorage.getItem('currentUser');

    if (storedData) {
      this.isAdmin = JSON.parse(storedData).isadmin;
      this.userProjectId = JSON.parse(storedData).projects[0]?.projectid;
    }
  }

  ngOnInit(): void {
    this.ProjectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });
    this.userProjectIssues = this.data?.filter(issue => issue.projectid == this.userProjectId.toString() );
  }

  openDeleteModal(template: TemplateRef<number>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  updateIssueModal(template: TemplateRef<number>, data: Issue) {
    this.modalRef = this.modalService.show(template);
    this.updateForm = this.formBuilder.group({
      title: [data.title],
      description: [data.description],
    });
  }

  updateIssue(id: number) {
    let title = this.updateForm.value['title'];
    let description = this.updateForm.value['description'];
    let screenshot = 'this.file';
    this.IssueService.updateIssue(
      title,
      description,
      screenshot,
      id
    ).subscribe();
  }

  deleteIssue(issueId: number) {
    this.deleteIssueClick.emit(issueId);
  }

  filterProject(projects: Project[], issueProjectId: string) {
    let project = projects.filter(
      (project: Project) => project.id == issueProjectId
    );
    return project[0]?.name;
  }

  sendToJira(title: string, description: string, projectId: string) {
    this.sendingToJiraLoading = true;
    this.IssueService.sendToJira(title, description, projectId).subscribe({
      next: (data) => {
        this.sendingToJiraLoading = false;
        this.toastr.success('Issue Sent Successfully', '');
      },
      error: (err) => {
        this.sendingToJiraLoading = false;
      },
    });
  }


  pageSize = 5;
  currentPage = 1;

  get displayedItems(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.data.slice(startIndex, endIndex);
  }

  onPageChanged(page: number): void {
    this.currentPage = page;
  }


}
