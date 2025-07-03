import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { SupabaseService } from '../../services/supabase.service';
@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule, PasswordModule, CheckboxModule, ButtonModule, PasswordModule, FormsModule, CommonModule, ToastModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss',
})
export class RegisterFormComponent {
  value!: string;
  constructor(private messageService: MessageService, private supabaseService: SupabaseService) {

  }

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    birthDate: new FormControl(null),
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    avatar_url: new FormControl(null),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    terms: new FormControl(false, [Validators.requiredTrue, Validators.required]),
  });

  async onSubmit() {
    if (this.registerForm.valid) {
      const user = {
        username: this.registerForm.value.username!,
        email: this.registerForm.value.email!,
        full_name: this.registerForm.value.fullName!,
        avatar_url: this.registerForm.value.avatar_url,
        birth_date: this.registerForm.value.birthDate,
      }
      try {
        const { data, error } = await this.supabaseService.registerUser(user, this.registerForm.value.password!);
        if (!error) {
          this.messageService.add({ severity: 'success', summary: 'Register Success', detail: 'You have successfully registered' });
        }
      }
      catch (error) {
        this.messageService.add({ severity: 'error', summary: 'Register Error', detail: 'Please check your information and try again' });
      }
    } else {
      this.registerForm.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Register Error', detail: 'Please check your information and try again' });
    }

  }
}
