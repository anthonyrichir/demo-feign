import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IConsumer } from 'app/shared/model/consumerApi/consumer.model';

type EntityResponseType = HttpResponse<IConsumer>;
type EntityArrayResponseType = HttpResponse<IConsumer[]>;

@Injectable()
export class ConsumerService {
    private resourceUrl = SERVER_API_URL + 'consumerapi/api/consumers';

    constructor(private http: HttpClient) {}

    create(consumer: IConsumer): Observable<EntityResponseType> {
        return this.http.post<IConsumer>(this.resourceUrl, consumer, { observe: 'response' });
    }

    update(consumer: IConsumer): Observable<EntityResponseType> {
        return this.http.put<IConsumer>(this.resourceUrl, consumer, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IConsumer>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IConsumer[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
