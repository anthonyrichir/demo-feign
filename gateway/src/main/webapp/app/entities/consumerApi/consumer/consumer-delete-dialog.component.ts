import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IConsumer } from 'app/shared/model/consumerApi/consumer.model';
import { ConsumerService } from './consumer.service';

@Component({
    selector: 'jhi-consumer-delete-dialog',
    templateUrl: './consumer-delete-dialog.component.html'
})
export class ConsumerDeleteDialogComponent {
    consumer: IConsumer;

    constructor(private consumerService: ConsumerService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.consumerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'consumerListModification',
                content: 'Deleted an consumer'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-consumer-delete-popup',
    template: ''
})
export class ConsumerDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private route: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.route.data.subscribe(({ consumer }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ConsumerDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.consumer = consumer.body;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
