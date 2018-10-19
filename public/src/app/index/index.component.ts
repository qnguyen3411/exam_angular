import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  pets = [];

  constructor(
    private _router: Router,
    private _httpService: HttpService
    ) { }

  ngOnInit() {
    this.fetchPets();
  }

  fetchPets() {
    this._httpService.getAll().subscribe(response => {
      if (response['status'] === 'error') {
        console.log("OH NO");
        return;
      }
      this.pets = (response['data'] as Array<Object>)
        .sort((petA, petB) => {
          return (petA['type'] > petB['type']) ? 1 : -1;
        })
    }) 
  }
  
}
