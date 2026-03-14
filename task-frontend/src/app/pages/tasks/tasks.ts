import { DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../../models/task';
import { TasksService } from '../../services/tasks';

@Component({
  selector: 'app-tasks',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss'
})
export class Tasks implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly tasksService = inject(TasksService);

  protected readonly tasks = signal<Task[]>([]);
  protected readonly loading = signal(true);
  protected readonly submitting = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  protected readonly taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.maxLength(120)]],
    description: ['', [Validators.maxLength(500)]],
    status: ['pending' as const, [Validators.required]]
  });

  ngOnInit(): void {
    this.loadTasks();
  }

  protected submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    const { title, description, status } = this.taskForm.getRawValue();

    this.tasksService.createTask({
      title: title.trim(),
      description: description.trim() || undefined,
      status
    }).subscribe({
      next: ({ message }) => {
        this.successMessage.set(message);
        this.taskForm.reset({
          title: '',
          description: '',
          status: 'pending'
        });
        this.loadTasks();
      },
      error: (error) => {
        const errors = error?.error?.errors;
        if (errors && typeof errors === 'object') {
          const flattened = Object.values(errors).flat().join(' ');
          this.errorMessage.set(flattened || 'Task could not be created.');
        } else {
          this.errorMessage.set('Task could not be created.');
        }
        this.submitting.set(false);
      }
    });
  }

  protected trackByTaskId(_: number, task: Task): string {
    return task.id;
  }

  private loadTasks(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.tasksService.getTasks().subscribe({
      next: ({ data }) => {
        this.tasks.set(data);
        this.loading.set(false);
        this.submitting.set(false);
      },
      error: () => {
        this.errorMessage.set('Could not load tasks. Check that the Rails API is running on port 3000.');
        this.loading.set(false);
        this.submitting.set(false);
      }
    });
  }
}
