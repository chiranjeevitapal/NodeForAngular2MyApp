import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Register } from '../model/register';
import {Globals} from '../globals';

@Injectable()
export class RegisterService {
    //urls
    private registerUrl = '/api/registerUser';

    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    registerUser(register: Register): Observable<any> {
        let bodyString = JSON.stringify({ register }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.host + this.registerUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }


    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'error');
    }
}
