
import { Directive, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
    selector: '[appHideHeader]'
})
export class HideHeaderDirective implements OnInit {

    @Input('header') header: any;

    private lastY = 0;

    constructor(
        private renderer: Renderer2,
        private domCtrl: DomController
    ) { }

    ngOnInit(): void {
        this.header = this.header.el;
        this.domCtrl.write(() => {
            this.renderer.setStyle(this.header, 'transition', '700ms linear;');
        });
    }

    @HostListener('ionScroll', ['$event']) onContentScroll($event: any) {
        if ($event.detail.scrollTop > 300 ) {
            this.domCtrl.write(() => {
              // this.renderer.setStyle(this.header, 'margin-top', `-${ this.header.clientHeight }px`);
              this.renderer.setStyle(this.header, 'opacity', '1');
              this.renderer.setStyle(this.header, 'display', 'block');

            });
        } else {
            this.domCtrl.write(() => {
              this.renderer.setStyle(this.header, 'opacity', '0');
              this.renderer.setStyle(this.header, 'display', 'none');
              // this.renderer.setStyle(this.header, 'display', 'none');
            });
        }

        this.lastY = $event.detail.scrollTop;
    }

}