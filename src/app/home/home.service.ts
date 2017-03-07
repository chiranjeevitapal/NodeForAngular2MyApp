import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Walkin } from '../model/walkin';
import {Globals} from '../globals';

@Injectable()
export class HomeService {
    //urls
    private jobsListUrl = '/api/walkinsAll';
    private jobUrl = '/api/walkin';
    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    getJobs(): Observable<any> {
        return this.http.get(this.host + this.jobsListUrl)
            .map((resp: Response) => ({
                jobs: resp.json()
            }))
            .catch(this.handleError);
    }

    getWalkin(id: string): Observable<any> {
        return this.http.get(this.host + this.jobUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getNativeWindow() {
        return window;
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
