import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BooksService} from '../services/books.service';
import {FormControl, FormControlName, FormGroup, Validators} from '@angular/forms';
import {HttpService} from '../services/http.service';

interface Book {
  author: string;
  cityId: number;
  companyId: number;
  countryId: number;
  description: string;
  formatId: number;
  id: number;
  isbn: string;
  pages: number;
  price: number;
  title: string;
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

  public id: string;
  public selectedBook: Book;
  public countries: any;
  public cities: any;
  public companies: any;
  public bookForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private books: BooksService,
              private http: HttpService
  ) {
    this.bookForm = new FormGroup({
      'author': new FormControl(''),
      'title': new FormControl(''),
      'isbn': new FormControl(''),
      'pages': new FormControl(''),
      'description': new FormControl(''),
      'price': new FormControl(''),
      'company': new FormControl(''),
      'city': new FormControl(''),
      'country': new FormControl(''),
    });
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.books.getBook(this.id).subscribe((res: any) => {
      this.selectedBook = res;
      this.bookForm.patchValue(this.selectedBook);
      console.log(this.selectedBook);
    });
    this.http.getCountries().subscribe(res => {
      this.countries = res;
      console.log(this.countries)
      const country = this.countries.find( item => item.id === this.selectedBook.countryId );
      console.log(country);
      this.bookForm.controls['country'].setValue(country, {onlySelf: true});
    });

    this.http.getCities().subscribe(res => {
      this.cities = res;
      console.log(this.cities);
      const city = this.cities.find( item => item.id === this.selectedBook.cityId );
      console.log(city);
      this.bookForm.controls['city'].setValue(city, {onlySelf: true});
    });

    this.http.getCompanies().subscribe(res => {
      this.companies = res;
      console.log(this.companies);
    });

  }

  filterItems(arr, id) {
    
  }

  formSubmit() {
    console.log(this.bookForm.getRawValue());
  }

}
