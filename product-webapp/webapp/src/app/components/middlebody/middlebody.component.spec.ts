import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddlebodyComponent } from './middlebody.component';

describe('MiddlebodyComponent', () => {
  let component: MiddlebodyComponent;
  let fixture: ComponentFixture<MiddlebodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MiddlebodyComponent]
    });
    fixture = TestBed.createComponent(MiddlebodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
