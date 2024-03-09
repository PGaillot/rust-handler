import { NgClass, NgStyle } from '@angular/common'
import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'dynamic-arrow',
  standalone: true,
  imports: [NgStyle, NgClass],
  styleUrl: './dynamic-arrow.component.scss',
  template: `
    <div id="dynamic-arrow">
      <div
        id="arrow"
        [ngClass]="rightToLeft ? 'rightToLeft' : 'leftToRight'"
        [ngStyle]="{ width: arrowWidth + 'rem', opacity: opacity }"
      >
        <div class="part bot"></div>
        <div class="part top"></div>
        <div class="part center" [ngStyle]="{ width: width + 'rem' }"></div>
      </div>
    </div>
  `,
})
export class DynamicArrowComponent implements OnInit {
  @Input() width!: number
  arrowWidth: number = 1
  opacity: number = 0
  @Input() rightToLeft: boolean = false

  ngOnInit(): void {
    setTimeout(() => {
      this.opacity = 1
    }, 50)

    setTimeout(() => {
      this.arrowWidth = this.width
    }, 100)
  }
}
