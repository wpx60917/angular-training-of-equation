import { Component, OnInit } from '@angular/core';
import { Value } from '../value';
import * as d3 from "d3"; 

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


  
  private svg : any;

  

    private points: any = this.createPoints(2,2,10,[-30,30],0.5);
    
    private createSvg(): void {
      //coordinates
      this.svg = d3.select("#container")
      .append("svg")
      .attr("viewBox","0 0 200 200");
      svg.selectAll(".coordinates").data(d3.range(2))
      .enter()
      .append("path")
      .attr("class","coordinates")
      .attr("stroke","black")
      .attr("d",function(d: any,i: any){
        return i
        ? "M0,100h200"
        : "M100,0v200"
      });
      //path
      svg
      .append("g")
      .attr("transform","translate(100,100) scale(1,-1)")
      .append("path")
      .attr("stroke-width","2")
      .attr("stroke","black")
      .attr("fill","transparent")
      .transition()
      .delay(250)
      .duration(1500);
      // .call(animate);     
    }

    

  constructor() { }

  ngOnInit(): void {

    this.createSvg();
    // this.drawPlot();
  }

  // animate(this: any, selection: any){
  //   this
  //   .attrTween("d",function(){
  //     return function(t: number){
  //      return "M"+this.points.slice(0,Math.max(1,t*this.points.length|0)).join("L");
  //     }
  //   }).each("end",() =>{
  //     d3.select(this)
  //       .transition()
  //       .delay(250)
  //       .duration(1500);
  //   })
  // }

  createPoints(a: number,b: number,c: number,rangeX: number[],step: number){
    return Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
      var x = rangeX[0]+i*step;
      return [x,a * x * x + b * x + c];
    })
  }



}
