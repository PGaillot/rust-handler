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
    opacity:number = 0;
    
    ngOnInit(): void {

        setTimeout(() => {
            this.opacity = 1;
        }, 100)
    }

}