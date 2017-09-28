import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  public links = [
    {
      title : 'Linkedin - More about my resume',
      href : 'https://www.linkedin.com/in/kylescully',
      imgWidth : '28',
      imgSrc : '../assets/img/linkedin.png',
      imgAlt : 'Linkedin'
    },
    {
      title : 'Github - More about my code',
      href : 'https://github.com/zieka',
      imgWidth : '28',
      imgSrc : '../assets/img/github.png',
      imgAlt : 'Github'
    },
    {
      title : 'Instagram - More about my photography',
      href : 'https://www.instagram.com/scullykns',
      imgWidth : '28',
      imgSrc : '../assets/img/instagram.png',
      imgAlt : 'Instagram'
    },
    {
      title : 'Facebook - More about my friends',
      href : 'https://www.facebook.com/kyle.scully.31',
      imgWidth : '28',
      imgSrc : '../assets/img/facebook.png',
      imgAlt : 'Facebook'
    },
    {
      title : 'Send me an email',
      href : 'mailto:scullykns@gmail.com',
      imgWidth : '28',
      imgSrc : '../assets/img/gmail.png',
      imgAlt : 'Gmail'
    }
  ];

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
