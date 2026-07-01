export const ENDPOINTS = {
    auth: {
        login: '/auth/login',
        me: '/auth/me',
    },
    products: {
        all: '/products',
        single: (id: number) => `/products/${id}`,
        search: '/products/search',
        add: '/products/add',
        update: (id: number) => `/products/${id}`,
        delete: (id: number) => `/products/${id}`,
    },
    users: {
        all: '/users',
        single: (id: number) => `/users/${id}`,
    }
};