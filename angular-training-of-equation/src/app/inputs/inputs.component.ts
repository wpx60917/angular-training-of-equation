import { Component, OnInit } from '@angular/core';
import { Value } from '../value';
import * as d3 from "d3";
import {   Axis,  Path,  ScaleLinear,  ScaleOrdinal,} from 'd3';

@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {


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

  private data = [
    {"Framework": "test", "Stars": "166443", "Released": "2014"},
    {"Framework": "test", "Stars": "150793", "Released": "2013"},
    {"Framework": "test", "Stars": "62342", "Released": "2016"},
    {"Framework": "test", "Stars": "27647", "Released": "2010"},
    {"Framework": "test", "Stars": "21471", "Released": "2011"},
  ];
  
  private svg : any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  private createSvg(): void {
    this.svg = d3.select("figure#scatter")
    .append("svg")
    .attr("width", this.width + (this.margin * 2))
    .attr("height", this.height + (this.margin * 2))
    .append("g")
    .attr("transform", "translate(" + this.margin + ", " + this.margin + ")");
 }

  private drawPlot(): void {
    // Add X axis
    const x = d3.scaleLinear()
    .domain([-100, 100])
    .range([ 0, this.width ]);
    this.svg.append("g")
    .attr("transform", "translate(0," + this.height + ")")
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

    // Add Y axis
    const y = d3.scaleLinear()
    .domain([-100, 100])
    .range([ this.height, 0]);
    this.svg.append("g")
    .call(d3.axisLeft(y));

    // Add dots
    const dots = this.svg.append('g');
    dots.selectAll("dot")
    .data(this.data)
    .enter()
    .append("circle")
    .attr("cx", (d: { Released: d3.NumberValue; }) => x(d.Released))
    .attr("cy", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
    .attr("r", 7)
    .style("opacity", .5)
    .style("fill", "#69b3a2");

    // Add labels
    dots.selectAll("text")
    .data(this.data)
    .enter()
    .append("text")
    .text((d: { Framework: any; }) => d.Framework)
    .attr("x", (d: { Released: d3.NumberValue; }) => x(d.Released))
    .attr("y", (d: { Stars: d3.NumberValue; }) => y(d.Stars))
  }

  

  constructor() { }

  ngOnInit(): void {

    // let svg: any;
    this.createSvg();
    this.drawPlot();
  }



}
