import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  config = {
    userDetails: ''
  }

  constructor() { }
}
