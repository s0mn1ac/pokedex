import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PokemonCardComponent } from 'src/app/components/pokemon-card/pokemon-card.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { IonicModule } from '@ionic/angular';
import { PokemonTypePillComponent } from 'src/app/components/pokemon-type-pill/pokemon-type-pills.component';
import { FormatPokemonNumberPipe } from '../pipes/format-pokemon-number.pipe';

@NgModule({
    declarations: [
        PokemonCardComponent,
        PokemonTypePillComponent,
        FormatPokemonNumberPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ScrollingModule,
        IonicModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        ScrollingModule,
        IonicModule,
        PokemonCardComponent,
        PokemonTypePillComponent,
        FormatPokemonNumberPipe
    ],
    providers: []
})
export class CoreModule {

    static forRoot(): ModuleWithProviders<CoreModule> {
        return {
            ngModule: CoreModule,
            providers: [],
        };
    }
}
