import { Component, OnInit } from '@angular/core';
import {Person} from "../person";
import {InfoService} from "../info.service";

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
  message: string = "";

  ngOnInit(): void {
    this.getInfo();
  }
  
  getInfo(): void {
    this.InfoService.getAll()
    .subscribe(
      (data: Person[]) => {
        this.info = data;
        console.log(this.info) 
      },
      (err) => {
        console.log(err)
      }
    );
  }

  addPerson(person: Person):void {
    this.InfoService.add(person)
    .subscribe(
      (data: Person[]) => {
        this.info = data;
        console.log(this.info) 
      },
      (err) => {
        console.log(err)
      }
    );
  }

  removePerson(person: Person):void {
    this.InfoService.remove(person)
    .subscribe(
      (data: Person[]) => {
        this.info = data;
        console.log(this.info) 
      },
      (err) => {
        console.log(err)
      }
    );
  }

  updatePerson(person: Person, personIndex: number):void {
    this.InfoService.update(person,personIndex)
    .subscribe(
      (data: Person[]) => {
        this.info = data;
        console.log(this.info) 
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
    this.removePerson(this.selectedPerson);
    this.selectedPerson=null;
    this.toRemove=false;
  }}
  goToUpdate=()=>{    
    this.toUpdate=true;
  }
  update=()=>{
    this.info.splice(this.index,1,this.selectedPerson);
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
        this.message="The name is allready exist"
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
    if (this.info.length>0){
    let professions=this.info.map((e)=>e.profession)
    let obj: any={};
    let max: string='';
    let maxi: number=0;
    for(let k of professions) {
    if(obj[k]) obj[k]++; else obj[k]=1;
    if(maxi < obj[k]) { max=k; maxi=obj[k] }
    if (maxi>1){this.most=max
    } else {
      this.most="";
    }    
    }
    
    this.goAnalysis=true;
  }
  }  
}
