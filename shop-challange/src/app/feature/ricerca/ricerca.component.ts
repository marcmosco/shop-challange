import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from '../../core/service/search.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.scss'],
})
export class RicercaComponent implements OnInit {
  sub: Subscription;
  objectList: any[];
  formGroup: FormGroup;
  hide = false;
  displayedColumns = ['postId', 'id', 'name', 'email'];
  dataSource: any[];
  page = 0;
  pageSize = 10;
  bbo: boolean;
  lengthResult: number;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.email]),
      name: new FormControl(''),
      postId: new FormControl(''),
      id: new FormControl(''),
    });
  }

  clean() {
    this.formGroup.reset();
    this.hide = false;
  }

  submit(newSearch: boolean) {
    this.hide = true;
    if (newSearch) {
      this.reset();
    }
    this.searchService
      .getFiltered(this.formGroup.value, this.page + 1, this.pageSize)
      .subscribe((res) => {
        this.dataSource = res.data;
        this.lengthResult = res.size;
      });
  }

  reset() {
    this.page = 0;
    this.pageSize = 10;
  }

  onPageChange(event: PageEvent) {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.submit(false);
  }
}
