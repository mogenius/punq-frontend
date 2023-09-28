import { HttpEventType } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
} from '@angular/core';
import { ContextService } from '@pq/context/services/context.service';
import { BannerStateEnum } from '@pq/core/banner-state.enum';
import { BaseSubscription } from '@pq/core/base-subscription';
import { BannerService } from '@pq/shared/services/banner.service';
import { BehaviorSubject, debounceTime, filter, tap } from 'rxjs';

@Component({
  selector: 'pq-config-upload-dropzone',
  templateUrl: './config-upload-dropzone.component.html',
  styleUrls: ['./config-upload-dropzone.component.scss'],
})
export class ConfigUploadDropzoneComponent
  extends BaseSubscription
  implements OnInit
{
  @Output() clusterList: EventEmitter<any[]> = new EventEmitter<any[]>();

  @HostListener('dragover', ['$event'])
  onDragEnter(event: Event) {
    event.preventDefault();
    this._dropOverSubject.next(true);
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    this._isDraggedOver = false;
    event.preventDefault();

    this._isDraggedOver = false;

    const files = event.dataTransfer?.files;
    if (!files) return;

    if (files.length > 1) {
      this.uploadFailed();
      this._bannerService.addBanner(
        BannerStateEnum.error,
        'Only one file can be uploaded at a time.',
        5000
      );
      return;
    }

    if (files[0].type !== 'application/x-yaml') {
      this.uploadFailed();
      this._bannerService.addBanner(
        BannerStateEnum.error,
        'Only yaml files are supported',
        5000
      );
      return;
    }

    if (files && files.length > 0) {
      this.uploadFiles(files[0]);
    }
  }

  private _dropOverSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  private _isDraggedFail: boolean = false;

  private _loading: boolean = false;

  constructor(
    private readonly _bannerService: BannerService,
    private readonly _contextService: ContextService
  ) {
    super();
  }

  private _isDraggedOver: boolean = false;

  ngOnInit(): void {
    this._subscriptions.add(
      this._dropOverSubject
        .pipe(
          filter((isDraggedOver) => isDraggedOver),
          tap(() => {
            this._isDraggedOver = true;
          }),
          debounceTime(50)
        )
        .subscribe(() => {
          this._isDraggedOver = false;
        })
    );
  }

  private uploadFailed() {
    this._isDraggedFail = true;
    setTimeout(() => {
      this._isDraggedFail = false;
    }, 500);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      this.uploadFiles(input.files[0]);
    }
  }

  private uploadFiles(file: File) {
    // Here, you can handle the file upload process, e.g., sending the files to a server.
    this._contextService.uploadConfig(file).subscribe({
      next: (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          console.log(Math.round(100 * (event.loaded / (event.total ?? 1))));
        } else if (event.type == HttpEventType.Response) {
          this.clusterList.emit(event.body);
          console.log(event.body);
        }
      },
      complete: () => {
        console.log('complete');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  get isDraggedOver(): boolean {
    return this._isDraggedOver;
  }

  get isDraggedFail(): boolean {
    return this._isDraggedFail;
  }
}
