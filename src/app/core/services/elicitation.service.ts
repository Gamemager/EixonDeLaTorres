import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import {
  ApiResponse,
  CreateElicitationDto,
  ElicitationCreatedResponse,
  ElicitationDetail,
  ElicitationSummary,
} from '../models/elicitation.model';
 
@Injectable({ providedIn: 'root' })
export class ElicitationService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/elicitation`;
 
  // ── POST /elicitation ────────────────────────────────────────
  submit(dto: CreateElicitationDto): Observable<ElicitationCreatedResponse> {
    return this.http
      .post<ApiResponse<ElicitationCreatedResponse>>(this.base, dto)
      .pipe(
        map(res => {
          if (!res.success || !res.data) throw new Error(res.error ?? 'Error al enviar');
          return res.data;
        }),
        catchError(this.handleError),
      );
  }
 
  // ── GET /elicitation ─────────────────────────────────────────
  getAll(): Observable<ElicitationSummary[]> {
    return this.http
      .get<ApiResponse<ElicitationSummary[]>>(this.base)
      .pipe(
        map(res => res.data ?? []),
        catchError(this.handleError),
      );
  }
 
  // ── GET /elicitation/:id ─────────────────────────────────────
  getOne(id: number): Observable<ElicitationDetail> {
    return this.http
      .get<ApiResponse<ElicitationDetail>>(`${this.base}/${id}`)
      .pipe(
        map(res => {
          if (!res.success || !res.data) throw new Error(res.error ?? 'No encontrado');
          return res.data;
        }),
        catchError(this.handleError),
      );
  }
 
  // ── Manejo de errores HTTP ────────────────────────────────────
  private handleError(error: HttpErrorResponse): Observable<never> {
    let message = 'Error de conexión con el servidor.';
 
    if (error.status === 0) {
      message = 'No se pudo conectar con el servidor. Verifica tu conexión.';
    } else if (error.status === 400) {
      const body = error.error as ApiResponse<null>;
      message = body?.errors?.join(', ') ?? body?.error ?? 'Datos inválidos.';
    } else if (error.status === 404) {
      message = 'El recurso solicitado no existe.';
    } else if (error.status >= 500) {
      message = 'Error interno del servidor. Intenta más tarde.';
    }
 
    return throwError(() => new Error(message));
  }
}