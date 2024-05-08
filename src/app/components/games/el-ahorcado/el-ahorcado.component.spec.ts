import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElAhorcadoComponent } from './el-ahorcado.component';

describe('ElAhorcadoComponent', () => {
  let component: ElAhorcadoComponent;
  let fixture: ComponentFixture<ElAhorcadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElAhorcadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElAhorcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
