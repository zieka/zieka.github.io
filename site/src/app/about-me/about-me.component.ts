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
      imgSrc : '../assets/img/linkedin.webp',
      imgAlt : 'Linkedin'
    },
    {
      title : 'Github - More about my code',
      href : 'https://github.com/zieka',
      imgWidth : '28',
      imgSrc : '../assets/img/github.webp',
      imgAlt : 'Github'
    },
    {
      title : 'Instagram - More about my photography',
      href : 'https://www.instagram.com/scullykns',
      imgWidth : '28',
      imgSrc : '../assets/img/instagram.webp',
      imgAlt : 'Instagram'
    },
    {
      title : 'Facebook - More about my friends',
      href : 'https://www.facebook.com/kyle.scully.31',
      imgWidth : '28',
      imgSrc : '../assets/img/facebook.webp',
      imgAlt : 'Facebook'
    },
    {
      title : 'Send me an email',
      href : 'mailto:scullykns@gmail.com',
      imgWidth : '28',
      imgSrc : '../assets/img/gmail.webp',
      imgAlt : 'Gmail'
    }
  ];

  constructor() { }

  ngOnInit() {
  }
}
