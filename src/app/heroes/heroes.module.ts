import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { EquipoComponent } from './components/equipo/equipo.component';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { DetalleComponent } from './components/detalle/detalle.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PowerstatsComponent } from './shared/powerstats/powerstats.component';
import { PesoAlturaComponent } from './shared/peso-altura/peso-altura.component';
import { SidemenuComponent } from './shared/sidemenu/sidemenu.component';


@NgModule({
  declarations: [
    EquipoComponent,
    BuscadorComponent,
    DetalleComponent,
    PowerstatsComponent,
    PesoAlturaComponent,
    SidemenuComponent
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
