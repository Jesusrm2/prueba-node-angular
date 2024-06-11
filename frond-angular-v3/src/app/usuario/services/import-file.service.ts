import { HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, catchError, filter, map, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environment';
import { IImportFile } from '../interfaces/import-file';


@Injectable({
  providedIn: 'root'
})
export class ImportFileService {

  constructor(private http: HttpClient) { }

  uploadUsers(fileUsers: File): Observable<IImportFile> {
    const formData: FormData = new FormData();
    formData.append('file', fileUsers, fileUsers.name);
    return this.http.post<IImportFile>(`${environment.urlApi}upload`, formData)
      .pipe(
        map(response => response),
        catchError(error => { throw error; })
      );
  }

}
