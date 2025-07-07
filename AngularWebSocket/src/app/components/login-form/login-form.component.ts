import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { SupabaseService } from '../../services/supabase.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, PasswordModule, CheckboxModule, ButtonModule, PasswordModule, FormsModule, CommonModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  value!: string;
  constructor(private messageService: MessageService, private supabaseService: SupabaseService) {

  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { data, error } = await this.supabaseService.loginUser(this.loginForm.value.email!, this.loginForm.value.password!);
        if (!error) {
          this.messageService.add({ severity: 'success', summary: 'Register Success', detail: 'You have successfully registered' });
        }
      }
      catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Register Error', detail: 'Please check your information and try again' });
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Login Error', detail: 'Please check your information and try again' });
    }

  }
}
