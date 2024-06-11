import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-scream',
  templateUrl: './loading-scream.component.html'
})
export class LoadingScreamComponent {
  @Input() isLoading: boolean | undefined;
}
