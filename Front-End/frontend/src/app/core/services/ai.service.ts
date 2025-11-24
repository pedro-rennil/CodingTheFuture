import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Task } from '../models/task.model';
import { mockTasks, mockDocumentContent } from '../data/mock-data';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  constructor() { }

  analyzeDocument(file: File): Observable<{ tasks: Task[], content: string }> {
    // Simulate API call
    return of({ tasks: mockTasks, content: mockDocumentContent }).pipe(
      delay(2000)
    );
  }
}
