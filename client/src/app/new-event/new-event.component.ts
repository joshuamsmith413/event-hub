import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  newEventData = {}

  constructor(private _eventService: EventService,
              private _router: Router) { }

  ngOnInit() {
  }

  addEvent() {
    this._eventService.addEvent(this.newEventData)
    .subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/events']);
      },
      err => console.log(err)
    );
  }

}
