import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { forkJoin } from 'rxjs';

import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { DashboardService } from '@features/dashboard/dashboard.service';
import { PessoaDto, DashboardTotaisDto } from '@models/dashboard.model'; 

import { MemberFormDialogComponent } from '@shared/dialogs/member-dialog/member-form-dialog.component';
import { ConfirmDeleteDialogComponent } from '@shared/dialogs/confirm-delete-dialog/confirm-delete-dialog.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDialogModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  form: FormGroup;
  colunasTabelaPessoas: string[] = ['nome', 'email', 'sexo', 'status', 'acoes'];
  pessoasDataSource: MatTableDataSource<PessoaDto> = new MatTableDataSource<PessoaDto>();
  dashboardData?: DashboardTotaisDto;
  readonly dialog = inject(MatDialog);
  nenhumResultado = false;

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardService
  ) {
    this.form = this.fb.group({
      search: [''],
    });
  }

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  private carregarDadosIniciais(): void {
    forkJoin({
      dashboard: this.dashboardService.GetTotaisDashboard(),
      pessoas: this.dashboardService.GetPessoas(),
    }).subscribe({
      next: ({ dashboard, pessoas }) => {
        this.dashboardData = dashboard;
        this.pessoasDataSource.data = pessoas;
      },
      error: (err) => console.error('Erro ao buscar dados iniciais', err),
    });
  }

    buscarPessoa(): void {
      const search = this.form.get('search')?.value || '';
      this.dashboardService.GetPessoas(search).subscribe({
        next: (data) => {
          this.pessoasDataSource.data = data;
          this.nenhumResultado = data.length === 0;
        },
        error: (err) => {
          console.error('Erro ao buscar pessoas:', err);
          this.pessoasDataSource.data = [];
          this.nenhumResultado = true;     
        },        
      });
    }

  abrirDialogAdicionar(): void {
    const dialogRef = this.dialog.open(MemberFormDialogComponent, {
      width: '500px',
      data: { modoEdicao: false, pessoa: null }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.dashboardService.PostPessoa(res).subscribe({
          next: () => this.carregarDadosIniciais(),
          error: err => console.error('Erro ao adicionar membro', err)
        });
      }
    });
  }

  abrirDialogEditar(pessoa: PessoaDto): void {
    const dialogRef = this.dialog.open(MemberFormDialogComponent, {
      width: '500px',
      data: { modoEdicao: true, pessoa }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res && pessoa.codigo != null) {
        this.dashboardService.PutPessoa(pessoa.codigo, res).subscribe({
          next: () => this.carregarDadosIniciais(),
          error: err => console.error('Erro ao atualizar membro', err)
        });
      }
    });

  }

  abrirDialogExcluir(pessoa: PessoaDto): void {
    const dialogRef = this.dialog.open(ConfirmDeleteDialogComponent, {
      width: '500px',
      data: { nome: pessoa.nome }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res && pessoa.codigo != null) {
        this.dashboardService.DeletePessoa(pessoa.codigo).subscribe({
          next: () => this.carregarDadosIniciais(),
          error: err => console.error('Erro ao deletar membro', err)
        });
      }
    });
  }

  converterStatus(value: number): string {
    if (value === 0) return 'Membro';
    if (value === 1) return 'Visitante';
    return '-';
  }

  converterSexo(value: number): string {
    if (value === 0) return 'Masculino';
    if (value === 1) return 'Feminino';
    return '-';
  }
}


