import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SearchComponent } from './search/search.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { BookComponent } from './book/book.component';
import {CompaniesResolver} from './resolvers/companies.resolver';
import {FormatsResolver} from './resolvers/formats.resolver';
import {CountriesResolver} from './resolvers/countries.resolver';
import {CitiesResolver} from './resolvers/cities.resolver';

const routes: Routes = [
  { path: 'showcase', component: ShowcaseComponent },
  { path: 'book/new', component: BookComponent,
    resolve: {
      companies: CompaniesResolver,
      cities: CitiesResolver,
      countries: CountriesResolver,
      formats: FormatsResolver}
  },
  { path: 'book/:id', component: BookComponent,
    resolve: {
      companies: CompaniesResolver,
      cities: CitiesResolver,
      countries: CountriesResolver,
      formats: FormatsResolver}
    },
  { path: 'search', component: SearchComponent },
  { path: '**', redirectTo: '/showcase', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CompaniesResolver, CitiesResolver, CountriesResolver, FormatsResolver]
})
export class AppRoutingModule  { }
