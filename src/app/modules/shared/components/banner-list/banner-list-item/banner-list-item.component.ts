import { Component, Input, OnInit } from '@angular/core';
import { BannerStateEnum } from '@pq/core/banner-state.enum';

@Component({
  selector: 'pq-banner-list-item',
  templateUrl: './banner-list-item.component.html',
  styleUrls: ['./banner-list-item.component.scss'],
})
export class BannerListItemComponent implements OnInit {
  @Input() public content: string;
  @Input() public state: BannerStateEnum;
  @Input() public duration: BannerStateEnum;

  constructor() {}

  ngOnInit(): void {}
}
