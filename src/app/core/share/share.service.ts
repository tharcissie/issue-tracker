import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  public userNumber: number;
  public projectNumber: number;
  public issueNumber: number;
}
