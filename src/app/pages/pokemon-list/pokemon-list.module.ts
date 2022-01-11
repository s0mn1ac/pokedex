import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonListPageRoutingModule } from './pokemon-list-routing.module';

import { PokemonListPage } from './pokemon-list.page';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';

import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    ScrollingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonListPageRoutingModule
  ],
  declarations: [
    PokemonListPage,
    PokemonCardComponent
  ]
})
export class PokemonListPageModule {}
