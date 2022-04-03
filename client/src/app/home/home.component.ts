import { Component, OnInit } from '@angular/core';
import {Person} from "../person";
import {InfoService} from "../info.service";
import { isForStatement } from 'typescript';

interface person {
  name: string,
  profession: string
}


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private InfoService:InfoService) { }

  info: Person[]=[];
  index:number=-1;
  selectedPerson: any=null;
  newPerson:person={name:"",profession:""}
  toUpdate: boolean=false;
  toAdd: boolean=false;
  toRemove: boolean=false;
  goAnalysis: boolean=false;
  most: any="";
  mostMessage: string="";
  little: any="";
  littleMessage: string="";
  message: string = "";

  ngOnInit (): void {
    this.getInfo();
    this.analysis()
  }
  
  getInfo(): void {
    this.InfoService.getAll()
    .subscribe(
      (data: Person[]) => {
        this.info = [...data];
        this.analysis()
      },
      (err) => {
        console.log(err)
      }
    );
  }

  addPerson(person: Person):void {
    console.log(person);
    this.InfoService.add(person)
    .subscribe(
      (data: Person[]) => {
        this.info = [...data];
        this.analysis()
      },
      (err) => {
        console.log(err)
      }
    );
  }

  removePerson(id:any):void {
    this.InfoService.remove(id)
    .subscribe(
      (data: Person[]) => {
        this.info = [...data];
        this.analysis()
      },
      (err) => {
        console.log(err)
      }
    );
  }

  updatePerson(id:any,person: Person):void {
    this.InfoService.update(id,person)
    .subscribe(
      (data: Person[]) => {
        this.info = [...data];
        this.analysis()
      },
      (err) => {
        console.log(err)
      }
    );
  }

  selected=(person: any)=>{
    this.selectedPerson={...person};
    this.index=this.info.findIndex((e)=>e.name===this.selectedPerson.name);
  }

  goToRemove=()=>this.toRemove=true;
  remove=()=>{
    if (this.index>-1){
    this.removePerson(this.selectedPerson._id);
    this.selectedPerson=null;
    this.toRemove=false;
  }}
  goToUpdate=()=>{    
    this.toUpdate=true;
  }
  update=()=>{
    this.updatePerson(this.selectedPerson._id,this.selectedPerson);
    this.selectedPerson=null;
    this.toUpdate=false;
  }
  goToAdd=()=>{
    this.toAdd=true;
  }
  add=()=>{
    if (this.newPerson && this.newPerson.name && this.newPerson.profession) {
      let names=this.info.map((e)=>e.name)
      if (!names.includes(this.newPerson.name)){
      this.addPerson(this.newPerson);
      this.cancel();
      } else {
        this.message="The name is already exist"
      }
    } else {this.message="Fill in all the details"}
  }
  cancel=()=>{
    this.toAdd=false;
    this.toUpdate=false;    
    this.toRemove=false;
    this.selectedPerson=null;
    this.message="";
  }

  analysis = ()=>{
    this.little="";
    this.most="";
    if (this.info.length>0){
    let professions=this.info.map((e)=>e.profession)
    let obj: any={};
    let max: string='';
    let min: string='';
    for(let k of professions) {
    if(obj[k]) {obj[k]++} else {obj[k]=1}}
    let newArr=Object.entries(obj);
    let sort=newArr.sort((a:any,b:any)=>a[1]-b[1]);
    console.log(sort);
    if (sort[sort.length-1][1]!==sort[sort.length-2][1])
    {max=sort[sort.length-1][0]} else {this.mostMessage="There is more than one favorite"}
    if (sort[0][1]!==sort[1][1])
    {min=sort[0][0]}
    if (min) {this.little=min} else {this.littleMessage="There is more than one favorite"};
    console.log(min)
    if (max) {this.most=max} else {this.most=""};
    }    
    this.goAnalysis=true;
  }

}
