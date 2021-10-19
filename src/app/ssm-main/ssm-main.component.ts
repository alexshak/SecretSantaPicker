import { Component, OnInit } from '@angular/core';
import { FamiliesService, Family } from '../services/families.service';

@Component({
  selector: 'app-ssm-main',
  templateUrl: './ssm-main.component.html',
  styleUrls: ['./ssm-main.component.scss']
})
export class SsmMainComponent implements OnInit {

  families: Family[];
  outList: string[] = [];
  bigList: any = [];
  pickList: any = [];

  constructor(private famService: FamiliesService) {

  }

  ngOnInit(): void {
    this.families = this.famService.getFamilies();
  }

  generateList() {
    //Make a big list of all members and their family to work from
    this.bigList = [];
    this.pickList = [];
    this.outList = [];

    let alreadyPicked: string[] = [];
    this.families.forEach(family => {
      family.members.forEach(member => {
        let listEntry = { name: member, group: family.name };
        this.bigList.push(listEntry);
        this.pickList.push(listEntry);
      })
    });

    let bigLength = this.bigList.length;

    //iterate through the Big List
    for (bigLength; bigLength > 0; bigLength--) {
      //Select a random family member
      let index = Math.floor(Math.random() * bigLength);
      let person = this.bigList[index];

      //Check the remaining options aren't all in the pick's family and if so start over
      let sameCheck = this.pickList.filter((item: any) => item.group !== person.group);
      if (sameCheck.length == 0) {
        console.log('NO VIABLE REMAINING CHOICES RESTARTING', person.name + person.group, sameCheck);
        this.generateList();
        break;
      }
      else {
        this.bigList = this.bigList.filter((item: any) => item.name + item.group !== person.name + person.group);
        console.log(bigLength, person);

        this.selectPick(person);
      }
    }
  }

  selectPick(person: any) {
    let index = Math.floor(Math.random() * this.pickList.length);
    let pick = this.pickList[index];
    if (pick.group !== person.group) {
      // console.log('GOT A PICK', person.name + person.group, pick.name);
      this.pickList = this.pickList.filter((item: any) => item.name + item.group !== pick.name + pick.group);
      let assignment = person.name + ' is giving to ' + pick.name;
      this.outList.push(assignment);
    }
    else {
      console.log('BAD PICK TRYING AGAIN', person.name + person.group, pick.name);
      this.selectPick(person);
    }
  }

}
