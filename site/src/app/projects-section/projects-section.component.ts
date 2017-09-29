import { Component, OnInit} from '@angular/core';
import { projects } from './projects';
import {determineWebPSupport, webPFileExtension} from '../helpers/webp';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit {

  public projects = projects;
  public defaultImage = '../assets/img/400x400.png';
  public offset = 200;
  public errorImage = '../assets/img/error.png';
  public supportsWebP = false;

  constructor() {
    this.supportsWebP = determineWebPSupport();
  }

  ngOnInit() {
  }

  public handleFileExtension( str: string ): string {
    if (this.supportsWebP) {
      return webPFileExtension(str);
    } else {
      return str;
    }
  }
}
