import { Component, OnInit } from '@angular/core';
import { Value } from '../value';
import * as d3 from "d3"; 


@Component({
  selector: 'app-inputs',
  templateUrl: './inputs.component.html',
  styleUrls: ['./inputs.component.css']
})
export class InputsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.createSvg();
    // this.drawPlot();
  }



  valueA: Value = {
    data: 5,
    name: 'A'
  };

  valueB: Value = {
    data: 5,
    name: 'B'
  };

  valueC: Value = {
    data: 5,
    name: 'C'
  };





  private svg : any;
  // private drawpic = svg;
  

    private points = this.createPoints(this.valueA.data,this.valueB.data,this.valueC.data,[-10,10],0.5);
    
    private createSvg(): void {
      //coordinates
      this.svg = d3.select("#container")
      .append("svg")
      .attr("viewBox","0 0 200 200");
      this.svg.selectAll(".coordinates").data(d3.range(2))
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
      this.svg
      .append("g")
      .attr("transform","translate(100,100) scale(1,-1)")
      .append("path")//路徑綁定
      .attr("stroke-width","2")
      .attr("stroke","black")
      .attr("fill","transparent")
      .transition()
      .delay(250)
      .duration(1500)
      .attrTween("d",() =>{
        return (t: number) =>{
         return "M"+this.points.slice(0,Math.max(1,t*this.points.length|0)).join("L");//路徑The d attribute defines a path to be drawn. M起始點
        }
      }).each("end",() =>{
        d3.select(this.svg)
          .transition()
          .delay(250)
          .duration(1500);
      });   
    }

    



  // animate(this: any, selection: any){
  //     this
  //     .attrTween("d",() =>{
  //       return (t: number) =>{
  //        return "M"+this.points.slice(0,Math.max(1,t*this.points.length|0)).join("L");
  //       }
  //     }).each("end",() =>{
  //       d3.select(this)
  //         .transition()
  //         .delay(250)
  //         .duration(1500);
  //     })
  // }

  createPoints(a: number,b: number,c: number,rangeX: number[],step: number){
    return Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
      var x = rangeX[0]+i*step;
      return [x,a * x * x + b * x + c];
    })
  }



}
