import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEmprestimoComponent } from './select-emprestimo.component';

describe('SelectEmprestimoComponent', () => {
  let component: SelectEmprestimoComponent;
  let fixture: ComponentFixture<SelectEmprestimoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectEmprestimoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEmprestimoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
