import { NgModule } from '@angular/core';
import { PokemonInfoPageRoutingModule } from './pokemon-info-routing.module';
import { PokemonInfoPage } from './pokemon-info.page';
import { CoreModule } from 'src/app/shared/modules/core.module';
import { PokemonDescriptionComponent } from 'src/app/components/pokemon-description/pokemon-description.component';

@NgModule({
  imports: [
    CoreModule,
    PokemonInfoPageRoutingModule
  ],
  declarations: [
    PokemonInfoPage,
    PokemonDescriptionComponent
  ]
})
export class PokemonInfoPageModule {}
