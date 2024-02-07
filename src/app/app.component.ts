import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TransparentBenefitCardComponent } from './components/transparent-benefits-card/transparent-benefits-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransparentBenefitCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rust-handler';
}
