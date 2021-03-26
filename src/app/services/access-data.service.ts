import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
// import { Http2ServerRequest } from 'http2';

@Injectable({
  providedIn: 'root'
})
export class AccessDataService {
  public url = 'http://localhost:8080/';

  //This url is used for having relationship with the api
  public uri  = 'http://localhost:8080/api/';

  constructor(
    private http: HttpClient
  ) { }

  getAllDataFromBackend() {
    return this.http.get(this.url + 'test')
  }

  login(data: any) {
    return this.http.post(this.url + 'login', data)
  }

  addCreditsToCertainUser(userData: any) {
    return this.http.post(this.uri + 'addCredits', userData);
  }

  // This function is to deduct a certain users credits
  deductCreditsToCertainUser(userData: any) {
    return this.http.post(this.uri + 'deduct-credits', userData)
  }

  // This function is to get a certain users credits
  getUserCredits(id) {
    return this.http.post(this.uri + 'getCertainUsersCredits', {_id: id});
  }

  editCertainUserSituation(certainUserID: any, situation: any) {
    return this.http.post(this.uri + 'edit-certain-user-situation', {certainUserID: certainUserID,userSituation: situation})
  }
  // retrieve customers
  retrieveCustomer() {
    return this.http.get(this.url+ 'customers');
  }
  // find specific customer
  findCustomer(id: string){
    return this.http.get(this.url + `customer/${id}`)
  }
  suspendUser(data: any) {
    return this.http.post(this.url + 'deleteCustomer', {userID: data._id})
  }


  // This function is to get all the completed jobs for the admin to easily deduct the credits of a certain user
  getCompletedJobs() {
    return this.http.get(this.uri + 'get-all-completed-jobs')
  }

  // This function is to get the details of a specific artisan
  returnArtisan(artisanID) {
    return this.http.post(this.uri + 'get-artisan', {artisan: artisanID})
  }

  // This function is to get the selected bookings
  returnBookings(id) {
    return this.http.post(this.uri + 'booking', {_id: id})
  }
}
