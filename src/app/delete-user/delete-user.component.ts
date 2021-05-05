import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../user/user';
import { UserService } from '../user/user.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngbd-modal-content',
  template: `
      <div class="modal-header text-align">
        <h4 class="modal-title" id="exampleModalLongTitle">Confirm deletion of {{ user.name }} ?</h4>
      </div>
      <div class="modal-footer d-flex justify-content-around">
        <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="activeModal.close('Close click')">Cancel</button> -->
        <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="closeModal()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="delete(user)" data-dismiss="modal">Confirm</button>
      </div>
  `
})
export class NgbdModalContent {
  @Input() user:User;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UserService
    ) {}

  /* ########################## 
  #### SUPPR USER ##########*/
  delete(user: User): void {
    console.log(user.name)
		this.userService.deleteUser(user)
			.subscribe(_ => {
        this.userService.showSuccess(`Utilisateur ${user.name} supprimé !`);
      });
      this.activeModal.close(true)
	}

  closeModal() {
    this.activeModal.close(false)
  }
}



/* #############################################
################ MODAL COMPONENT ###############
###############################################*/ 
@Component({
  selector: 'ngbd-modal-component',
  template: `
      <button type="button" class="btn btn-danger" (click)="open()">
        <i class="fa fa-trash fa-lg"></i>          
      </button>
    `
})

export class NgbdModalComponent implements OnInit{
  @Input() user:User;
  @Output() notifyParent = new EventEmitter<boolean>();

  constructor(private userService: UserService, private modalService: NgbModal, ) {}

  ngOnInit() : void {
    this.userService.currentUser = this.user;
    console.log("ok");
  }

  open() {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.user= this.user;
    modalRef.result
    .then((ifReload) => {
        this.notifyParent.emit(ifReload);
        console.log("fermeture"); 
    });
  }
}