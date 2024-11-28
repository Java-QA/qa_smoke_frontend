import axios from 'axios';
import { Gift, GiftDto, LoginDto, UserRegistrationDto, WishList, WishListDto, User } from '../types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    async login(username: string, password: string): Promise<void> {
        try {
            const response = await api.post('/auth/login', { username, password });
            localStorage.setItem('token', response.data.token);
        } catch (error) {
            throw new Error('Неверные учетные данные');
        }
    },

    async register(username: string, password: string): Promise<void> {
        try {
            await api.post('/auth/register', { username, password });
        } catch (error) {
            throw new Error('Не удалось зарегистрировать пользователя');
        }
    },

    logout(): void {
        localStorage.removeItem('token');
    },
};

export const userService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await api.get('/users');
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить список пользователей');
        }
    },

    async getUserWishlists(userId: number): Promise<WishList[]> {
        try {
            const response = await api.get(`/users/${userId}/wishlists`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить списки желаний пользователя');
        }
    },
};

export const wishListService = {
    async getCurrentUserWishLists(): Promise<WishList[]> {
        try {
            const response = await api.get('/wishlists');
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить списки желаний');
        }
    },

    async getUserWishLists(userId: string): Promise<WishList[]> {
        try {
            const response = await api.get(`/wishlists/user/${userId}`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить списки желаний пользователя');
        }
    },

    async getWishList(id: string): Promise<WishList> {
        try {
            const response = await api.get(`/wishlists/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить список желаний');
        }
    },

    async createWishList(data: WishListDto): Promise<WishList> {
        try {
            const response = await api.post('/wishlists', data);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось создать список желаний');
        }
    },

    async updateWishList(id: string, data: WishListDto): Promise<WishList> {
        try {
            const response = await api.put(`/wishlists/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось обновить список желаний');
        }
    },

    async deleteWishList(id: string): Promise<void> {
        try {
            await api.delete(`/wishlists/${id}`);
        } catch (error) {
            throw new Error('Не удалось удалить список желаний');
        }
    },
};

export const giftService = {
    async getGift(id: string): Promise<Gift> {
        try {
            const response = await api.get(`/gifts/${id}`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить подарок');
        }
    },

    async getWishListGifts(wishListId: string): Promise<Gift[]> {
        try {
            const response = await api.get(`/gifts/wishlist/${wishListId}`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось получить подарки списка желаний');
        }
    },

    async createGift(wishListId: string, data: GiftDto): Promise<Gift> {
        try {
            const response = await api.post(`/gifts/wishlist/${wishListId}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось создать подарок');
        }
    },

    async updateGift(id: string, data: GiftDto): Promise<Gift> {
        try {
            const response = await api.put(`/gifts/${id}`, data);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось обновить подарок');
        }
    },

    async deleteGift(id: string): Promise<void> {
        try {
            await api.delete(`/gifts/${id}`);
        } catch (error) {
            throw new Error('Не удалось удалить подарок');
        }
    },

    async toggleReserved(id: string): Promise<Gift> {
        try {
            const response = await api.put(`/gifts/${id}/reserve`);
            return response.data;
        } catch (error) {
            throw new Error('Не удалось зарезервировать подарок');
        }
    },
};
