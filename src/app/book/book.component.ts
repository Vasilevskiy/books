import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BooksService} from '../services/books.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  public choosenCountry: Country;
  public choosenCity: City;
  public choosenCompany: Company;
  public cities: City[] = [];
  public availableCities: City[] = [];
  public companies: Company[] = [];
  public availableCompanies: Company[] = [];
  public formats = [];
  public availableFormats = [];
  public bookForm: FormGroup;
  public selectedId: number;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private books: BooksService,
              private http: HttpService
  ) {
    this.bookForm = new FormGroup({
      'author': new FormControl('', Validators.required),
      'title': new FormControl('', Validators.required),
      'isbn': new FormControl('', Validators.required),
      'pages': new FormControl(0, Validators.required),
      'description': new FormControl('', Validators.required),
      'formatId': new FormControl(0, Validators.required),
      'price': new FormControl(0, Validators.required),
      'companyId': new FormControl(0, Validators.required),
      'cityId': new FormControl(0, Validators.required),
      'countryId': new FormControl(0, Validators.required),
    });
    this.selectedId = this.activeRoute.snapshot.params['id'];
    this.countries = this.activeRoute.snapshot.data.countries;
    this.cities = this.activeRoute.snapshot.data.cities;
    this.companies = this.activeRoute.snapshot.data.companies;
    this.formats = this.activeRoute.snapshot.data.formats;
  }

  setCountry() {
    this.countries = this.countries.filter(value => {
      if (+this.selectedBook.countryId === value.id) {
        return value;
      }
    });
    this.bookForm.get('countryId').setValue(this.countries[0].name);

  }

  changeCountry(countryId) {
    if (this.selectedId === undefined) {
      this.countries.filter((country: Country) => {
        if (country.id === +countryId) {
          console.log(typeof +countryId)
          this.choosenCountry = country;
          console.log(this.choosenCountry);
        }
      });
      this.availableCities = this.cities.filter(city => {
        if (city.countryId === this.choosenCountry.id) {
          return city;
        }
      });
      console.log(this.availableCities);
      console.log(this.availableCompanies);
    }
  }

  setCity() {
    this.cities.filter(value => {
      if (+this.selectedBook.cityId === value.id) {
        this.availableCities.push(value);
        this.bookForm.get('cityId').setValue(value.name);
      }
    });
  }

  changeCity(cityId) {
    if (this.selectedId === undefined) {
      console.log(cityId);
      this.availableCities.map((city: City) => {
        if (city.id === +cityId) {
          this.choosenCity = city;
          console.log(this.choosenCity);
        }
      });
      this.availableCompanies = this.companies.filter(company => {
        if (company.cityId === this.choosenCity.id) {
          return company;
        }
      });
      console.log(this.availableCompanies);
    }
  }

  setCompany() {
    this.companies.map(value => {
      if (+this.selectedBook.companyId === value.id) {
        this.availableCompanies.push(value);
        this.bookForm.get('companyId').setValue(value.name);
        return;
      }
    });
  }

  changeCompany(companyId) {
    if (this.selectedId === undefined) {
      this.companies.map(company => {
        if (company.id === companyId.id) {
          this.choosenCompany = company;
        }
      });
    }
  }

  setFormat() {
    this.formats = this.formats.filter(value => {
      if (+this.selectedBook.formatId === value.id) {
        this.bookForm.get('formatId').setValue(value.name);
        return value;
      }
    });
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
      });
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }

  formSubmit() {
    this.books.pushNewBook(this.bookForm.getRawValue()).subscribe(success => {
      this.router.navigate(['/']);
    });
  }

}
