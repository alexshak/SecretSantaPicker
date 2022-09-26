import { Component, OnInit } from '@angular/core';
import { FamiliesService, Family } from '../services/families.service';
import * as _ from 'lodash';
import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-ssm-main',
  templateUrl: './ssm-main.component.html',
  styleUrls: ['./ssm-main.component.scss']
})
export class SsmMainComponent implements OnInit {

  families: Family[];
  outList: any[] = [];
  bigList: any = [];
  pickList: any = [];
  failureCheck: number = 0;

  constructor(public famService: FamiliesService, private toastr: ToastrService, private clipboard: Clipboard) {

  }

  ngOnInit(): void {
    this.families = this.famService.getFamilies();
  }

  startGeneration() {
    this.failureCheck = 0;
    this.generateList();
  }

  restartGeneration() {
    if (this.failureCheck > 9) {
      console.log(new Error('We tried sorting your list, but the combination of members and groups is not possible for our process. Please double check '))
    }
    else {
      this.generateList();
    }
  }

  generateList() {
    //Make a big list of all members and their family to work from
    this.bigList = [];
    this.pickList = [];
    this.outList = [];

    this.families.forEach(family => {
      if (family.members.length > 0) {
        family.members.forEach(member => {
          let listEntry = { name: member, group: family.name };
          this.bigList.push(listEntry);
          this.pickList.push(listEntry);
        })
      }
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
        // console.log('NO VIABLE REMAINING CHOICES RESTARTING', person.name + person.group, sameCheck);
        this.failureCheck += 1;
        this.generateList();
        break;
      }
      else {
        this.bigList = this.bigList.filter((item: any) => item.name + item.group !== person.name + person.group);
        // console.log(bigLength, person);

        let pickingCheck = this.selectPick(person);
        if (pickingCheck === 'break') {
          break;
        }
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

      let indexCheck = this.outList.map((e: any) => { return e.name }).indexOf(person.group);
      if (indexCheck > -1) {
        this.outList[indexCheck].assignments.push(assignment);
      }
      else {
        this.outList.push({ name: person.group, assignments: [assignment] });
      }
      this.outList = _.orderBy(this.outList, ['name'], ['asc']);
      return null
    }
    else {
      let sameCheck = this.pickList.filter((item: any) => item.group !== person.group);
      if (sameCheck.length == 0) {
        // console.log('SELECT PICK NO VIABLES', person.name + person.group, this.pickList);
        return 'break';
      }
      else {
        // console.log('BAD PICK TRYING AGAIN', person.name + person.group, pick.name, this.pickList);
        this.selectPick(person);
        return null;
      }
    }
  }

  copyList(group: Family) {
    this.toastr.success('🎅🎅🎅🎅', group.name + ' family has been copied to the clipboard');
    this.clipboard.copy(group.assignments.join('\n'))
  }

}
