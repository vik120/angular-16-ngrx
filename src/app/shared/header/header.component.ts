import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from 'src/app/auth/store/action';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map, tap } from 'rxjs';
import { selectCurrentUser } from 'src/app/auth/store/reducers';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, NgbDropdownModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed = true;
  data$ = combineLatest({
    currentUser$: this.store.select(selectCurrentUser)
  })
  constructor(private auth: AuthService, private store: Store) {
    
  }

  logout() {
    this.store.dispatch(authActions.logout())
  }
}
