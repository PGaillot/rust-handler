import { Component, Input, OnInit } from '@angular/core'

@Component({
  selector: 'terminal',
  standalone: true,
  imports: [],
  styleUrl: './terminal.component.scss',
  template: `
    <div id="terminal">
      <section id="updater">
        <div id="progress"></div>
      </section>

      @for(log of displayingLog; track log){
      <span class="code-line">
        <p class="sever-name">user&#64;rustServer:</p>
        <p class="code-txt">{{ log }}</p>
      </span>
      }
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
