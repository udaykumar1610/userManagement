import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersdataComponent } from './usersdata.component';

describe('UsersdataComponent', () => {
  let component: UsersdataComponent;
  let fixture: ComponentFixture<UsersdataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersdataComponent]
    });
    fixture = TestBed.createComponent(UsersdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
