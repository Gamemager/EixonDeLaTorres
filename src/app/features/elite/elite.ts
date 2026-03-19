import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule, FormBuilder, FormGroup,
  FormArray, Validators, AbstractControl,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
 
import { ElicitationService } from '../../core/services/elicitation.service';
import {
  CreateElicitationDto,
  MoscowPriority,
  ElicitationActor,
} from '../../core/models/elicitation.model';
 
// ── Tipos internos del componente ─────────────────────────────────
 
interface MoscowOption {
  value: MoscowPriority;
  label: string;
  tag:   string;
  desc:  string;
}
 
interface StepMeta {
  num:   string;
  label: string;
  hint:  string;
}
 
@Component({
  selector: 'app-elite',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS,
    useValue: { showError: true, displayDefaultIndicatorType: false },
  }],
  templateUrl: './elite.html',
  styleUrl: './elite.css',
})
export class EliteComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
 
  // ── Estado ───────────────────────────────────────────
  isSubmitting = false;
  submitted    = false;
  submittedId  = 0;
  submitError  = '';
 
  // ── FormGroups ───────────────────────────────────────
  ctxForm!:  FormGroup;
  strForm!:  FormGroup;
  actForm!:  FormGroup;
  funcForm!: FormGroup;
  rnfForm!:  FormGroup;
  priForm!:  FormGroup;
 
  // ── Opciones MoSCoW ──────────────────────────────────
  readonly moscowOptions: MoscowOption[] = [
    { value: MoscowPriority.MUST_HAVE,   label: 'Must',   tag: 'Obligatorio', desc: 'No negociable'  },
    { value: MoscowPriority.SHOULD_HAVE, label: 'Should', tag: 'Importante',  desc: 'Alta prioridad' },
    { value: MoscowPriority.COULD_HAVE,  label: 'Could',  tag: 'Deseable',    desc: 'Si hay tiempo'  },
    { value: MoscowPriority.WONT_HAVE,   label: "Won't",  tag: 'Excluido',    desc: 'Próxima fase'   },
  ];
 
  constructor(
    private fb:      FormBuilder,
    private svc:     ElicitationService,
    private snack:   MatSnackBar,
  ) {}
 
  ngOnInit(): void {
    this.buildForms();
  }
 
  // ── Construcción de formularios ──────────────────────
 
  private buildForms(): void {
    this.ctxForm = this.fb.group({
      project_name:      ['', Validators.required],
      stakeholder_name:  ['', Validators.required],
      stakeholder_email: ['', Validators.email],
      elicitation_date:  ['', Validators.required],
    });
 
    this.strForm = this.fb.group({
      business_objective: ['', Validators.required],
      problem_to_solve:   ['', Validators.required],
      project_scope:      ['', Validators.required],
      out_of_scope:       [''],
    });
 
    this.actForm = this.fb.group({
      actors: this.fb.array([this.newActorGroup()]),
    });
 
    this.funcForm = this.fb.group({
      user_story:     ['', Validators.required],
      business_rules: [''],
      preconditions:  [''],
      postconditions: [''],
    });
 
    this.rnfForm = this.fb.group({
      rnf_performance: [''],
      rnf_security:    [''],
      rnf_usability:   [''],
    });
 
    this.priForm = this.fb.group({
      moscow_priority: [MoscowPriority.MUST_HAVE, Validators.required],
      dependencies:    [''],
    });
  }
 
  // ── FormArray de actores ─────────────────────────────
 
  get actors(): FormArray {
    return this.actForm.get('actors') as FormArray;
  }
 
  private newActorGroup(): FormGroup {
    return this.fb.group({
      actor_type:  ['primary'],
      actor_name:  [''],
      permissions: [''],
    });
  }
 
  addActor():             void { this.actors.push(this.newActorGroup()); }
  removeActor(i: number): void { this.actors.removeAt(i); }
 
  // ── MoSCoW ───────────────────────────────────────────
 
  setMoscow(value: MoscowPriority): void {
    this.priForm.patchValue({ moscow_priority: value });
  }
 
  getMoscowLabel(value: string): string {
    const opt = this.moscowOptions.find(o => o.value === value);
    return opt ? `${opt.label} — ${opt.tag}` : value;
  }
 
  // ── Getters para el preview ──────────────────────────
 
  get actorsHaveData(): boolean {
    return this.actors.controls.some(c => c.get('actor_name')?.value);
  }
 
  get rnfHasData(): boolean {
    const v = this.rnfForm.value;
    return !!(v.rnf_performance || v.rnf_security || v.rnf_usability);
  }
 
  get completedSteps(): number {
    let n = 0;
    if (this.ctxForm.valid)                         n++;
    if (this.strForm.valid)                         n++;
    if (this.actors.length > 0)                     n++;
    if (this.funcForm.valid)                        n++;
    if (this.rnfHasData)                            n++;
    if (this.priForm.get('moscow_priority')?.value) n++;
    return n;
  }
 
  get progressPercent(): number {
    return Math.round((this.completedSteps / 6) * 100);
  }
 
  // ── Envío ────────────────────────────────────────────
 
  submit(): void {
    // Validar pasos obligatorios
    if (this.ctxForm.invalid || this.strForm.invalid || this.funcForm.invalid) {
      this.submitError = 'Completa todos los campos obligatorios antes de enviar.';
      return;
    }
 
    this.isSubmitting = true;
    this.submitError  = '';
 
    const dto: CreateElicitationDto = {
      context:    this.ctxForm.value,
      strategic:  this.strForm.value,
      actors:     this.actForm.value.actors as ElicitationActor[],
      functional: this.funcForm.value,
      quality:    this.rnfForm.value,
      priority:   this.priForm.value,
    };
 
    this.svc.submit(dto).subscribe({
      next: (res) => {
        this.isSubmitting = false;
        this.submittedId  = res.id;
        this.submitted    = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err: Error) => {
        this.isSubmitting = false;
        this.submitError  = err.message;
        this.snack.open(err.message, 'Cerrar', {
          duration: 6000,
          panelClass: ['snack-error'],
        });
      },
    });
  }
 
  // ── Reset ────────────────────────────────────────────
 
  resetForm(): void {
    this.submitted   = false;
    this.submittedId = 0;
    this.submitError = '';
    this.buildForms();
    // El stepper se resetea solo al destruirse y recrearse el *ngIf
  }
}