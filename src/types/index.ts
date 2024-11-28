export interface User {
    id: number;
    username: string;
}

export interface Gift {
    id: number;
    name: string;
    description: string;
    link?: string;
    price?: number;
    reserved: boolean;
    wishListId: number;
}

export interface WishList {
    id: number;
    title: string;
    description: string;
    userId: number;
    gifts: Gift[];
}

export interface LoginDto {
    username: string;
    password: string;
}

export interface UserRegistrationDto {
    username: string;
    email: string;
    password: string;
}

export interface WishListDto {
    title: string;
    description?: string;
}

export interface GiftDto {
    name: string;
    description?: string;
    imageUrl?: string;
    price?: number;
}
