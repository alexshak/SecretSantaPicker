import { Component, Input, OnInit } from '@angular/core';
import { FamiliesService, Family } from '../services/families.service';

@Component({
  selector: 'family-list',
  templateUrl: './family-list.component.html',
  styleUrls: ['./family-list.component.scss']
})
export class FamilyListComponent implements OnInit {

  @Input() family: Family;

  membersString: string;

  constructor(private famService: FamiliesService) { 

  }

  ngOnInit(): void {
    this.membersString = this.family.members.toString();
  }

  updateFamily() { 
    this.membersString = this.membersString.replace(/,\s*$/, "");
    let membersUpdate = this.membersString.split(",");
    let famUpdateData: Family = {id: this.family.id, name: this.family.name, members: membersUpdate };
    this.famService.updateFamily(famUpdateData);
  }

}
