import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  modalRef: BsModalRef;
  user : User = new User();
  users : any;
  editUser : any;
  id = {id:''};
  errorMessage : ErrorMessage = new ErrorMessage();
  
  constructor(private modalService: BsModalService, private userService : UserService) { }

  ngOnInit() {
    this.getUser();
  }

  getUser(){
    this.userService.get().subscribe(res=>{
      this.users = res;
      console.log("Users ",this.users);
    },error=>{
      console.log("Error",error);
    });
  }

  onSave(){
    this.errorMessage.name = this.errorMessage.address = '';
    !this.user.name?this.errorMessage.name='Name Required':'';
    !this.user.address?this.errorMessage.address='Address Required':'';
    if(!this.user.name || !this.user.address){
      return;
    }

    this.userService.post(this.user).subscribe(res =>{
      this.getUser();
      this.modalRef.hide();
      console.log("Result",res);
    },error=>{
      console.log("Error",error);
    });

  }

  onUpdate(){
    this.userService.update(this.editUser).subscribe(res=>{
      this.getUser();
      this.modalRef.hide();
      console.log("Result ",res);
    },error=>{
      console.log("Error",error);
    })
  }

  onDelete(){
    this.userService.delete(this.id).subscribe(res=>{
      this.getUser();
      this.modalRef.hide();
      console.log("Result ",res);
    },error=>{
      console.log("Error",error);
    })
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalEdit(template: TemplateRef<any>, user) {
    this.modalRef = this.modalService.show(template);
    this.editUser = user;
  }
  openModalDelete(template: TemplateRef<any>, id) {
    this.id.id = id;
    this.modalRef = this.modalService.show(template);
  }
}

class User{
  name:String;
  address:String;
}

class ErrorMessage{
  name:String;
  address:String;
}