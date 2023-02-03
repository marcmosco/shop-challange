import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginator implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = 'Prima pagina';
  itemsPerPageLabel = 'Prodotti per pagina:';
  lastPageLabel = 'Ultima pagina';

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Prossima pagina';
  previousPageLabel = 'Pagina precedente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return `Pagina 1 di 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Pagina ${page + 1} di ${amountPages}`;
  }
}
