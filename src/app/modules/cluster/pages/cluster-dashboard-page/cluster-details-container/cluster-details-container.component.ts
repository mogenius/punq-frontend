import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'pq-cluster-details-container',
  templateUrl: './cluster-details-container.component.html',
  styleUrls: ['./cluster-details-container.component.scss'],
})
export class ClusterDetailsContainerComponent implements OnInit {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.generateContainerHeight();
  }
  @ViewChild('container') container: ElementRef;

  private _sideBarWidthPx: number = 325;

  ngOnInit(): void {
    this.generateContainerHeight();
  }

  public resizeSidebar(event: MouseEvent): void {
    event.preventDefault();

    let clientXStart = event.clientX;

    // WHILE RESIZING
    const resizing = (event: MouseEvent) => {
      this._sideBarWidthPx =
        this._sideBarWidthPx + (event.clientX - clientXStart);
      clientXStart = event.clientX;
    };

    // WHEN END RESIZING
    const resizingEnd = (event: MouseEvent) => {
      document.removeEventListener('mousemove', resizing, false);
      document.removeEventListener('mouseup', resizingEnd, false);
    };

    document.addEventListener('mousemove', resizing, false);
    document.addEventListener('mouseup', resizingEnd, false);
  }

  private generateContainerHeight(): void {
    if (!this.container) {
      setTimeout(() => this.generateContainerHeight(), 10);
      return;
    }

    this.container.nativeElement.style.height = `${
      window.innerHeight - this.container.nativeElement.offsetTop - 24
    }px`;
  }

  get sideBarWidthPx(): number {
    return this._sideBarWidthPx;
  }
}
