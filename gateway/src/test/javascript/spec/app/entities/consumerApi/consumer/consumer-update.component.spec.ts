/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { GatewayTestModule } from '../../../../test.module';
import { ConsumerUpdateComponent } from 'app/entities/consumerApi/consumer/consumer-update.component';
import { ConsumerService } from 'app/entities/consumerApi/consumer/consumer.service';
import { Consumer } from 'app/shared/model/consumerApi/consumer.model';

describe('Component Tests', () => {
    describe('Consumer Management Update Component', () => {
        let comp: ConsumerUpdateComponent;
        let fixture: ComponentFixture<ConsumerUpdateComponent>;
        let service: ConsumerService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConsumerUpdateComponent],
                providers: [ConsumerService]
            })
                .overrideTemplate(ConsumerUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ConsumerUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ConsumerService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consumer(123);
                    spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consumer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Consumer();
                    spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({ body: entity })));
                    comp.consumer = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
