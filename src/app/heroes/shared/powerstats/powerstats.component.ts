import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-powerstats',
  templateUrl: './powerstats.component.html',
  styleUrls: ['./powerstats.component.css']
})
export class PowerstatsComponent implements OnInit {

  @Input() powerstats: any = [];

  constructor() { }

  ngOnInit(): void {
    // console.log(this.powerstats)
  }

}
