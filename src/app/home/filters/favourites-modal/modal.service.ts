import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class ModalService {
  private isOpenModal: boolean = false;

  constructor() {}

  getIsOpenModal() {
    return this.isOpenModal;
  }

  openModal() {
    this.isOpenModal = true;
  }

  closeModal() {
    this.isOpenModal = false;
  }
}
