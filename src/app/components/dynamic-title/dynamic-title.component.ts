import { NgClass } from '@angular/common'
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
  input,
} from '@angular/core'

@Component({
  selector: 'dynamic-title',
  standalone: true,
  imports: [NgClass],
  styleUrl: './dynamic-title.component.scss',
  template: `
    <div #titleCont id="title-container">
      @for(char of charArray; track char ; let i = $index){ @if(char !== ' '){
      <div class="char-container">
        <div class="char-wrapper" [ngClass]="'cw-' + i">
          <h1>{{ char }}</h1>
          <h1>{{ char }}</h1>
        </div>
        <h1 class="hidden-char" [ngClass]="i.toString()">{{ char }}</h1>
      </div>
      } @else {
      <span style="width: 1rem; height:1rem;"></span>
      } }
    </div>
  `,
})
export class DynamicTitleComponent implements OnInit, AfterViewInit {
  @Input() title!: string
  charArray: string[] = []

  @ViewChild('titleCont', { static: true }) titleContRef!: ElementRef
  randomInterval: number = 0

  constructor(private renderer: Renderer2) {}

  animRandomChar() {
    const index: number = this.randomIntFromInterval(0,this.charArray.length + 1)
    let randAnimDuration:number = this.randomIntFromInterval(1200, 2000);
    
    const charElement = this.titleContRef.nativeElement.querySelector('.cw-' + index)
    if (charElement) {
      const charHeight = charElement.offsetHeight / 2;
      const transition = `bottom ${randAnimDuration}ms ease-in-out`;

      this.renderer.setStyle(charElement, 'transition', transition)
      this.renderer.setStyle(charElement, 'bottom', `-${charHeight}px`)

      setTimeout(() => {
        this.renderer.setStyle(charElement, 'transition', 'none')
        this.renderer.setStyle(charElement, 'bottom', 0)
      }, randAnimDuration)
    }
  }

  randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  ngOnInit(): void {
    let wordsArray = this.title.split(' ')
    let wa: string[] = []
    wordsArray.forEach((w: string, index) => {
      if (index !== wordsArray.length - 1) {
        wa = [...wa, w, ' ']
      } else {
        wa = [...wa, w]
      }
    })
    wordsArray = wa
    wordsArray.forEach((w) => {
      this.charArray = [...this.charArray, ...w.split('')]
    })
  }

  playAnim(){
    setTimeout(() => {
      this.randomInterval = this.randomIntFromInterval(1000, 5000)
      this.animRandomChar();
      this.playAnim();
    }, this.randomInterval)
  }
  
  ngAfterViewInit(): void {
    this.randomInterval = this.randomIntFromInterval(1000, 5000)
    this.playAnim();
  }
}
