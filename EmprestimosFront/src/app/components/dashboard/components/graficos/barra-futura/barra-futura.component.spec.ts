import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraFuturaComponent } from './barra-futura.component';

describe('BarraFuturaComponent', () => {
  let component: BarraFuturaComponent;
  let fixture: ComponentFixture<BarraFuturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraFuturaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraFuturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
