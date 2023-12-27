export interface User {
  id: string,
  email: string,
  name: string,
}

export interface PrivateUser extends User {
  password: string
}