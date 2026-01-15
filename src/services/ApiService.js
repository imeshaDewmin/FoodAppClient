import axios from 'axios';

export default class ApiService {

    static BASE_URL = 'http://localhost:8090/api';

    static saveToken(token) {
        localStorage.setItem('token', token);
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static saveRole(roles) {
        localStorage.setItem('roles', JSON.stringify(roles));
    }

    //get roles from local storage
    static getRoles() {
        const roles = localStorage.getItem('roles');
        return roles ? JSON.parse(roles) : null;
    }

    //check if a user has a specific role
    static hasRole(role) {
        const roles = this.getRoles();

        return roles ? roles.includes(role) : false;
    }

    static isAdmin() {
        return this.hasRole("ADMIN")
    }

    static isCustomer() {
        return this.hasRole("CUSTOMER")
    }

    static isDelivery() {
        return this.hasRole("DELIVERY")
    }

    static logOut() {
        localStorage.removeItem("token")
        localStorage.removeItem("roles")
    }

    static isAuthenticated() {
        const token = this.getToken();

        return !!token;
    }

    static getHeader() {
        const token = this.getToken();
        const headers = { "Content-Type": "application/json" };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }



    //Register a user
    static async registerUser(registrationData) {
        const response = await axios.post(`${this.BASE_URL}/auth/register`, registrationData)
        return response.data;
    }

    //Login a user
    static async LoginUser(loginData) {
        const response = await axios.post(`${this.BASE_URL}/auth/login`, loginData)
        return response.data;
    }



    //Users Profile Management Section

    static async myProfile() {
        const response = await axios.get(`${this.BASE_URL}/users/account`, {
            headers: this.getHeader()
        })
        return response.data;
    }

    static async updateProfile(formData) {
        const response = await axios.put(`${this.BASE_URL}/users/update`, {
            headers: this.getHeader(),
            'Content-Type': 'multipart/form-data'
        }, formData)
        return response.data;
    }

    static async deactivateAccount() {
        const response = await axios.delete(`${this.BASE_URL}/users/deactivate`, {
            headers: this.getHeader()
        })
        return response.data;
    }


    //ORDER SECTION

    static async placeOrder() {
        const response = await axios.post(`${this.BASE_URL}/order/checkout`, {}, {
            headers: this.getHeader()
        })
        return response.data;

    }

    static async updateOrderStatus(body) {
        const resp = await axios.put(`${this.BASE_URL}/order/update`, body, {
            headers: this.getHeader()
        })
        return resp.data;
    }

    static async getAllOrders(orderStatus, page = 0, size = 200) {

        let url = `${this.BASE_URL}/order/all`;

        if (orderStatus) {
            url = `${this.BASE_URL}/order/all?orderStatus=${orderStatus}&page=${page}&size=${size}`
        }

        const resp = await axios.get(url, {
            headers: this.getHeader()
        })
        return resp.data;

    }

    static async getMyOrders() {
        const resp = await axios.get(`${this.BASE_URL}/order/userOrders`, {
            headers: this.getHeader()
        })
        return resp.data;
    }

    static async getOrderById(id) {
        const resp = await axios.get(`${this.BASE_URL}/order/${id}`, {
            headers: this.getHeader()
        })
        return resp.data;
    }

    static async countTotalActiveCustomers() {
        const resp = await axios.get(`${this.BASE_URL}/order/users`, {
            headers: this.getHeader()
        })
        return resp.data;
    }

    static async getOrderItemById(orderItemId) {
        const resp = await axios.get(`${this.BASE_URL}/order/orderItem/${orderItemId}`, {
            headers: this.getHeader()
        })
        return resp.data;
    }


    //CATEGORY SECTION

    static async getAllCategories() {
        console.log("getAllCategories() was called")
        const resp = await axios.get(`${this.BASE_URL}/categories/all`);
        console.log("response is: " + resp.data)
        return resp.data;
    }

    static async getCategoryById(id) {
        const resp = await axios.get(`${this.BASE_URL}/categories/${id}`);
        return resp.data;
    }

    static async createCategory(body) {
        const resp = await axios.post(`${this.BASE_URL}/categories/add`, body, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async updateCategory(body) {
        const resp = await axios.put(`${this.BASE_URL}/categories/update`, body, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async deleteCategory(id) {
        const resp = await axios.delete(`${this.BASE_URL}/categories/${id}`, {
            headers: this.getHeader()
        });
        return resp.data;
    }


    //MENU SECTION

    static async addMenu(formData) {
        const resp = await axios.post(`${this.BASE_URL}/menu/add`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return resp.data;
    }

    static async updateMenu(formData) {
        const resp = await axios.put(`${this.BASE_URL}/menu/update`, formData, {
            headers: {
                ...this.getHeader(),
                'Content-Type': 'multipart/form-data'
            }
        });
        return resp.data;
    }

    static async deleteMenu(id) {
        const resp = await axios.delete(`${this.BASE_URL}/menu/${id}`, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async getMenuById(id) {
        const resp = await axios.get(`${this.BASE_URL}/menu/${id}`);
        return resp.data;
    }

    static async getAllMenus() {
        const resp = await axios.get(`${this.BASE_URL}/menu`, {});
        return resp.data;
    }

    static async getAllMenuByCategoryId(categoryId) {
        const resp = await axios.get(`${this.BASE_URL}/menu`, {
            params: {
                categoryId: categoryId
            }
        });
        return resp.data;
    }

    static async searchMenu(search) {
        const resp = await axios.get(`${this.BASE_URL}/menu`, {
            params: {
                search: search
            }
        });
        return resp.data;
    }


    //CART SECTION

    static async addItemToCart(cartDTO) {

        const resp = await axios.post(`${this.BASE_URL}/cart/items`, cartDTO, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async incrementItem(menuId) {
        const resp = await axios.put(`${this.BASE_URL}/cart/add/${menuId}`, null, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async decrementItem(menuId) {
        const resp = await axios.put(`${this.BASE_URL}/cart/decrement/${menuId}`, null, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async removeItem(cartItemId) {
        const resp = await axios.delete(`${this.BASE_URL}/cart/remove/${cartItemId}`, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async getCart() {
        const resp = await axios.get(`${this.BASE_URL}/cart/all`, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async clearCart() {
        const resp = await axios.delete(`${this.BASE_URL}/cart`, {
            headers: this.getHeader()
        });
        return resp.data;
    }


    //REVIEW SECTION

    static async getMenuAverageOverallReview(menuId) {
        const resp = await axios.get(`${this.BASE_URL}/review/menu/rating/${menuId}`, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async createReview(body) {
        const resp = await axios.post(`${this.BASE_URL}/review/create`, body, {
            headers: this.getHeader()
        });
        return resp.data;
    }


    //PAYMENT SECTION

    //function to create payment intent
    static async proceedForPayment(body) {

        const resp = await axios.post(`${this.BASE_URL}/payment`, body, {
            headers: this.getHeader()
        });
        return resp.data; //return the resp containing the stripe transaction id for this transaction
    }

    //TO UPDATE PAYMENT WHEN IT HAS BEEN COMPLETED
    static async updateOrderPayment(body) {
        const resp = await axios.put(`${this.BASE_URL}/payment/update`, body, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async getAllPayments() {
        const resp = await axios.get(`${this.BASE_URL}/payment/all`, {
            headers: this.getHeader()
        });
        return resp.data;
    }

    static async getAPaymentById(id) {
        const resp = await axios.get(`${this.BASE_URL}/payment/${id}`, {
            headers: this.getHeader()
        });
        return resp.data;
    }



}