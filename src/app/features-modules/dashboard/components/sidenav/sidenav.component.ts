import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  opened: boolean = false;
  public menuItems: Menu[]=[];
  constructor(private $menuService: MenuService) { }

  ngOnInit(): void {
    this.loadMenu();
  }
  loadMenu(){
    this.$menuService.getSideNavMenuOptions().subscribe((options) => {
      this.menuItems = options
    })
  }
}
