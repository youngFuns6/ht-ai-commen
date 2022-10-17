export interface Auth {
  username: string;
  password: string;
  token: string | null;
  isLogged: boolean;
  remember: false;
}

interface Role {
  value: string;
  name: string;
}
