import { Component, OnInit} from '@angular/core';
import { Heroe } from '../../interfaces/interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  equipo: Heroe[] = [];
  arregloVerificacion: [] = [];

  powerstats = {
    combat: 0,
    durability: 0,
    intelligence: 0,
    power: 0,
    speed: 0,
    strength: 0,
  }

  pesoAltura = {
    peso: 0,
    altura: 0
  };

  altura: number = 0;
  peso: number = 0;

  constructor(
    private router: Router,
    private heroesService: HeroesService
  ) { }

  ngOnInit() {
    this.equipo = JSON.parse(localStorage.getItem('equipo') || '{}');
    this.arregloVerificacion = JSON.parse(localStorage.getItem('arregloVerificacion') || '{}');
    this.pesoAltura = JSON.parse(localStorage.getItem('pesoAltura') || '{}');
    this.powerstats = JSON.parse(localStorage.getItem('powerstats') || '{}');
    
    if(this.equipo.length === 0) {
      localStorage.removeItem('pesoAltura')
    }
    console.log(this.equipo)
  }

  calculoEstadisticas( equipo: Heroe[] ) {
    
    this.powerstats.combat = 0;
    this.powerstats.durability = 0;
    this.powerstats.intelligence = 0;
    this.powerstats.power = 0;
    this.powerstats.speed = 0;
    this.powerstats.strength = 0;

    for (let i = 0; i < equipo.length; i++) {

      if(equipo[i].powerstats.combat !== "null") {
        let combat = parseInt(equipo[i].powerstats.combat)
        this.powerstats.combat += combat;
      }

      if(equipo[i].powerstats.durability !== "null") {
        let durability = parseInt(equipo[i].powerstats.durability)
        this.powerstats.durability += durability;
      }

      if(equipo[i].powerstats.intelligence !== "null") {
        let intelligence = parseInt(equipo[i].powerstats.intelligence)
        this.powerstats.intelligence += intelligence;
      }

      if(equipo[i].powerstats.power !== "null") {
        let power = parseInt(equipo[i].powerstats.power)
        this.powerstats.power += power;
      }

      if(equipo[i].powerstats.speed !== "null") {
        let speed = parseInt(equipo[i].powerstats.speed)
        this.powerstats.speed += speed;
      }

      if(equipo[i].powerstats.strength !== "null") {
        let strength = parseInt(equipo[i].powerstats.strength)
        this.powerstats.strength += strength;
      }
    }
    localStorage.setItem('powerstats', JSON.stringify(this.powerstats));
  }

  calculoPesoEstatura() {
    this.pesoAltura.peso = 0;
    this.pesoAltura.altura = 0;
    let altura = 0;
    let peso = 0;

    this.equipo.forEach( ({ id }) => {
      this.heroesService.getHeroeAppearance(id)
        .then( ( response: any ) => {
          altura += parseInt(response.data.height[1].split(' ')[0]);
          peso += parseInt(response.data.weight[1].split(' ')[0]);
          this.pesoAltura.altura = altura;
          this.pesoAltura.peso = peso;
          this.pesoAltura.altura = this.pesoAltura.altura / this.equipo.length;     
          this.pesoAltura.peso = this.pesoAltura.peso / this.equipo.length;     

          
          localStorage.setItem('pesoAltura', JSON.stringify(this.pesoAltura));
      })
    })
     
  }

  detalle(id: any) {
    this.router.navigate(['/heroes/', id ]);
  }

  eliminar(heroe: Heroe) {
    
    Swal.fire({
      title: 'Esta seguro?',
      text: "Se va a eliminar este heroe!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si!'
    }).then((result) => {
      if (result.isConfirmed) {
        let index = this.equipo.indexOf(heroe);
        this.equipo.splice(index, 1);
        this.arregloVerificacion.splice(index, 1);

        localStorage.setItem('equipo', JSON.stringify(this.equipo));
        localStorage.setItem('arregloVerificacion', JSON.stringify(this.arregloVerificacion));

        this.calculoEstadisticas(this.equipo);
        this.calculoPesoEstatura();
        
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'El heroe fue eliminado del equipo correctamente.',
          showConfirmButton: false,
          timer: 1500
        })
      }
    })
  }

}
