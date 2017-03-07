import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Globals} from './globals';
import { AuthModel } from './model/auth.model';

@Injectable()
export class AppService {
    //urls
    private facebookAuthUrl = '/api/facebookAuth';
    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    registerUser(user: AuthModel): Observable<AuthModel> {
        let bodyString = JSON.stringify({ user }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(this.host + this.facebookAuthUrl, bodyString, options) // ...using post request
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
