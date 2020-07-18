import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from "../../auth/auth.service";
import { AngularFireDatabase } from '@angular/fire/database';
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit,OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  user : any;
  len : number= 0;
  constructor(  private authservice : AuthService,@Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  async ngOnInit()
  {
    this.user = await JSON.parse(localStorage.getItem('currentUser'));
  var temp=<Object>this.user;
  var count=Object.keys(temp).length;
  this.len=0;
  this.len=10-count;  
  }
  logout()
  {
      this.authservice.logout();
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
