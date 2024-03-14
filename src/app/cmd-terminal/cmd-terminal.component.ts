import { Component, ElementRef, ViewChild } from '@angular/core'

@Component({
  selector: 'cmd-terminal',
  standalone: true,
  imports: [],
  styleUrl: './cmd-terminal.component.scss',
  template: `
    <div id="cmd-terminal">
      <div #cmdContent id="cmd-teminal-content">
        <span>
          @for (message of messages.reverse(); track message) {
          <p>{{ message }}</p>
          }
        </span>
      </div>
      <div id="cmd-teminal-bottom">
        <p id="server-name">{{ serverName }}</p>
        <textarea
          #cmdInput
          type="text"
          autofocus
          rows="1"
          cols="1"
          spellcheck="false"
          wrap="off"
          (keyup.enter)="onEnterKeyPressed($event)"
        ></textarea>
      </div>
    </div>
  `,
})
export class CmdTerminalComponent {
  @ViewChild('cmdInput', { static: true }) cmdInputRef!: ElementRef
  @ViewChild('cmdContent', { static: true }) cmdContentRef!: ElementRef

  mgbMessage: string = `


        ███╗   ███╗ ██████╗ ██████╗ 
        ████╗ ████║██╔════╝ ██╔══██╗
        ██╔████╔██║██║  ███╗██████╔╝
        ██║╚██╔╝██║██║   ██║██╔══██╗
        ██║ ╚═╝ ██║╚██████╔╝██████╔╝
        ╚═╝     ╚═╝ ╚═════╝ ╚═════╝ 


        - Gloire aux Mangeboules. -

  `

  helpMessage: string = `


    ░█░█░█▀▀░█░░░█▀█
    ░█▀█░█▀▀░█░░░█▀▀
    ░▀░▀░▀▀▀░▀▀▀░▀░░
        
    -------------------
    NAVIGATION
    - cd
    | la commande de navigation sert à se deplacer de dossier 
    | en dossier sur votre server. la commande [ cd ]
  
  `

  txtContent: string = ''
  messages: string[] = []
  serverName: string = 'user@server:'
  triggerWords: string[] = ['rust', 'help', 'mgb']

  onEnterKeyPressed(event: Event) {
    const message: string = this.cmdInputRef.nativeElement.value.replace(
      /\n/g,
      '',
    )
    // si le message est vide, on ne fait rien.
    console.log(message.toString())

    if (!message || message === '' || message === 'undefined') return

    const messageArray: string[] = message.split(' ')
    this.messages = [...this.messages, this.serverName + message]
    if (this.triggerWords.includes(messageArray[0])) {
      this.cmdInputRef.nativeElement.disabled = true
      setTimeout(() => {
        switch (messageArray[0]) {

          case 'help':
            this.messages = [
              ...this.messages,
              this.serverName + this.helpMessage,
            ]
            break

          case 'rust':
            this.messages = [...this.messages, 'rust message']
            break

          case 'mgb':
            this.messages = [
              ...this.messages,
              this.serverName + this.mgbMessage,
            ]
            break

          default:
            this.messages = [...this.messages, 'default message']
            break
        }
        this.cmdInputRef.nativeElement.disabled = false
        this.cmdInputRef.nativeElement.focus()
      }, 500)
    }

    // Final
    console.log(this.messages)
    this.cmdInputRef.nativeElement.value = '';
  }
}
