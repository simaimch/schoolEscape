import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachablePositionComponent } from './reachable-position.component';

describe('ReachablePositionComponent', () => {
  let component: ReachablePositionComponent;
  let fixture: ComponentFixture<ReachablePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReachablePositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReachablePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
