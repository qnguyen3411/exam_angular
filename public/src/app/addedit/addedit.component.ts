import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {
  petToEdit = {};

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
        if (params['id']) {
          this._httpService.getOne(params['id']).subscribe(response => {
            if (response['status'] === "error") { return; }
            this.petToEdit = response['data']
            console.log(this.petToEdit);
          })
        }
    });
  }

  onFormSubmit() {
    console.log("YEYYYYYYYYYYYYY")
    const id = this.petToEdit['_id'];
    if (id) { 
      // If we're updating
      this._router.navigate(['/pets/' + id])
    } else {
      this._router.navigate(['/pets'])
    }
  }
}
