import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  hide: false;

  displayedColumns: string[] = ['postId', 'name', 'Id', 'Email'];
  dataSource = 
  constructor() {
  }

  ngOnInit(): void {
  }

}
