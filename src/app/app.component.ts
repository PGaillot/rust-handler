import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TransparentBenefitCardComponent } from './components/transparent-benefits-card/transparent-benefits-card.component'
import { TerminalComponent } from './components/terminal/terminal.component'
import {
  BreakpointObserver,
  Breakpoints,
  LayoutModule,
} from '@angular/cdk/layout'
import { Subscription } from 'rxjs'
import { NgClass } from '@angular/common'
import { FadeInImgComponent } from './components/fadeIn-img/fadeIn-img.component'
import { LinkElementComponent } from './components/link-element/link-ekement.component'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TransparentBenefitCardComponent, TerminalComponent, NgClass, FadeInImgComponent, LinkElementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rust-handler'
  subscriptions: Subscription[] = []
  mouseX = 0
  mouseY = 0

  smallScreen: boolean = false;
  xSmallScreen:boolean = false;

  benefitCards: TransparentBenefitCardComponent[] = [
    {
      title: 'Advanced custom',
      description:
        'Have full control over server configuration, crafting a unique gaming experience.',
      imgUrl: 'https://files.facepunch.com/rust/item/axe.salvaged_512.png',
      top: '-2rem',
      right: null,
      bottom: null,
      left: '-2rem',
      position: 'relative',
      // onMouseEnter: (event) => {},
    },
    {
      title: 'Automatic and reliable backups',
      description:
        'Ensure data safety with automated backups and optional FTP/SFTP transfer',
      imgUrl: 'https://files.facepunch.com/rust/item/icepick.salvaged_512.png',
      top: '-2rem',
      right: '-2rem',
      bottom: null,
      left: null,
      position: 'absolute',
      // onMouseEnter: (event) => {},
    },
    {
      title: 'Enhanced security',
      description:
        'Protect your server from potential errors with built-in security measures.',
      imgUrl: 'https://files.facepunch.com/rust/item/grenade.beancan_512.png',
      top: null,
      right: null,
      bottom: '-6rem',
      left: '30%',
      position: 'absolute',
      // onMouseEnter: (event) => {},
    },
  ]

  logs: string[] = [
    '--rust-handler/server-update',
    '--rust-handler/oxide-update --lastest',
    '--rust-server/server_conf.ini',
    '--server: --restart',
  ]

  @ViewChild('blurGradient', { static: true }) blurGradientRef!: ElementRef
  // @HostListener('document:mousemove', ['$event'])
  // onMouseMove(event: MouseEvent) {
  //   const pageWidth = document.documentElement.clientWidth
  //   const pageHeight = document.documentElement.clientHeight
  //   this.mouseX = event.clientX
  //   this.mouseY = event.clientY
  //   const leftPosition: string = `${(this.mouseX * 100) / pageWidth}%`
  //   const topPosition: string = `${(this.mouseY * 100) / pageHeight}%`
  //   console.log(leftPosition)
  //   this.blurGradientRef.nativeElement.style.left = leftPosition // Changer la valeur selon vos besoins
  //   this.blurGradientRef.nativeElement.style.top = topPosition // Changer la valeur selon vos besoins
  // }

  constructor(private observer: BreakpointObserver) {}

  ngOnInit(): void {
    this.blurGradientRef.nativeElement.style.left = '50%' // Changer la valeur selon vos besoins
    this.blurGradientRef.nativeElement.style.top = '50%' // Changer la valeur selon vos besoins

    this.subscriptions = [
      ...this.subscriptions,
      this.observer
        .observe(Breakpoints.Small)
        .subscribe((res) => {this.smallScreen = res.matches;
        }),
      this.observer
        .observe(Breakpoints.XSmall)
        .subscribe((res) => {this.xSmallScreen = res.matches;
        }),
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => sub.unsubscribe())
  }
}
