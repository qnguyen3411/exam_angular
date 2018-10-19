import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  likeUsed = false;
  constructor(private _http: HttpClient){}

  getAll() {
    return this._http.get('/api/pets');
  }

  post(data) {
    return this._http.post('/api/pets', data);
  }

  getOne(id) {
    return this._http.get('/api/pets/' + id);
  }

  updateOne(id, data) {
    return this._http.put('/api/pets/' + id, data);
  }

  deleteOne(id) {
    return this._http.delete('/api/pets/' + id);
  }
}
