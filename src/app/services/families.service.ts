import { Injectable } from '@angular/core';

export interface Family { 
  id: number;
  name: string;
  members: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FamiliesService {

  families: Family[] = [
    {
      id: 0,
      name: 'GnG',
      members: ['Peter', 'Marian']
    },
    {
      id: 1, 
      name: 'Londoners',
      members: ['Jono', 'Anna C', 'Sadie', 'Sasha']
    },
    {
      id: 2, 
      name: 'Kraks',
      members: ['Dave', 'Kristy', 'Noah', 'Finn', 'Evie']
    },
    {
      id:3,
      name: 'Shakchettos',
      members: ['Mike', 'Anna B', 'Eddie', 'James']
    },
    {
      id:4,
      name: 'Shakouvlis',
      members: ['Alex', 'Kristen', 'Rafael', 'Lorenzo']
    },
    {
      id:5,
      name: 'Phiz',
      members: ['Phil', 'Liz', 'Sofia', 'Ari']
    },
  ];

  constructor() { }

  getFamilies() { 
    return this.families;
  }

  updateFamily(newFamData:Family) { 
    let famIndex = this.families.findIndex((obj => obj.name == newFamData.name));
    if(famIndex > 0) { 
      this.families[famIndex].name = newFamData.name;
      this.families[famIndex].members = newFamData.members;
    }
  }

  addFamily(newFamily: Family): void { 
    this.families.push(newFamily);
  }
}
