export interface Product {
    id:         number;
    price:      number;
    title:      string;
    category:   string;
    isDeleted:  boolean;
}

export interface ProductsResponse {
    products:   Product[];
    total:      number;
    skip:       number;
    limit:      number;
}

export interface User {
    id:         number;
    username:   string;
    email:      string;
    firstName:  string;
    lastName:   string;
    gender:     string;
}