import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const headerContainer = document.querySelector('.header-container');

        if (event.url === '/chamados/create') {
          this.renderer.setStyle(headerContainer, 'width', '157%');
        } else {
          this.renderer.setStyle(headerContainer, 'width', '94%'); 
        }
      }
    });
  }

}
