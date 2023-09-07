import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'pq-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() color: string = '#000';
  constructor() {}

  ngOnInit(): void {}
}
