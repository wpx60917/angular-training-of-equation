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

    // this.createSvg();
    this.initSvg();
    this.initAxisPath();
  }



  valueInput: Value = {
    a: -1,
    b: 0,
    c: 80
  };


 
  warn(a:number,b:number,c:number){
    if (a>100||a<-100||b>100||b<-100||c>100||c<-100) {
      return true;
    } else {
      return false;
    }
  }

   warncheck:boolean = this.warn(this.valueInput.a,this.valueInput.b,this.valueInput.c);
   



  private svg : any;
  
  private rangeX: any;
  private rangeY: any;
  

    private points = this.createPoints(this.valueInput.a,this.valueInput.b,this.valueInput.c,[-50,50],0.5);
    
    // private createSvg(): void {
    //   //coordinates
    //   this.svg = d3.select("#container")
    //   .append("svg")
    //   .attr("viewBox","0 0 200 200");
    //   this.svg.selectAll(".coordinates").data(d3.range(2))
    //   .enter()
    //   .append("path")
    //   .attr("class","coordinates")
    //   .attr("stroke","black")
    //   .attr("d",function(d: any,i: any){
    //     return i
    //     ? "M0,100h200"
    //     : "M100,0v200"
    //   });
         
    // }

    xScale: any;
    yScale: any;
    padding: number = 10;


    initSvg() {
      this.svg = d3.select("#container").append('svg')
        .attr('width', 300)
        .attr('height', 300)
    }
  
    initAxisPath() {
      //axis
      this.xScale = d3.scaleLinear().domain(this.rangeX).range([0 + this.padding, 300 - this.padding]);
      this.yScale = d3.scaleLinear().domain(this.rangeY).range([0 + this.padding, 300 - this.padding]);
      this.svg.append('g')
        .attr('transform', 'translate('+ 0 +','+ this.yScale(0) +')')
        .call(d3.axisBottom(this.xScale));
      
      this.svg.append('g')
        .attr('transform', 'translate('+ this.xScale(0) +','+ 0 +')')
        .call(d3.axisLeft(this.yScale));

      //path
      this.svg.append("g")
      .attr("transform","translate("+this.xScale(0)+","+this.yScale(0)+") scale(1,-1)")
      .append("path")//????????????
      .attr("stroke-width","2")
      .attr("stroke","black")
      .attr("fill","transparent")
      .transition()
      .delay(250)
      .duration(1500)
      .attrTween("d",() =>{
        return (t: number) =>{
         return "M"+this.points.slice(0,Math.max(1,t*this.points.length|0)).join("L");//??????The d attribute defines a path to be drawn. M?????????
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

  setRange(x: any, y: any) {
    this.rangeX = x;
    this.rangeY = y;
  }
  

  createPoints(a: number,b: number,c: number,rangeX: number[],step: number){
    let maxY=10;

    const arr = Array.apply(null,Array((rangeX[1]-rangeX[0])/step|0 + 1))
    .map(function(d,i){
      const x = rangeX[0]+i*step;
      const y=a * x * x + b * x + c;
      maxY = Math.max(maxY, Math.abs(y));
      return [x,y];
    });
    this.setRange([-maxY, maxY], [maxY, -maxY]);
    return arr;
  }

  valueChange(valueInput: any) {
    console.log(this.valueInput);
    this.warncheck = this.warn(this.valueInput.a,this.valueInput.b,this.valueInput.c);
    if (this.warncheck==true) {
      this.svg.selectAll("*").remove();
    } else {
      this.svg.selectAll("*").remove();
      this.points = this.createPoints(this.valueInput.a,this.valueInput.b,this.valueInput.c,[-10,10],0.5);
      this.initAxisPath();
    }
    
  }



}
function maxY(maxY: any, arg1: number): any {
  throw new Error('Function not implemented.');
}

