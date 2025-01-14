import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getData(table_name: string): Observable<any> {
    const url = `http://127.0.0.1:5000/get_data/${table_name}`;
    return this.http.get<any>(url);
  }

  getTables(): Observable<string[]> {
    const url = 'http://localhost:5000/get_tables';

    return this.http.get<string[]>(url);
  }

  filter(table_name: string, columns: string[]): Observable<any> {
    const url = 'http://localhost:5000/filter_features';
    const regex = /bearing_\d+/; // Match 'bearing_' followed by one or more digits
    let test_table_name = table_name.match(regex)?.[0]; // Extract the first match
    test_table_name += '_test';
    const body = { test_table_name: test_table_name, table_name: table_name, columns: columns };
    return this.http.post(url, body);
}

  trainAndPredict(train_table_name: string, test_table_name: string): Observable<any> {
    const url = 'http://localhost:5000/train_and_predict';
    const body = { train_table_name: train_table_name, test_table_name: test_table_name };
    return this.http.post(url, body);
  }
}
