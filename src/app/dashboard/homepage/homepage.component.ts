import { Component, OnInit, TemplateRef } from '@angular/core';
import { cardData } from './cardData';
import { ProjectService } from 'src/app/core/dashboard/project/project.service';
import { IssueService } from 'src/app/core/dashboard/issue/issue.service';
import { Project } from 'src/app/interfaces/Project';
import { Issue } from 'src/app/interfaces/issue';
import { combineLatest, map } from 'rxjs';
import { UserService } from 'src/app/core/dashboard/user/user.service';
import { ShareService } from 'src/app/core/share/share.service';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  cardData = cardData;
  projects: Project[];
  issues: Issue[];
  array: any;
  chart: any;
  chartData: any;
  convertedArray: any = [];
  userNumber: string;
  issueNumber: string;
  projectNumber: string;
  userData: any;
  userProjectId: number;
  userProject: any;
  projectIssueNumber: number;

  createLoading: boolean = false;
  myForm: FormGroup;
  file: string;

  modalRef: BsModalRef;

  constructor(
    private ProjectService: ProjectService,
    private UserService: UserService,
    private ShareService: ShareService,
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private IssueService: IssueService,
    private toastr: ToastrService
  ) {
    const storedData = localStorage.getItem('currentUser');

    if (storedData) {
      this.userData = JSON.parse(storedData);
    }

    this.myForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const projects$ = this.ProjectService.getProjects().pipe(
      map((data) => {
        this.projects = data.data;
        this.projectNumber = this.projects.length.toString();
        return data.data;
      })
    );

    const issues$ = this.IssueService.getIssues().pipe(
      map((data) => {
        this.issues = data.data;
        this.issueNumber = this.issues.length.toString();
        this.issuesCount();
        return data.data;
      })
    );

    if (this.userData.isadmin) {
      this.UserService.getUsers().subscribe({
        next: (data) => {
          this.userNumber = data.data.length?.toString();
        },
      });
    }

    combineLatest([projects$, issues$]).subscribe(([projects, issues]) => {
      if (
        this.userData?.projects &&
        this.userData.projects.length > 0 &&
        this.userData.projects[0].hasOwnProperty('projectid')
      ) {
        this.userProjectId = Number(this.userData?.projects[0]['projectid']);
        this.userProject = this.projects?.filter(
          (project) => Number(project.id) == this.userProjectId
        )[0];
        this.projectIssueNumber = (this.issues?.filter(
          (issue) => issue.projectid == this.userProjectId?.toString()
        )).length;
      }

      // both observables have emitted values, so we can perform the action here
      this.replaceIdWithName(this.array, projects);
      this.convertedArray = Object.entries(this.chartData[0]).map(
        ([label, y]) => ({ label, y })
      );
      this.chartOptions.data[0].dataPoints = this.convertedArray;
    });
  }

  issuesCount() {
    let count: any = {};
    for (let i = 0; i < this.issues?.length; i++) {
      if (count[this.issues[i].projectid]) {
        count[this.issues[i].projectid]++;
      } else {
        count[this.issues[i].projectid] = 1;
      }
    }
    this.array = count;
  }

  replaceIdWithName(idCounts: any, arr: any) {
    let nameCounts: any = {};
    for (let id in idCounts) {
      let name = arr.find((item: any) => item.id == id).name;
      nameCounts[name] = idCounts[id];
    }
    this.chartData = [nameCounts];
  }

  chartOptions = {
    title: {
      text: 'Total Projects by Issues',
    },
    animationEnabled: true,
    axisY: {
      includeZero: true,
      // suffix: "K"
    },
    data: [
      {
        type: 'bar',
        indexLabel: '{y}',
        // yValueFormatString: "#,###K",
        dataPoints: [],
      },
    ],
  };

  createIssueModal(template: TemplateRef<number>) {
    this.modalRef = this.modalService.show(template);
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  createIssue(projectID: number) {
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
          this.projectIssueNumber = this.projectIssueNumber + 1;
        },
        error: (err) => console.log(err),
      });
    }
  }

  closeModal() {
    this.modalRef.hide();
  }
}
