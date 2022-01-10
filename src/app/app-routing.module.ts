import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/pokemon-list/pokemon-list.module').then( m => m.PokemonListPageModule)
  },
  {
    path: 'pokemon/:id',
    loadChildren: () => import('./pages/pokemon-info/pokemon-info.module').then( m => m.PokemonInfoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
