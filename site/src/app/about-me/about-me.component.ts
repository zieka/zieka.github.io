import { Component, OnInit } from '@angular/core';
import {determineWebPSupport, webPFileExtension} from '../helpers/webp';

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
