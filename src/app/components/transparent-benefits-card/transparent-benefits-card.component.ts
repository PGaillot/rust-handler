import { Component, Input } from "@angular/core";

@Component({
    selector:'transparent-benefits-card',
    standalone:true,
    templateUrl:'./transparent-benefits-card.component.html',
    styleUrls:['./transparent-benefits-card.component.scss']
})

export class TransparentBenefitCardComponent{

    @Input() title!:string;
    @Input() description!:string;
    @Input() imgUrl!:string;

}