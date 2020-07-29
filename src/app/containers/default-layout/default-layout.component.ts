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
   user:any;
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
    this.blockUI.start('Loading...'); 
   user = await JSON.parse(localStorage.getItem('currentUser'));
    var temp=<Object>user;
    this.user=user;
    this.navItems.length=1;
  await  this.service.getList().then((res) => {
      for (let key in res) {
        if ((';'+res[key].Group+';').includes(';'+temp["Group"]+';') && res[key].Status==1)
       navItems.push(
         {
          name: res[key].Name,
          url: res[key].Url,
          table: res[key].Table,
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
  $.fn.dataTable.ext.classes.sLengthSelect = 'custom-select w-auto d-inline-block';
  $.fn.dataTable.ext.classes.sPageButtonActive = 'btn btn-outline-secondary';
  this.blockUI.stop();
  }
  logout()
  {
      this.authservice.logout();
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }

}
