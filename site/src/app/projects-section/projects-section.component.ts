import { Component, OnInit} from '@angular/core';
import { projects } from './projects';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  public projects = projects;

  constructor() {}

  ngOnInit() {

  }

}
