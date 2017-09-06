import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { LazyLoadImageModule } from './directives/lazyload-image.module';

import { AppComponent } from './app.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { CertificationsComponent } from './certifications/certifications.component';
import { PublicationsComponent } from './publications/publications.component';
import { FavoriteToolsComponent } from './favorite-tools/favorite-tools.component';
import { FavoriteLanguagesComponent } from './favorite-languages/favorite-languages.component';
import { ProjectsSectionComponent } from './projects-section/projects-section.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutMeComponent,
    EducationComponent,
    ExperienceComponent,
    CertificationsComponent,
    PublicationsComponent,
    FavoriteToolsComponent,
    FavoriteLanguagesComponent,
    ProjectsSectionComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    LazyLoadImageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
