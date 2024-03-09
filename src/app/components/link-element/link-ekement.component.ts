import { Component, Input } from '@angular/core'

@Component({
  selector: 'link-element',
  standalone: true,
  styleUrl: './link-ekement.component.scss',
  template: `
    <div id="link-element">
      <div class="link-wrapper">
        <div id="arrow">
          <div class="part bot"></div>
          <div class="part top"></div>
          <div class="part center"></div>
        </div>

        <a [href]="ref" target="_blank" rel="noopener noreferrer">
          {{ label }}
        </a>
      </div>
    </div>
  `,
})
export class LinkElementComponent {
  @Input() ref!: string;
  @Input() label!: string;
}
