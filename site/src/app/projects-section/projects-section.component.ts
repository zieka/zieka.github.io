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
  public offset = 200;
  public errorImage = '../assets/img/error.png';
  public supportsWebP = false;

  constructor() {
    this. supportsWebP = this.determineWebPSupport();
  }

  ngOnInit() {
  }

  /**
   * Check browser for webp support
   * @return {boolean} if webp is supported returns true
   */
  private determineWebPSupport(): boolean {
    const elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
      // was able or not to get WebP representation
      return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    } else {
      // very old browser like IE 8, canvas not supported
      return false;
    }
  }

  /**
   * If browser supports webp then change file extensions to webp
   * @param  {string} str the file path with original extension
   * @return {string}     the file path to asset
   */
  public webPFileExtension( str: string ): string {
    if (this.supportsWebP) {
      return str.split(/\.(?=[^.]*$)/)[0] + '.webp';  // regex: split the string on last period
    } else {
      return str;
    }
  }
}
