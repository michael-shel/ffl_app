export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  provider: string;
  provider_id: string;

  email_verified_at: string;

  access_token: string;
  remember_token: string;
  
  created_at: string;
  deleted_at: null
  updated_at: string;
}
