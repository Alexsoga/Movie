import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieAddingComponent } from './movie-adding.component';

describe('MovieAddingComponent', () => {
  let component: MovieAddingComponent;
  let fixture: ComponentFixture<MovieAddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieAddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieAddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
