import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ImgBBUploadService {
  private readonly apiKey: string = '1975df687d24ced8cf9805976c3cc75e';

  constructor(private readonly httpCient: HttpClient) {}

  upload(file: File): Observable<string> {
    const fd = new FormData();

    fd.append('image', file);

    return this.httpCient
      .post('/upload', fd, { params: { key: this.apiKey } })
      .pipe(map((response: any) => response['data']['url']));
  }
}
