import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = 'http://localhost:8002/feedback';
  constructor(private _http: HttpClient,) { }

  getFeedbackByBookingId(bookingId: any): Observable<any> {
    return this._http.get(`${this.apiUrl}/booking/${bookingId}`);
  }

  createFeedback(feedbackData: any): Observable<any> {
    return this._http.post(`${this.apiUrl}`, feedbackData);
  }

  updateFeedback(feedbackData: any): Observable<any> {
    return this._http.put(`${this.apiUrl}/booking/${feedbackData.bookingId}`, feedbackData);
  }
}
