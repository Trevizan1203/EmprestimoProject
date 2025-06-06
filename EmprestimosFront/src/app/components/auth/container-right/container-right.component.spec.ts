import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRightComponent } from './container-right.component';

describe('ContainerRightComponent', () => {
  let component: ContainerRightComponent;
  let fixture: ComponentFixture<ContainerRightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerRightComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
