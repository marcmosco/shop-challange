import {AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef,} from '@angular/core';
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {ThemePalette} from '@angular/material/core';
import {OverlayConfig, OverlayRef} from '@angular/cdk/overlay';
import {OverlayService} from '../service/overlay.service';

@Component({
	selector: 'app-content-loader',
	templateUrl: './content-loader.component.html',
	styleUrls: ['./content-loader.component.scss'],
})
export class ContentLoaderComponent implements OnInit, AfterViewInit {
	color: ThemePalette = 'primary';
	mode: ProgressSpinnerMode = 'indeterminate';
	value = 50;

	@Input() diameter?: number = 100;

	@Input() strokeWidth?: number;

	_displayProgressSpinner: boolean;
	@Input()
	set displayProgressSpinner(value: boolean) {
		this._displayProgressSpinner = value;
		this.triggerSpinner();
	}

	@ViewChild('progressSpinnerRef') private progressSpinnerRef: TemplateRef<any>;

	private conf: OverlayConfig;
	private overlayRef: OverlayRef;

	constructor(private vcRef: ViewContainerRef, private overlayService: OverlayService) {}

	ngOnInit() {
		// Config for Overlay Service
		this.conf = {
			hasBackdrop: true,
			positionStrategy: this.overlayService.positionGloballyCenter(),
		};

		// Create Overlay for progress spinner
		this.overlayRef = this.overlayService.createOverlay(this.conf);
	}

	ngAfterViewInit(): void {
		this.triggerSpinner();
	}

	triggerSpinner() {
		// Based on status of displayProgressSpinner attach/detach overlay to progress spinner template
		if (!this.progressSpinnerRef) {
			return;
		}
		if (this._displayProgressSpinner && !this.overlayRef.hasAttached()) {
			this.overlayService.attachTemplatePortal(
				this.overlayRef,
				this.progressSpinnerRef,
				this.vcRef,
			);
		} else if (!this._displayProgressSpinner && this.overlayRef.hasAttached()) {
			this.overlayRef.detach();
		}
	}
}
