/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { GatewayTestModule } from '../../../../test.module';
import { ConsumerDetailComponent } from 'app/entities/consumerApi/consumer/consumer-detail.component';
import { Consumer } from 'app/shared/model/consumerApi/consumer.model';

describe('Component Tests', () => {
    describe('Consumer Management Detail Component', () => {
        let comp: ConsumerDetailComponent;
        let fixture: ComponentFixture<ConsumerDetailComponent>;
        const route = ({ data: of({ consumer: new Consumer(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [GatewayTestModule],
                declarations: [ConsumerDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ConsumerDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ConsumerDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.consumer).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
