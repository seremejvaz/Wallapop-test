import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-favourites-modal",
  templateUrl: "./favourites-modal.component.html",
  styleUrls: ["./favourites-modal.component.scss"]
})
export class FavouritesModalComponent implements OnInit {
  @Input() products: [];
  @Output() favourited = new EventEmitter<boolean>();

  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnInit(): void {}

  deleteFavourite(id) {
    this.favourited.emit(id);
  }
}
