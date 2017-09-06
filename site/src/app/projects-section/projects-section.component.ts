import { Component, OnInit} from '@angular/core';
import { projects } from './projects';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  public projects = projects;
  public defaultImage = '../assets/img/400x400.png';
  public offset = 100;
  public errorImage = '../assets/img/error.png';

  constructor() {}

  ngOnInit() {
  }

}
