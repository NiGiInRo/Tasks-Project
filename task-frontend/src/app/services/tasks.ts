import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { TaskFormPayload, TaskResponse, TasksResponse } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/tasks';

  getTasks(): Observable<TasksResponse> {
    return this.http.get<TasksResponse>(this.apiUrl);
  }

  createTask(task: TaskFormPayload): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, { task });
  }
}