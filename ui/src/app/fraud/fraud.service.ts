// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface SingleFraudResult {
//   fraud: boolean;
//   fraud_probability: number;
// }

// export interface CsvFraudResult {
//   total_records: number;
//   fraud_count: number;
//   results: any[];
// }

// @Injectable({ providedIn: 'root' })
// export class FraudService {

//   private apiUrl = 'https://localhost:7285/api/fraud';

//   constructor(private http: HttpClient) {}

//   // SINGLE TRANSACTION
//   predictSingle(features: number[]): Observable<SingleFraudResult> {
//     return this.http.post<SingleFraudResult>(
//       `${this.apiUrl}/predict`,
//       features
//     );
//   }

//   // CSV UPLOAD
//   predictCsv(file: File): Observable<CsvFraudResult> {
//     const formData = new FormData();
//     formData.append('file', file);

//     return this.http.post<CsvFraudResult>(
//       `${this.apiUrl}/predict-csv`,
//       formData
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SingleFraudResult {
  fraud: boolean;
  fraud_probability: number;
}

export interface CsvFraudResult {
  total_records: number;
  fraud_count: number;
  results: any[];
}

@Injectable({ providedIn: 'root' })
export class FraudService {

  private apiUrl = 'https://localhost:7285/api/fraud';

  constructor(private http: HttpClient) {}

  predictSingle(features: number[]): Observable<SingleFraudResult> {
    return this.http.post<SingleFraudResult>(
      `${this.apiUrl}/predict`,
      features
    );
  }

  predictCsv(file: File): Observable<CsvFraudResult> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<CsvFraudResult>(
      `${this.apiUrl}/predict-csv`,
      formData
    );
  }
}
