import { Injectable } from '@angular/core';

export interface Family { 
  id: number;
  name: string|null;
  members: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FamiliesService {

  families: Family[] = [
    {
      id: 0,
      name: 'Claus',
      members: ['Nicholas', 'Santafina', 'Bjorn E', 'Johanna C']
    },
    {
      id: 1,
      name: 'Family 2',
      members: ['John', 'Jane', 'Jeremy', 'Jen']
    }
  ];

  viabilityCheck = true;

  constructor() { }

  getFamilies() { 
    return this.families;
  }

  updateFamily(newFamData:Family) { 
    let famIndex = this.families.findIndex((obj => obj.name == newFamData.name));
    if(newFamData.members.length > 0 && newFamData.members[0].length == 0) { 
      newFamData.members = [];
    }
    if(famIndex > 0) { 
      this.families[famIndex].name = newFamData.name;
      this.families[famIndex].members = newFamData.members;
    }
    this.checkFamilies();
  }

  addFamily(): void { 
    let newFamily:Family = { 
      id: this.families.length,
      name: null,
      members:[]
    };
    this.families.push(newFamily);
  }

  removeFamily(familyId: number): void { 
    this.families.splice(familyId, 1);
  }

  checkFamilies() { 
    let longest = {index: 0, length: 0};
    let totalMembers = 0;
    this.families.forEach((fam) => {
      totalMembers += fam.members.length;
      if(fam.members.length > longest.length) { 
        longest = {index: fam.id, length: fam.members.length };
      }
    });
    // console.log('LONGEST?', longest, totalMembers);
    this.viabilityCheck = longest.length <= totalMembers - longest.length;    
  }
}
