import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticateService } from '../authenticate.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  credentials = { username: '', password: ''};
  authenticateObservable: Subscription;

  constructor(private authenticateService: AuthenticateService) { }

  ngOnInit() {
  }

  onLoginUser() {
    console.info('Logging user into system...');
    this.authenticateObservable = this.authenticateService.authenticate(this.credentials).subscribe(
      response => {
        console.info(response);
        this.reset();
      },
      error => {
        console.error(error);
        this.reset();
      }
    );
  }

  private reset() {
    this.credentials = { username: '', password: ''};
  }

  ngOnDestroy() {
    this.authenticateObservable.unsubscribe();
  }

}
