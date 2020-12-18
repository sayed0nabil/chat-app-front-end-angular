import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAsideBarComponent } from './users-aside-bar.component';

describe('UsersAsideBarComponent', () => {
  let component: UsersAsideBarComponent;
  let fixture: ComponentFixture<UsersAsideBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersAsideBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersAsideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
