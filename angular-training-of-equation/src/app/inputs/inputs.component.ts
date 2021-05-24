import { Component, OnInit } from '@angular/core';
import { Value } from '../value';
import { VALUES } from "../values";

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {

  // values = VALUES;

  valueA: Value = {
    data: 0,
    name: 'A'
  };

  valueB: Value = {
    data: 0,
    name: 'B'
  };

  valueC: Value = {
    data: 0,
    name: 'C'
  };


  

  constructor() { }

  ngOnInit(): void {
  }

}
