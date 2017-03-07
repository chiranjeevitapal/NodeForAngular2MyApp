import { Injectable }    from '@angular/core';
import { Headers, Http, Response, RequestOptions  } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Walkin } from '../model/walkin';
import {Globals} from '../globals';

@Injectable()
export class UploadService {
    //urls
    private jobsListUrl = '/api/walkinsAll';
    private postWalkinUrl = '/api/postWalkin';
    private scrapeWalkinUrl = '/api/scrape';
    private scrapeAllWalkinsUrl = '/api/scrapeAll';
    private todayWalkinsObjectUrl = '/api/scrapeTodayUrls';
    private notifyUrl = '/api/notifyfbsubscribers';
    private sendEmailUrl = '/api/bulkmailer';

    private host = '';
    private port = Globals.NODE_PORT;

    constructor(private http: Http) {
        this.host = 'http://' + window.location.hostname + ':' + this.port;
    }

    postWalkin(walkin: Walkin): Observable<Walkin> {
        let bodyString = JSON.stringify({ walkin }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.host + this.postWalkinUrl, bodyString, options) // ...using post request
            .map(this.extractData)
            .catch(this.handleError);
    }

    scrapeWeb(websiteName: string, websiteLink: string): Observable<Walkin> {
        //let urlParams = paramsToQueryString(params);
        return this.http.get(this.host + this.scrapeWalkinUrl + '/' + websiteName + "/" + websiteLink)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getAllJobLinks(websiteName: string): Observable<string[]> {
        return this.http.get(this.host + this.todayWalkinsObjectUrl + '/' + websiteName)
            .map(this.extractData)
            .catch(this.handleError);
    }

    notifySubscribers(): Observable<string[]> {
        return this.http.get(this.host + this.notifyUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    sendEmail(message: String): Observable<any> {
        let bodyString = JSON.stringify({ message }); // Stringify payload
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON , { 'X- Token': 'Chinna@*27' }
        let options = new RequestOptions({ headers: headers }); // Create a request option

        return this.http.post(this.host + this.sendEmailUrl, bodyString, options) // ...using post request
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
