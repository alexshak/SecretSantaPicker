import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsmMainComponent } from './ssm-main.component';

describe('SsmMainComponent', () => {
  let component: SsmMainComponent;
  let fixture: ComponentFixture<SsmMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SsmMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SsmMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
