import { Component, Input, TemplateRef } from '@angular/core';
import { Project } from 'src/app/interfaces/Project';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IssueService } from 'src/app/core/dashboard/issue/issue.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrls: ['./project-table.component.css'],
})
export class ProjectTableComponent {
  @Input() data: Project[];
  createLoading: boolean = false;
  myForm: FormGroup;
  file: string;


  modalRef: BsModalRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private IssueService: IssueService,
    private toastr: ToastrService
  ) {
    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  createIssueModal(template: TemplateRef<number>) {
    this.modalRef = this.modalService.show(template);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  createIssue(projectID: any) {
    if (this.myForm) {
      let title = this.myForm.value['title'];
      let description = this.myForm.value['description'];
      let screenshot = 'this.file';
      this.IssueService.addIssue(
        title,
        description,
        projectID,
        screenshot
      ).subscribe({
        next: (data) => {
          this.modalRef.hide();
          this.toastr.success('Issue Added Successfully', '');
          this.IssueService.clearCache();
          this.IssueService.getIssues().subscribe();
        },
        error: (err) => console.log(err),
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }

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
