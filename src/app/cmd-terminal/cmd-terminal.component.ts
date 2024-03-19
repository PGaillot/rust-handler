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
          @for (message of messages; track message) {
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
    - ls
    | la commande de navigation visualiser le contenu  
    | d'un dossier.
  
    - cd
    | la commande de navigation sert à se deplacer de dossier 
    | en dossier sur votre server. la commande [ cd ]

  `

  txtContent: string = ''
  location: string[] = []
  messages: string[] = []
  serverName: string = 'user@server:'
  serverNamePath:string = this.serverName + this.location.toLocaleString();
  triggerWords: string[] = ['rust', 'help', 'mgb', 'ls', 'cd']

  rootDir: string[] = ['user', 'home']

  onEnterKeyPressed(event: Event) {
    const message: string = this.cmdInputRef.nativeElement.value.replace(
      /\n/g,
      '',
    )
    // si le message est vide, on ne fait rien.
    console.log(message.toString())

    if (!message || message === '' || message === 'undefined') return

    const messageArray: string[] = message.split(' ')
    this.messages = [...this.messages, this.serverNamePath + message]
    if (this.triggerWords.includes(messageArray[0])) {
      this.cmdInputRef.nativeElement.disabled = true
      setTimeout(() => {
        switch (messageArray[0]) {
          case 'help':
            this.messages = [
              ...this.messages,
              this.serverNamePath + this.helpMessage,
            ]
            break

          case 'rust':
            this.messages = [...this.messages, 'rust message']
            break

          case 'mgb':
            this.messages = [
              ...this.messages,
              this.serverNamePath + this.mgbMessage,
            ]
            break

          case 'ls':
            this.messages = [...this.messages, this.lsCommand()]
            break

          case 'cd':
            this.messages = [...this.messages, `${this.cdCommand(messageArray[1])}`]
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
    this.cmdInputRef.nativeElement.value = ''
  }

  /**
   * LS
   */
  lsCommand(): string {
    if (this.location.length > 1) {
      return 'ne fonctionne pas encore !'
    } else {
      let dir: string = ''
      this.rootDir.forEach((d: string) => {
        dir += d + '     '
      })
      return dir
    }
  }

  cdCommand(path: string){
    console.log(path)

    if (this.rootDir.includes(path)) {
      switch (path) {
        case 'home':
          this.location = [...this.location, 'home']
          break

        case 'user':
          this.location = [...this.location, 'user']
          break
      }
    }

    console.log(this.location);
    
  }
}
