import { NgClass } from '@angular/common'
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  input,
} from '@angular/core'

@Component({
  selector: 'dynamic-title',
  standalone: true,
  imports: [NgClass],
  styleUrl: './dynamic-title.component.scss',
  template: `
    <div id="title-container">
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
export class DynamicTitleComponent implements OnInit, AfterViewInit{
    @Input() title!: string
    charArray: String[] = []
    
    @HostListener('document:mouseover', ['$event'])
    mouseover(event: any) {
        if (event.target.matches('.hidden-char')) {
            const charIndex: number = event.target.classList[1]
            
            const element: any = document.getElementsByClassName('cw-' + charIndex)[0]
            const charHeight: number = event.target.clientHeight
            
            element.style.transition = 'bottom 0.8s linear'
            element.style.bottom = `-${charHeight}px`
            
            setTimeout(() => {
                element.style.transition = 'none';
                element.style.bottom = 0;
                
            }, 1000)
        }
    }
    
    randomIntFromInterval(min:number, max:number) {
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
    
    
    ngAfterViewInit(): void {
        
        // const interval = setInterval(() => {
        //     const randomIndex:number = this.randomIntFromInterval(0, this.charArray.length);    
        // }, 1000)
    }
    
    
    
}
