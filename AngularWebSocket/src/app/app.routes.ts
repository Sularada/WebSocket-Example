import { Routes } from '@angular/router';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { MessageScreenComponent } from './components/message-screen/message-screen.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

export const routes: Routes = [
    { path: '', pathMatch: "full", component: MessageScreenComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: 'login', component: LoginPageComponent },
];
