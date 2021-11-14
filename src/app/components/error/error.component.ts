import { ActivatedRoute, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  errorCode?: number = 404

  constructor( private router: Router, private route: ActivatedRoute ) { 
    this.route.params.subscribe( param => {
      if (!param || !param.errorCode || typeof(param.errorCode) !== 'number')
        return

      this.errorCode = param.errorCode
    });
  }

  redirectToHome() {
    this.router.navigate(['/home']).then(() => {
      window.location.reload();
    })
  }
}
