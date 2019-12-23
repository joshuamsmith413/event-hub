import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-new',
  templateUrl: './event-new.component.html',
  styleUrls: ['./event-new.component.scss']
})
export class EventNewComponent implements OnInit {

  newEventData = {}

  constructor(private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
  }

  addEvent() {
    this._eventService.createEvent(this.newEventData)
    .subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/events']);
      },
      err => console.log(err)
    );
  }

}
