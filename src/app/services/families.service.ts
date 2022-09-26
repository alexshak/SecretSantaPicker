import { Injectable } from '@angular/core';

export interface Family {
  id: number;
  name: string | null;
  members: string[];
  assignments: string[];
}

@Injectable({
  providedIn: 'root'
})

export class FamiliesService {

  families: Family[] = [
    {
      id: 0,
      name: 'Family 1',
      members: ['Nicholas', 'Nancy', 'Bjorn', 'Brenna'],
      assignments: []
    },
    {
      id: 1,
      name: 'Family 2',
      members: ['John', 'Jane', 'Jeremy', 'Jen'],
      assignments: []
    }
  ];

  viabilityCheck: Boolean = true;
  nameCheck: Boolean = true;

  constructor() { }

  getFamilies() {
    return this.families;
  }

  updateFamily(newFamData: Family) {
    let famIndex = this.families.findIndex((obj => obj.name == newFamData.name));
    if (newFamData.members.length > 0 && newFamData.members[0].length == 0) {
      newFamData.members = [];
    }
    if (famIndex >= 0) {
      this.families[famIndex].name = newFamData.name;
      this.families[famIndex].members = newFamData.members;
    }
    this.checkFamilies();
    this.checkNames();
  }

  addFamily(): void {
    let newFamily: Family = {
      id: this.families.length,
      name: 'Family ' + (this.families.length + 1),
      members: [],
      assignments: []
    };
    this.families.push(newFamily);
  }

  removeFamily(familyId: number): void {
    this.families.splice(familyId, 1);
  }

  checkFamilies() {
    let longest = { index: 0, length: 0 };
    let totalMembers = 0;
    this.families.forEach((fam) => {
      totalMembers += fam.members.length;
      if (fam.members.length > longest.length) {
        longest = { index: fam.id, length: fam.members.length };
      }
    });
    this.viabilityCheck = longest.length <= totalMembers - longest.length;
  }

  checkNames() {
    let names = this.families.map((fam) => {
      return fam.name;
    })
    //check all names are different and not blank
    this.nameCheck = (new Set(names)).size === names.length && names.every((name) => name && name.length > 0);
    console.log('CHJROKS', names, names.length, this.nameCheck);
  }
}
