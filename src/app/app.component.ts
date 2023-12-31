import { Component, HostListener, Renderer2 } from '@angular/core';
import { StorageService } from '@pq/shared/services/storage.service';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import { LoadingService } from '@pq/shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // Todo remove on first prod release
  @HostListener('document:keydown', ['$event']) handleKeyDown(
    event: KeyboardEvent
  ) {
    if (event.key === 'Dead') {
      event.preventDefault();
      document.querySelector('html')?.getAttribute('data-bs-theme') === 'dark'
        ? this.changeTheme('light')
        : this.changeTheme('dark');
    }
  }

  title = 'punq';

  constructor(
    private renderer: Renderer2,
    private readonly _storageService: StorageService,
    private readonly _loadingService: LoadingService
  ) {}

  ngOnInit() {
    const theme = this._storageService.getItem('theme') || 'dark';
    this.changeTheme(theme);
  }

  private changeTheme(theme: string) {
    // Get the <html> element
    const htmlElement = document.querySelector('html');

    // Set the data-bs-theme attribute to the new theme value
    this.renderer.setAttribute(htmlElement, 'data-bs-theme', theme);

    this._storageService.setItem('theme', theme);
  }

  get errorState$() {
    return this._loadingService.errorState$;
  }

  get isLoading$() {
    return this._loadingService.isLoading$;
  }

  //
}
