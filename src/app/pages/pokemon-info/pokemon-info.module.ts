import { NgModule } from '@angular/core';
import { PokemonInfoPageRoutingModule } from './pokemon-info-routing.module';
import { PokemonInfoPage } from './pokemon-info.page';
import { CoreModule } from 'src/app/shared/modules/core.module';
import { PokemonDescriptionComponent } from 'src/app/components/pokemon-description/pokemon-description.component';
import { PokemonStatsComponent } from 'src/app/components/pokemon-stats/pokemon-stats.component';
import { PokemonProgressBarComponent } from 'src/app/components/pokemon-progress-bar/pokemon-progress-bar.component';
import { PokemonEvolutionChainComponent } from 'src/app/components/pokemon-evolution-chain/pokemon-evolution-chain.component';
import { PokemonCardMiniComponent } from 'src/app/components/pokemon-card-mini/pokemon-card-mini.component';
import { PokemonAbilitiesComponent } from 'src/app/components/pokemon-abilities/pokemon-abilities.component';

@NgModule({
  imports: [
    CoreModule,
    PokemonInfoPageRoutingModule
  ],
  declarations: [
    PokemonInfoPage,
    PokemonDescriptionComponent,
    PokemonStatsComponent,
    PokemonProgressBarComponent,
    PokemonEvolutionChainComponent,
    PokemonCardMiniComponent,
    PokemonAbilitiesComponent
  ]
})
export class PokemonInfoPageModule {}
