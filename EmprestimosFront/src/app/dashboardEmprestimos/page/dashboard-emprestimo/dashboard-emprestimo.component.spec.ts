import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardEmprestimoComponent } from './dashboard-emprestimo.component';

describe('DashboardEmprestimoComponent', () => {
  let component: DashboardEmprestimoComponent;
  let fixture: ComponentFixture<DashboardEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardEmprestimoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
