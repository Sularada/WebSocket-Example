import { Injectable } from '@angular/core'
import { AuthSession, createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'
import { MessageService } from 'primeng/api'

export interface user {
  id?: string
  created_at?: string
  birth_date?: string | null
  username: string
  email: string
  full_name: string
  avatar_url?: string | null
}

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  private supabase: SupabaseClient;
  _session: AuthSession | null = null;

  constructor(private messageService: MessageService) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._session = session;
    });
  }

  async getSession() {
    const { data, error } = await this.supabase.auth.getSession();
    if (error) {
      console.error('Session fetch error:', error.message);
      return null;
    }
    this._session = data.session;
    return data.session;
  }

  getCurrentUser() {
    return this.supabase.auth.getUser();
  }

  async getCurrentUserData() {
    if (!this._session) {

      this._session = await this.getSession();
    }
    if (this._session && this._session.user) {
      return this.supabase
        .from("users")
        .select("*")
        .eq("id", this._session.user.id)
        .single()
    } else {
      throw new Error("Session bulunamadı.");
    }
  }


  async registerUser(user: user, password: string) {
    try {
      const controlUsername = await this.checkUsername(user);
      if (controlUsername.data) {
        throw new Error(`${user.username} is already taken, please choose another username`);
      }

      const { data, error } = await this.supabase.auth.signUp({
        email: user.email,
        password: password,
        options: {
          data: {
            username: user.username,
            full_name: user.full_name,
            birth_date: user.birth_date,
            avatar_url: user.avatar_url,
          },
        },
      });

      if (error) throw error;

      this._session = data.session;
      user.id = data.user!.id!;
      const { error: insertError } = await this.supabase.from('users').insert(user);
      if (insertError) throw insertError;

      return { data, error: null };
    } catch (err: any) {
      console.error('Kayıt sırasında hata:', err?.message || err);
      this.messageService.add({
        severity: 'error',
        summary: 'Register Error',
        detail: err.message,
      });
      return { data: null, error: err };
    }
  }

  async checkUsername(user: user) {
    return await this.supabase
      .from('public_usernames')
      .select('username')
      .eq('username', user.username)
      .maybeSingle();
  }

  deleteUser(id: string) {
    return this.supabase.from('user').delete().eq('id', id);
  }

  async loginUser(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });

    if (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Login Error',
        detail: error.message,
      });
      return { data: null, error };
    }

    this._session = data.session;

    return { data, error: null };
  }

  logoutUser() {
    return this.supabase.auth.signOut();
  }
}
