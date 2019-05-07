import {
    Observable
} from 'rxjs';

export interface SearchParam {
    page?: number;
    all?: any;
}

export interface HttpResource < T > {

    list(searchParams: SearchParam): Observable < {
        data: Array < T > ,
        meta: any
    } > ;

    get(id: number): Observable < T >;

    create(data: T): Observable< T >;

    update(id: number, data: T): Observable < T >;

    destroy(id: number): Observable < any >;
}
