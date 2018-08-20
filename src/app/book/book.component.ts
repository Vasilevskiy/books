import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterState, RouterStateSnapshot} from '@angular/router';
import {BooksService} from '../services/books.service';
import {FormControl, FormGroup} from '@angular/forms';
import {HttpService} from '../services/http.service';
import {City} from '../interfaces/city';
import {Country} from '../interfaces/country';
import {Company} from '../interfaces/company';

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

  public selectedBook: Book;
  public countries: Country[] = [];
  public cities: City[] = [];
  public companies: Company[] = [];
  public formats = [];
  public bookForm: FormGroup;
  public selectedId: number;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private books: BooksService,
              private http: HttpService
  ) {
    this.bookForm = new FormGroup({
      'author': new FormControl(''),
      'title': new FormControl(''),
      'isbn': new FormControl(''),
      'pages': new FormControl(''),
      'description': new FormControl(''),
      'format': new FormControl(''),
      'price': new FormControl(''),
      'company': new FormControl(''),
      'city': new FormControl(''),
      'country': new FormControl(''),
    });
    this.selectedId = this.activeRoute.snapshot.params['id'];
    this.countries = this.activeRoute.snapshot.data.countries;
    this.cities = this.activeRoute.snapshot.data.cities;
    this.companies = this.activeRoute.snapshot.data.companies;
    this.formats = this.activeRoute.snapshot.data.formats;
  }

  setCountry() {
    const country = this.countries.filter( value => {
      if (this.selectedBook.countryId === value.id) {
        return value;
      }
    });
    this.bookForm.get('country').setValue(country[0].name);
  }

  setCity() {
    const city = this.cities.filter( value => {
      if (this.selectedBook.cityId === value.id) {
        return value;
      }
    });
    this.bookForm.get('city').setValue(city[0].name);
  }

  setCompany() {
    const company = this.companies.filter( value => {
      if (this.selectedBook.companyId === value.id) {
        return value;
      }
    });
    this.bookForm.get('company').setValue(company[0].name);
  }

  setFormat() {
    const format = this.formats.filter( value => {
      if (this.selectedBook.formatId === value.id) {
        console.log(value);
        return value;
      }
    });
    console.log(this.formats);
    this.bookForm.get('format').setValue(format[0].name);
  }
  ngOnInit() {
    if (this.selectedId !== undefined) {
      this.books.getBook(this.selectedId).subscribe((res: any) => {
        this.selectedBook = res;
        this.bookForm.patchValue(this.selectedBook);
        this.setCountry();
        this.setCity();
        this.setCompany();
        this.setFormat();
        console.log(this.bookForm.getRawValue());
      });
    } else {
      this.http.getCountries().subscribe( (items: Array<any>) => {
        this.countries = items;
        this.bookForm.get('country').setValue(this.countries[this.countries.length - 1].id);
      });

      this.http.getCities().subscribe( (items: Array<any>) => {
        const countryId = this.bookForm.getRawValue().country;
          items.filter(item => {
            if (item.countryId === countryId) {
              this.cities.push(item);
            }
        });
      });
    }
  }

  formSubmit() {
    console.log(this.bookForm.getRawValue());
  }

}
