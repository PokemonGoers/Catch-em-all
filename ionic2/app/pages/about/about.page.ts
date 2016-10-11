import { forwardRef } from '@angular/core';
import { Page } from 'ionic-angular';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ProjectGroupsService } from '../../services/project-groups.service';
import { ProjectGroup } from '../../models/project-group';

@Page({
  template: require('./about.page.html'),
  styles: [require('./about.page.scss')],
  directives: [forwardRef(() => NavbarComponent)]
})
export class AboutPage {

  projectGroups: ProjectGroup[];

  constructor(private projectGroupsService: ProjectGroupsService) {
      this.projectGroups = this.projectGroupsService.getProjectGroups();
  }

}
