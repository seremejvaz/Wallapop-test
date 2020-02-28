import { Component, OnInit } from "@angular/core";
import { ModalService } from "./modal.service";

@Component({
  selector: "app-favourites-modal",
  templateUrl: "./favourites-modal.component.html",
  styleUrls: ["./favourites-modal.component.scss"]
})
export class FavouritesModalComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnInit(): void {}
}
