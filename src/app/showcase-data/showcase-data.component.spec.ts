import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowcaseDataComponent } from './showcase-data.component';

describe('ShowcaseDataComponent', () => {
  let component: ShowcaseDataComponent;
  let fixture: ComponentFixture<ShowcaseDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowcaseDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowcaseDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
