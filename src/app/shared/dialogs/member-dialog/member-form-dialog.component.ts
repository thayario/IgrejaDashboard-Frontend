import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

import { PessoaDto } from '@models/dashboard.model';


@Component({
  selector: 'member-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  templateUrl: './member-form-dialog.component.html',
  styleUrls: ['./member-form-dialog.scss']
})
export class MemberFormDialogComponent {
  formPessoa!: FormGroup;
  pessoa: PessoaDto = { codigo: null, nome: '', email: '', sexo: null, status: null}
  modoEdicao = false;

  genders = [
    { label: 'Masculino', value: 0 },
    { label: 'Feminino', value: 1 }
  ];

  status = [
    { label: 'Membro', value: 0 },
    { label: 'Visitante', value: 1 }
  ];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<MemberFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { modoEdicao: boolean; pessoa: PessoaDto | null}
  ) {

    this.modoEdicao = data.modoEdicao;
  }

  ngOnInit(): void {
    this.formPessoa = this.fb.group({
      codigo: [this.data.pessoa?.codigo ?? null],
      nome: [this.data.pessoa?.nome || '', Validators.required],
      email: [this.data.pessoa?.email || '', [Validators.required, Validators.email]],
      sexo: [
        this.data.pessoa?.sexo != null ? Number(this.data.pessoa.sexo) : null,
        Validators.required
      ],
      status: [
        this.data.pessoa?.status != null ? Number(this.data.pessoa.status) : null,
        Validators.required
      ],
    });
  }

  confirmar(): void {
    if (this.formPessoa.valid) {
      this.dialogRef.close(this.formPessoa.value);
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}