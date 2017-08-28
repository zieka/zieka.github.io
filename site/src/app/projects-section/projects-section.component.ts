import { Component, OnInit, AfterViewInit} from '@angular/core';
import { projects } from './projects';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit, AfterViewInit {

  public projects = projects;

  constructor() {}

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.projects.forEach((project) => {
      let elem = document.getElementById('project' + project.id);
      elem.innerHTML = project.description;
    });
  }

}
