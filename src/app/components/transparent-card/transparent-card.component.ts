import { Component, Input } from '@angular/core'
import { LinkElementComponent } from '../link-element/link-ekement.component'

@Component({
  selector: 'transparent-card',
  standalone: true,
  styleUrl: './transparent-card.component.scss',
  imports: [LinkElementComponent],
  template: `
    <div id="transparent-card">
      <div id="transparent-card-container">
        @if(imgSrc){

        <div id="card-img-wrapper">
          <img [src]="imgSrc" />
        </div>
        }

        <h4>{{ title }}</h4>
        <p>{{ content }}</p>

        @if(link){
        <link-element [label]="link[0]" [ref]="link[1]"></link-element>
        }
      </div>
    </div>
  `,
})
export class TransparentCardComponent {
  @Input() title!: string
  @Input() content!: string
  @Input() imgSrc: string | undefined
  @Input() link: string[] | undefined
}
