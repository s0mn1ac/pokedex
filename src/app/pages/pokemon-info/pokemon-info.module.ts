import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonInfoPageRoutingModule } from './pokemon-info-routing.module';

import { PokemonInfoPage } from './pokemon-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonInfoPageRoutingModule
  ],
  declarations: [PokemonInfoPage]
})
export class PokemonInfoPageModule {}
