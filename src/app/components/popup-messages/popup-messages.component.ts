import { Component, OnInit } from '@angular/core';
import { PopupMessagesService } from '../../services/popup-messages.service';

@Component({
  selector: 'app-popup-messages',
  templateUrl: './popup-messages.component.html',
  styleUrls: ['./popup-messages.component.css']
})
export class PopupMessagesComponent implements OnInit {


  constructor(public popupMessagesService: PopupMessagesService) { }

  ngOnInit() {
  }
}
