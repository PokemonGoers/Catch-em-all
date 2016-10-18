import { Component } from '@angular/core';

import { ProjectGroupsService } from '../../services/project-groups.service';
import { ProjectGroup } from '../../models/project-group';

@Component({
  templateUrl: './about.page.html',
  styleUrl: './about.page.scss'
})
export class AboutPage {

  projectGroups: ProjectGroup[];

  constructor(private projectGroupsService: ProjectGroupsService) {
      this.projectGroups = this.projectGroupsService.getProjectGroups();
  }

}
