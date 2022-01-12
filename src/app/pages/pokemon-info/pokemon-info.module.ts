import { NgModule } from '@angular/core';
import { PokemonInfoPageRoutingModule } from './pokemon-info-routing.module';
import { PokemonInfoPage } from './pokemon-info.page';
import { CoreModule } from 'src/app/shared/modules/core.module';

@NgModule({
  imports: [
    CoreModule,
    PokemonInfoPageRoutingModule
  ],
  declarations: [PokemonInfoPage]
})
export class PokemonInfoPageModule {}
