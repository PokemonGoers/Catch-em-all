import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import env from './env';
import { App } from './app.component';
import { AboutPage } from '../pages/about/about.page';
import { ImprintPage } from '../pages/imprint/imprint.page';
import { MapPage } from '../pages/map/map.page';
import { PokeDetailPage } from '../pages/poke-detail/poke-detail.page';
import { SearchPage } from '../pages/search/search.page';
import { WikiIndexPage } from '../pages/wiki-index/wiki-index.page';

import { EvolutionsComponent } from '../components/evolutions/evolutions.component';
import { FilterComponent } from '../components/filter/filter.component';
import { FilterPokemonTabComponent } from '../components/filter-pokemon-tab/filter-pokemon-tab.component';
import { FilterTimeTabComponent } from '../components/filter-time-tab/filter-time-tab.component';
import { MapComponent } from '../components/map/map.component';
import { NavSidebarComponent } from '../components/nav-sidebar/nav-sidebar.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { POIBubbleComponent } from '../components/poi-bubble/poi-bubble.component';
import { POICardComponent } from '../components/poi-card/poi-card.component';
import { RarityBadgeComponent } from '../components/rarity-badge/rarity-badge.component';
import { TypeComponent } from '../components/type/type.component';

import { ApiService } from '../services/api.service';
import { ConfigService } from '../services/config.service';
import { LocationService } from '../services/location.service';
import { FilterService } from '../services/filter.service';
import { ProjectGroupsService } from '../services/project-groups.service';
import { TypeService } from '../services/type.service';

import { PokemonFilterPipe } from '../pipes/pokemon-filter/pokemon-filter.pipe';


for (let envKey in env) {
  console.log(envKey, env[envKey]);
}

@NgModule({
  declarations: [
    App,
    AboutPage,
    ImprintPage,
    MapPage,
    PokeDetailPage,
    SearchPage,
    WikiIndexPage,
    EvolutionsComponent,
    FilterComponent,
    FilterPokemonTabComponent,
    FilterTimeTabComponent,
    MapComponent,
    NavSidebarComponent,
    NavbarComponent,
    POIBubbleComponent,
    POICardComponent,
    RarityBadgeComponent,
    TypeComponent,
    PokemonFilterPipe
  ],
  imports: [
    IonicModule.forRoot(App)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    App,
    AboutPage,
    ImprintPage,
    MapPage,
    PokeDetailPage,
    SearchPage,
    WikiIndexPage,
    FilterComponent
  ],
  providers: [
    ApiService,
    ConfigService,
    FilterService,
    LocationService,
    ProjectGroupsService,
    TypeService
  ]
})
export class AppModule {
}
