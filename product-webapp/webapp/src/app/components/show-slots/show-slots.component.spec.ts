import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSlotsComponent } from './show-slots.component';

describe('ShowSlotsComponent', () => {
  let component: ShowSlotsComponent;
  let fixture: ComponentFixture<ShowSlotsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowSlotsComponent]
    });
    fixture = TestBed.createComponent(ShowSlotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
