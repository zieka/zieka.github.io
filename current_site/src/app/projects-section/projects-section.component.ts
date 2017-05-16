import { Component, OnInit, AfterViewInit} from '@angular/core';

@Component({
  selector: 'app-projects-section',
  templateUrl: './projects-section.component.html',
  styleUrls: ['./projects-section.component.scss']
})
export class ProjectsSectionComponent implements OnInit, AfterViewInit {

  public projects = [
    {
      id : 1,
      mediaType : 'image',
      title : 'Go to Budget Party on Heroku',
      href : 'https://budgetparty.herokuapp.com/',
      source : '../assets/img/budgetparty_1.png',
      imgAlt : 'Budget Party',
      name : 'Budget Party',
      description : `A simple budgeting app written in elixir (based on erlang)
                    using the phoenix framework. Feel free make a login and
                    check it out on heroku.`,
      links : [
        {
          name: 'Github',
          href : 'https://github.com/zieka/budgetparty'
        },
        {
          name: 'Heroku',
          href : 'https://budgetparty.herokuapp.com/'
        }
      ]
    },
    {
      id : 2,
      mediaType : 'image',
      title : 'Go to Predictive Text on ShinyApp',
      href : 'https://zieka.shinyapps.io/computational_linguistics',
      source : '../assets/img/predictive_text_1.png',
      imgAlt : 'Predictive Text',
      name : 'Predictive Text',
      description : `This is a predictive text app written in R using computational
                    linguistics (n-gram model) and deployed as a Shinyapp.
                    Documentation can be found in the slide presentation and
                    github repo.`,
      links : [
        {
          name: 'ShinyApp',
          href : 'https://zieka.shinyapps.io/computational_linguistics'
        },
        {
          name: 'Slide Presentation',
          href : 'http://rpubs.com/zieka/text_prediction'
        },
        {
          name: 'Github',
          href : 'https://github.com/zieka/computational_linguistics'
        }
      ]
    },
    {
      id : 3,
      mediaType : 'image',
      title : 'Go to Recipe Finder on Heroku',
      href : 'http://recipefinder-scullykns.herokuapp.com/',
      source : '../assets/img/recipe_finder_1.png',
      imgAlt : 'Recipe Finder',
      name : 'Recipe Finder',
      description : `This is an app written in ruby using the rails framework
                    which utilized the food2fork api.  Head on over and find
                    something good to cookup.`,
      links : [
        {
          name: 'Github',
          href : 'https://github.com/zieka/recipefinders'
        },
        {
          name: 'Heroku',
          href : 'http://recipefinder-scullykns.herokuapp.com/'
        }
      ]
    },
    {
      id : 4,
      mediaType : 'image',
      title : 'Go to Esty Data on ShinyApp',
      href : 'https://zieka.shinyapps.io/etsy_data/',
      source : '../assets/img/etsy_1.png',
      imgAlt : 'Etsy Data',
      name : 'Etsy Data',
      description : `I built a scraper using import.io to build a sample dataset
                    of stores on etsy.com.  This app is written in R and deployed
                    using Shinyapp and will allow you to filter the dataset and
                    perform k-means clustering in realtime.`,
      links : [
        {
          name: 'ShinyApp',
          href : 'https://zieka.shinyapps.io/etsy_data/'
        },
        {
          name: 'Github',
          href : 'https://github.com/zieka/etsy_data'
        }
      ]
    },
    {
      id : 5,
      mediaType : 'image',
      title : 'Go to XML Extractor on Github.io',
      href : 'http://zieka.github.io/xml_extractor/',
      source : '../assets/img/xml_extractor_1.png',
      imgAlt : 'XML Extractor',
      name : 'XML Extractor',
      description : `Single page webapp I made to help co-workers extract xml
                    requests when they are contructed in vbscript files.  To try
                    it out copy the example script and paste it into the app.`,
      links : [
        {
          name: 'Github.io',
          href : 'http://zieka.github.io/xml_extractor/'
        },
        {
          name: 'Example',
          href : '../assets/examples/xml_extractor_vbscript_example'
        }
      ]
    },
    {
      id : 6,
      mediaType : 'image',
      title : 'Go to the USB-X Product Information',
      href : 'http://blackdiamondvideo.com/products/usb-x/',
      source : '../assets/img/usb-x.jpg',
      imgAlt : 'USB-X',
      name : 'USB-X',
      description : `Managed retrofit and deployment of USB-X, IP-based USB switching device.
            <ul>
              <li>handled scheduling with hospitals and internal resources</li>
              <li>contributing to internal procurement discussions</li>
              <li>creating diagrams and documentation</li>
              <li>debugging the product</li>
              <li>automate testing and deployment</li>
              <li>escalated support for the device.</li>
            </ul>`,
      links : [
        {
          name: 'Datasheet',
          href : 'http://blackdiamondvideo.com/wp-content/uploads/2013/12/USB-X-Data-Sheet.pdf'
        }
      ]
    },
    {
      id : 7,
      mediaType : 'video',
      title : 'Touchless LMM',
      source : '../assets/video/lmm_gesture.mp4',
      imgAlt : 'Touchless LMM',
      name : 'Touchless LMM',
      description : `This was a working protoype I made of a touchless control
                    system to allow surigcal staff to change layouts on an 8MP
                    monitor from within the sterile field.  It was really fun to
                    see the outstanding reaction in person when demoed at the AORN
                    Surgical Conference 2014 in Chicago.`
    }
  ];

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
