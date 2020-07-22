import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { AuthService } from "../../auth/auth.service";
import { MenusService } from '../../services/menus.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
export let  user: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit,OnDestroy {
  @BlockUI() blockUI: NgBlockUI;
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public Nav_loading:boolean=false;
  len : number= 0;
  constructor (  private authservice : AuthService,private service: MenusService,@Inject(DOCUMENT) _document?: any) {
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
   user = await JSON.parse(localStorage.getItem('currentUser'));
    var temp=<Object>user;
    this.service.getList().then((res) => {
      for (let key in res) {
        if ((';'+res[key].Group+';').includes(';'+temp["Group"]+';'))
       navItems.push(
         {
          name: res[key].Name,
          url: res[key].Url,
          icon: 'fa '+res[key].Icon,
          color: res[key].Color
         }
       )
      }
      this.Nav_loading=true;  
    }).catch(()=>
    {
      this.Nav_loading=true;  
    });
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
