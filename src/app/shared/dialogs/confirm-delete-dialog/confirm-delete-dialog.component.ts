import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';

@Component({
  selector: 'confirm-delete-dialog',
  standalone: true,
  templateUrl: './confirm-delete-dialog.html',
  styleUrls: ['./confirm-delete-dialog.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
  ]
})
export class ConfirmDeleteDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { nome?: string }
  ) {}

  cancelar(): void {
    this.dialogRef.close(false);
  }

  confirmar(): void {
    this.dialogRef.close(true);
  }
}
