import { NgModule } from '@angular/core';
import { PokemonListPageRoutingModule } from './pokemon-list-routing.module';
import { PokemonListPage } from './pokemon-list.page';
import { CoreModule } from 'src/app/shared/modules/core.module';

@NgModule({
  imports: [
    CoreModule,
    PokemonListPageRoutingModule
  ],
  declarations: [PokemonListPage]
})
export class PokemonListPageModule {}
