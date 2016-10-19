import { Component } from '@angular/core';

import { ProjectGroupsService } from '../../services/project-groups.service';
import { ProjectGroup } from '../../models/project-group';

@Component({
  selector: 'about-page',
  templateUrl: './about.page.html'
})
export class AboutPage {

  projectGroups: ProjectGroup[];

  constructor(private projectGroupsService: ProjectGroupsService) {
      this.projectGroups = this.projectGroupsService.getProjectGroups();
  }

}
