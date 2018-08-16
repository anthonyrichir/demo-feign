/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { ConsumerDeleteDialogComponent } from 'app/entities/consumerApi/consumer/consumer-delete-dialog.component';
import { ConsumerService } from 'app/entities/consumerApi/consumer/consumer.service';

describe('Component Tests', () => {
    describe('Consumer Management Delete Component', () => {
        let comp: ConsumerDeleteDialogComponent;
        let fixture: ComponentFixture<ConsumerDeleteDialogComponent>;
        let service: ConsumerService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConsumerDeleteDialogComponent],
                providers: [ConsumerService]
            })
                .overrideTemplate(ConsumerDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsumerDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumerService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it(
                'Should call delete service on confirmDelete',
                inject(
                    [],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });
});
