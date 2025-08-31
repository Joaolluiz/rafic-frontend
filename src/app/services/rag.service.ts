import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RagService {
  private apiUrl = 'http://127.0.0.1:8000'; // ajuste para sua API

  constructor(private http: HttpClient) {}

  uploadFile(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/upload/file`, formData);
  }

  sendMessage(question: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/rag/query`, { question });
  }
}
