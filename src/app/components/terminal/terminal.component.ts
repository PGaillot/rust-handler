import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'terminal',
  standalone: true,
  imports: [],
  styleUrl: './terminal.component.scss',
  template: `

      <div id="terminal">
      <div id="terminal-header">
        <p>old fashion way</p>

        <div class="ter-header-act-btn-wrapper">
          <span
            class="ter-header-act-btn"
            [style]="{ background: '#ff5420' }"
          ></span>
          <span
            class="ter-header-act-btn"
            [style]="{ background: '#ffb120' }"
          ></span>
          <span
            class="ter-header-act-btn"
            [style]="{ background: '#65cf57' }"
          ></span>
        </div>
      </div>

      <div id="terminal-content">
        <section id="updater">
          <div id="progress"></div>
        </section>

        <div id="terminal-line-content">
          @for(log of displayingLog; track log){
          <span class="code-line">
            <p class="sever-name">user&#64;rustServer:</p>
            <p class="code-txt">{{ log }}</p>
          </span>
          }
        </div>
      </div>
    </div>
    
  `,
})
export class TerminalComponent implements OnInit {
  @Input() logs: string[] = []
  displayingLog: string[] = []

  ngOnInit(): void {


    let i: number = 0


    
    const interval = setInterval(() => {
      this.displayingLog = [...this.displayingLog, this.logs[i]]
      console.log(i)
      if (i + 1 === this.logs.length) {
        clearInterval(interval)
      } else {
        i += 1
      }
    }, 500)
    
  }
}
