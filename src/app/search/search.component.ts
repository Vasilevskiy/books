import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent implements OnInit {

  public formats = [];
  public searchForm: FormGroup;

  constructor(private activeRoute: ActivatedRoute) {
    this.formats = this.activeRoute.snapshot.data.formats;
  }

  ngOnInit() {
  }

}
