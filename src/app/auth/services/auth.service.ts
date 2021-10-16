import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _api = "http://challenge-react.alkemy.org/";

  constructor(private router: Router, private http:HttpClient) { }

  auth( email: string, password: string ) {
    
      const data = {
        email,
        password 
      }

      return axios.post<any>(this._api, data)
           .then( ({ data }) => {
            localStorage.setItem('token', data.token)
            this.router.navigate(['./heroes/equipo'])
            
        })
           .catch(function(err) {
              Swal.fire({
                position: 'center',
                icon: 'warning',
                title: 'Wrong email or password',
                showConfirmButton: false,
                timer: 1500
              })
        })
  }
}
