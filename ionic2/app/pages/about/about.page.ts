import { forwardRef } from '@angular/core';
import { Page } from 'ionic-angular';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { PeopleService } from '../../services/people.service';
import { ProjectGroup } from '../../models/project-group';

@Page({
  template: require('./about.page.html'),
  styles: [require('./about.page.scss')],
  directives: [forwardRef(() => NavbarComponent)]
})
export class AboutPage {

  people: ProjectGroup[];

  constructor(private peopleService: PeopleService) {
      this.people = PeopleService.getProjectGroups();
  }

}
