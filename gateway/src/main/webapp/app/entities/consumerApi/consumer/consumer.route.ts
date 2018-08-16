import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from 'app/core';
import { Consumer } from 'app/shared/model/consumerApi/consumer.model';
import { ConsumerService } from './consumer.service';
import { ConsumerComponent } from './consumer.component';
import { ConsumerDetailComponent } from './consumer-detail.component';
import { ConsumerUpdateComponent } from './consumer-update.component';
import { ConsumerDeletePopupComponent } from './consumer-delete-dialog.component';

@Injectable()
export class ConsumerResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

@Injectable()
export class ConsumerResolve implements Resolve<any> {
    constructor(private service: ConsumerService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id);
        }
        return new Consumer();
    }
}

export const consumerRoute: Routes = [
    {
        path: 'consumer',
        component: ConsumerComponent,
        resolve: {
            pagingParams: ConsumerResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consumers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumer/:id/view',
        component: ConsumerDetailComponent,
        resolve: {
            consumer: ConsumerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consumers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumer/new',
        component: ConsumerUpdateComponent,
        resolve: {
            consumer: ConsumerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consumers'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumer/:id/edit',
        component: ConsumerUpdateComponent,
        resolve: {
            consumer: ConsumerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consumers'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consumerPopupRoute: Routes = [
    {
        path: 'consumer/:id/delete',
        component: ConsumerDeletePopupComponent,
        resolve: {
            consumer: ConsumerResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Consumers'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
