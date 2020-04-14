import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  public loginInvalid: boolean;
  private formSubmitAttempt: boolean;
  private returnUrl: string;
  user:any;
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService:AuthService) { }

    async ngOnInit() {
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/game';
  
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      if (this.authService.currentUserValue) {
        this.router.navigate(['/kamiller']);
      }
    }
     onSubmit() {
      this.loginInvalid = false;
      this.formSubmitAttempt = false;
      if (this.form.valid) {
        try {
          const username = this.form.get('username').value;
          const password = this.form.get('password').value;
        this.authService.login(username,password)
        .then((user) => {
          if(user){
            this.user = user;
            this.authService.setCurrentUserValue(this.user);
            if (this.authService.user) {
              this.router.navigate(['/kamiller'],{queryParams:{username:this.user.username}});
            }}
            else{
              this.loginInvalid = true;
            }
        })
        .catch((err) => {
          console.log(err);
         
        });
        
        } catch (err) {
          this.loginInvalid = true;
        }
      } else {
        this.formSubmitAttempt = true;
      }
    }

}
