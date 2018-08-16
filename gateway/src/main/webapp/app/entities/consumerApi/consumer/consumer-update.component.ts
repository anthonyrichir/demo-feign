import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { IConsumer } from 'app/shared/model/consumerApi/consumer.model';
import { ConsumerService } from './consumer.service';

@Component({
    selector: 'jhi-consumer-update',
    templateUrl: './consumer-update.component.html'
})
export class ConsumerUpdateComponent implements OnInit {
    private _consumer: IConsumer;
    isSaving: boolean;

    constructor(private consumerService: ConsumerService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.route.data.subscribe(({ consumer }) => {
            this.consumer = consumer.body ? consumer.body : consumer;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.consumer.id !== undefined) {
            this.subscribeToSaveResponse(this.consumerService.update(this.consumer));
        } else {
            this.subscribeToSaveResponse(this.consumerService.create(this.consumer));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IConsumer>>) {
        result.subscribe((res: HttpResponse<IConsumer>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get consumer() {
        return this._consumer;
    }

    set consumer(consumer: IConsumer) {
        this._consumer = consumer;
    }
}
