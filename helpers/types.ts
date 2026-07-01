export interface Product {
    id:         number;
    price:      number;
    title:      string;
    category:   string;
}

export interface ProductsResponse {
    products:   Product[];
    total:      number;
    skip:       number;
    limit:      number;
}