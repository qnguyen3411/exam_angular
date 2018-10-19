import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  petToShow = {};
  alreadyLiked = false;
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit() {
    this._route.params.subscribe((params: Params) => {
      if (params['id']) {
        this._httpService.getOne(params['id']).subscribe(response => {
          if (response['status'] === "error") { return; }
          this.petToShow = response['data']
        })
      }
    });
  }

  adoptPet() {
    const id = this.petToShow['_id'];
    this._httpService.deleteOne(id).subscribe(response => {
      console.log(response)
      if (response['status'] === "error") { return; }
      this._router.navigate(['/pets'])
    })
  }

  likePet() {
    const id = this.petToShow['_id'];
    const incQuery = { $inc: { likes: 1 } };
    this._httpService.updateOne(id, incQuery).subscribe(response => {
      if (response['status'] === "error") { return; }
      this.petToShow = response['data']
      this.alreadyLiked = true;
    })
  }

 
}
