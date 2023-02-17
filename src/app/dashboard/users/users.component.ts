import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/dashboard/user/user.service';
import { Project } from 'src/app/interfaces/Project';
import { User } from 'src/app/interfaces/user';
import { ProjectService } from 'src/app/core/dashboard/project/project.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  users: User[] = [];
  projects: Project[] = [];
  errorMessage: string;
  inviteLoading: boolean = false;

  createLoading: boolean = false;
  myForm: FormGroup;

  modalRef: BsModalRef;

  constructor(
    private UserService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private ProjectService: ProjectService
  ) {
    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      project: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.UserService.getUsers().subscribe({
      next: (data) => {
        this.users = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });

    this.ProjectService.getProjects().subscribe({
      next: (data) => {
        this.projects = data.data;
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  inviteModal(template: TemplateRef<number>) {
    this.modalRef = this.modalService.show(template);
  }

  inviteUser() {
    let email = this.myForm.value['email'];
    let projectId = Number(this.myForm.value['project']);
    let url = 'http://localhost:4200/signup';
    this.UserService.inviteUser(url, projectId, email).subscribe({
      next: (data) => {
        this.toastr.success('User Invited Successfully', '');
        this.modalRef.hide();
      },
      error: (err) => (this.errorMessage = err),
    });
  }

  closeModal() {
    this.modalRef.hide();
  }
}
