import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8002/auth/login';
  private signUpUrl = 'http://localhost:8002/auth/signup';

  constructor(private _http: HttpClient) {  }

  login(email: string, password: string) {
    const body = { email, password };
    return this._http.post(this.loginUrl, body);
  }

  signUp(email:string,password:string,userRole:string){
    const body = {email,password,userRole};
    return this._http.post(this.signUpUrl,body);
  }

  private getHeader(){
    const token = localStorage.getItem('token');
    //console.log(token);
    const header = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return header;
  }

  isLoggedIn(){
    let token = localStorage.getItem('token');
    if(token==undefined || token ==='' || token==null){
      return false;
    }else{
      return true;
    }
  }

  Logout(){
    localStorage.clear();
  }

  getData(){
    const headers = this.getHeader();
    //console.log(headers);
    return this._http.get('http://localhost:8002/home/userdata',{headers});
  }

  // getUserRole(){
  //   const headers = this.getHeader();
  //   //console.log(headers);
  //   return this._http.get('http://localhost:8062/home/userdata',{headers}).subscribe((res)=>{
  //     console.log(res);
  //   });
  // }

}
