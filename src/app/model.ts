
export interface Category {
  id?: number;
  name: string;
  readonly slug?: string;
  active: boolean;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  readonly slug?: string;
  active: boolean;
  photo: File;
  photo_url: string;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  profile?: UserProfile;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export enum ChatInvitationUserStatus {
  PENDING = 1,
  APPROVE = 2,
  REPROVED = 3,
}
export interface ChatInvitationUser {
  id?: number;
  user: User;
  status: ChatInvitationUserStatus;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}

export interface UserProfile {
  photo_url: string;
  phone_number: string;
  has_photo: boolean;
}
export interface ProductCategory {
  product: Product;
  categories: Category[];
}
export interface ProductInput {
  id?: number;
  amount: number;
  product: Product;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface ProductOutput {
  id?: number;
  amount: number;
  product: Product;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface ProductPhoto {
  id?: number;
  photo_url: string;
  product?: Product;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface ChatGroup {
  id?: number;
  name: string;
  photo?: File;
  photo_url: string;
  count_users?: number;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
export interface ChatGroupLinkInvitation {
  id?: number;
  total: number;
  remaining: number;
  link: string;
  group?: number;
  expires_at?: number;
  readonly created_at?: {
    date: string;
  };
  readonly updated_at?: {
    date: string;
  };
}
