import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-peso-altura',
  templateUrl: './peso-altura.component.html',
  styleUrls: ['./peso-altura.component.css']
})
export class PesoAlturaComponent implements OnInit {

  @Input() pesoAltura: any = [];

  constructor() { }

  ngOnInit(): void {
  }

}
