import { HttpHandler, HttpInterceptor, HttpRequest,  } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class EmailInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request : HttpRequest<any>, next : HttpHandler) {
        console.log("intercepteur appelée");
        console.info(localStorage.getItem('token'));
        request = request.clone({
            setHeaders :{
                Authorization : 'Baerer ' + localStorage.getItem('token'), 'Custom-Header-1': '1'
            }
        })
        console.log(request.headers);
        return next.handle(request);
    }
}