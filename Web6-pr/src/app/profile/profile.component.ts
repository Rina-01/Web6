import { Component, OnInit } from '@angular/core';
import { DadataConfig, DadataType } from '@kolkov/ngx-dadata';
import { User, Users } from '../User';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {

  constructor() { }
  ngOnInit(): void {
  }

  public users: User[] = [];
  selectedUser?: User;
  
  onSelect(users: User): void {
    this.selectedUser = users;
  }

  configAddress: DadataConfig = {
    apiKey: 'a405054f1e92d116b9bbcb1e0cdf5af1c344bd52',
    type: DadataType.address
  }
  configFio: DadataConfig = {
    apiKey: 'a405054f1e92d116b9bbcb1e0cdf5af1c344bd52',
    type: DadataType.fio
  }

  private usersLoaded: number = 0; 
  private loadUsersOnStart: number = 15;
  private scrollGap: number = 100;

  ngAfterViewInit(): void {
    document.addEventListener("scroll", () => {
      this.onScroll();
    });
    for (let i = 0; i < this.loadUsersOnStart; i++) {
       this.loadNewData();
    }
  }    

  public onScroll() {
    if (this.isCameraTouchesBottom()) {
      this.loadNewData();
    }
  }

  private isCameraTouchesBottom(): boolean {
    return (document.body.offsetHeight + document.body.offsetTop <= window.scrollY + window.innerHeight + this.scrollGap);
  }

  public loadNewData(): void {
    if (this.usersLoaded >= Users.length) return;
    this.users = [...this.users, Users[this.usersLoaded]]
    this.usersLoaded++;
  }
  
  public updateUserFio(event: any): void {
    this.users[this.selectedUser.id-1].name = event.target.value;
    event.target.value = '';
  }

  public updateUserAddress(event: any): void {
    this.users[this.selectedUser.id-1].address = event.target.value;
    event.target.value = '';
  }

}
