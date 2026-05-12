import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = environment.baseUrl + 'Api/v1/users';

  getUsers(): Observable<any> {

    return this.http.get(this.apiUrl);

  }

}
