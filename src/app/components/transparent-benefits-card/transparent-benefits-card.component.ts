import { NgStyle } from '@angular/common'
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core'

export interface TransparentBenefitCardComponentData {
  title: string
  description: string
  imgUrl: string
  top: string | null
  right: string | null
  bottom: string | null
  left: string | null
}

@Component({
  selector: 'transparent-benefits-card',
  standalone: true,
  imports: [NgStyle],
  styleUrls: ['./transparent-benefits-card.component.scss'],
  template: `
    <div
      class="transparent-benefits-card-container"
      [ngStyle]="{ top: top, right: right, bottom: bottom, left: left }"
    >
      <div class="transparent-container">
        <img
          class="transparent-container-img"
          [src]="imgUrl"
          alt=""
          srcset=""
        />
        <div class="transparent-container-title">{{ title }}</div>
        <div>{{ description }}</div>
      </div>
    </div>
  `,
})
export class TransparentBenefitCardComponent {
  @Input() title!: string
  @Input() description!: string
  @Input() imgUrl!: string

  @Input() top: string | null = null
  @Input() right: string | null = null
  @Input() bottom: string | null = null
  @Input() left: string | null = null

//   @HostListener('mouseenter', ['$event'])
//   onMouseEnter(event: MouseEvent) {
//     const element = event.target as HTMLElement
//     const container = element.getElementsByClassName(
//       'transparent-container',
//     )[0] as HTMLElement
//     const reflect = document.createElement('div') as HTMLElement;
//     reflect.classList.add('reflect-card');
//     container.appendChild(reflect)
//   }
}
