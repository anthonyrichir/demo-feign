import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IConsumer } from 'app/shared/model/consumerApi/consumer.model';

@Component({
    selector: 'jhi-consumer-detail',
    templateUrl: './consumer-detail.component.html'
})
export class ConsumerDetailComponent implements OnInit {
    consumer: IConsumer;

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.data.subscribe(({ consumer }) => {
            this.consumer = consumer.body ? consumer.body : consumer;
        });
    }

    previousState() {
        window.history.back();
    }
}
