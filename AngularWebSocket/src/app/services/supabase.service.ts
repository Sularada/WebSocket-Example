import { Injectable } from '@angular/core'
import { AuthSession, createClient, SupabaseClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment'

export interface user {
  id?: string
  created_at?: string
  birth_date?: string | null
  username: string
  email: string
  full_name: string
  avatar_url?: string | null
}

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {

  private supabase: SupabaseClient
  _session: AuthSession | null = null
  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }


  async registerUser(user: user, password: string) {
    const controlUsername = await this.checkUsername(user);
    if (controlUsername.data) {
      return { data: null, error: `${user.username} is already taken, please choose another username` }
    }
    let { data, error } = await this.supabase.auth.signUp(
      {
        email: user.email,
        password: password,
        options: {
          data: {
            username: user.username,
            full_name: user.full_name,
            birth_date: user.birth_date,
            avatar_url: user.avatar_url,
          }
        }
      }
    )
    if (error) {
      return { data: null, error: error }
    }
    else {
      this._session = data.session
      user.id = data.user!.id!
      await this.supabase.from('users').insert(user);
      return { data: data, error: null }
    }
  }
  async checkUsername(user: user) {
    const username = await this.supabase
      .from('public_usernames')
      .select('username')
      .eq('username', user.username)
      .maybeSingle();
    return username
  }
  deleteUser(id: string) {
    return this.supabase.from('user').delete().eq('id', id)
  }
  loginUser(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password })
  }

}
