import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FraudService } from './fraud.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';

@Component({
  selector: 'app-fraud',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent],
  templateUrl: './fraud.component.html'
})
export class FraudComponent {

  featureInput = '';
  selectedFile: File | null = null;

  singleResult: any = null;
  csvResult: any = null;

  singleLoading = false;
  csvLoading = false;

  constructor(
    private fraudService: FraudService,
    private cdr: ChangeDetectorRef
  ) {}

  // SINGLE
  predictSingle() {
    const features = this.featureInput
      .split(',')
      .map(v => Number(v.trim()))
      .filter(v => !isNaN(v));

    if (features.length !== 7) return;

    this.singleLoading = true;
    this.singleResult = null;

    this.fraudService.predictSingle(features).subscribe({
      next: res => {
        this.singleResult = res;
        this.singleLoading = false;
        this.cdr.detectChanges(); // ✅ FIX
      },
      error: () => {
        this.singleLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // FILE
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  // CSV
  predictCsv() {
    if (!this.selectedFile) return;

    this.csvLoading = true;
    this.csvResult = null;

    this.fraudService.predictCsv(this.selectedFile).subscribe({
      next: res => {
        this.csvResult = res;
        this.csvLoading = false;
        this.cdr.detectChanges(); // ✅ FIX
      },
      error: () => {
        this.csvLoading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
