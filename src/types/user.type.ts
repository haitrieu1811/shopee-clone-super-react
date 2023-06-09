type Role = 'User' | 'Admin';

export interface User {
  _id: string;
  roles: Role[];
  email: string;
  name?: string;
  date_of_birth?: string; // ISO 8601
  avatar?: string;
  address?: string;
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

// export type UpdateProfileBodyType = Pick<User, 'address' | 'date_of_birth' | 'name' | 'phone' | 'avatar'>;

export interface UpdateProfileBodyType extends Omit<User, '_id' | 'roles' | 'email' | 'createdAt' | 'updatedAt'> {
  password?: string;
  new_password?: string;
}
