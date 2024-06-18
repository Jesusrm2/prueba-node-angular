import { Component, ElementRef } from '@angular/core';
import { LayoutService } from '../../services/app.layout.service';

@Component({
  selector: 'app-slider-bar',
  templateUrl: './slider-bar.component.html'
})
export class SliderBarComponent {
  constructor(public layoutService: LayoutService, public el: ElementRef) { }
}
