import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/core/dashboard/project/project.service';
import { Project } from 'src/app/interfaces/Project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []
  errorMessage: string

  constructor(private ProjectService: ProjectService) { }

  ngOnInit(): void {
    this.ProjectService.getProjects().subscribe({
      next: data => {
        this.projects = data.data
      },
      error: err => this.errorMessage = err
    })
  }

  refreshProjects() {
    this.ProjectService.clearCache();
    this.ProjectService.getProjects().subscribe({
      next: data => {
        this.projects = data.data
      },
      error: err => this.errorMessage = err
    })
  }

}
