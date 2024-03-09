import { NgStyle } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector:'fadeIn-img',
    standalone:true,
    imports:[NgStyle],
    styleUrl:'./fadeIn-img.component.scss',
    template:`
    <img [src]="src" [ngStyle]="{'opacity': opacity}" />
    `
})

export class FadeInImgComponent implements OnInit{
    @Input() src!:string;
    @Input() delay:number = 100;

    opacity:number = 0;
    
    ngOnInit(): void {

        setTimeout(() => {
            this.opacity = 1;
        }, this.delay)
    }

}