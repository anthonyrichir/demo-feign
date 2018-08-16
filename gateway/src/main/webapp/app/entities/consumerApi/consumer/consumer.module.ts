import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared';
import {
    ConsumerService,
    ConsumerComponent,
    ConsumerDetailComponent,
    ConsumerUpdateComponent,
    ConsumerDeletePopupComponent,
    ConsumerDeleteDialogComponent,
    consumerRoute,
    consumerPopupRoute,
    ConsumerResolve,
    ConsumerResolvePagingParams
} from './';

const ENTITY_STATES = [...consumerRoute, ...consumerPopupRoute];

@NgModule({
    imports: [GatewaySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsumerComponent,
        ConsumerDetailComponent,
        ConsumerUpdateComponent,
        ConsumerDeleteDialogComponent,
        ConsumerDeletePopupComponent
    ],
    entryComponents: [ConsumerComponent, ConsumerUpdateComponent, ConsumerDeleteDialogComponent, ConsumerDeletePopupComponent],
    providers: [ConsumerService, ConsumerResolve, ConsumerResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class GatewayConsumerModule {}
