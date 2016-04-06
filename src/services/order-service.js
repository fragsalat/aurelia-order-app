import {HttpClient} from 'aurelia-http-client';
import {Order} from 'models/order';

export class OrderService {

    /**
     * @type {object}
     */
    static inject = [HttpClient];

    /**
     * @type {HttpClient}
     */
    http = null;

    /**
     * Holder of already loaded order instances
     *
     * @type {object}
     */
    cache = {};

    /**
     * @param httpClient {HttpClient}
     */
    constructor(httpClient) {
        this.http = httpClient;
    }

    /**
     * List all orders
     *
     * @param offset {number}
     * @param limit {number}
     * @returns {Promise}
     */
    list(offset: Number, limit: Number) {
        return this._send('/order/list/' + offset + '/' + limit, null);
    }

    /**
     * Get a specific order
     *
     * @param id {number}
     * @returns {Promise}
     */
    get(id: Number) {
        return this._send('/order/' + id, null);
    }

    /**
     * Create a new order
     *
     * @param data {object}
     * @returns {Promise}
     */
    create(data: Object) {
        return this._send('/order/create', data);
    }

    /**
     * Edit a order
     *
     * @param id {number}
     * @param data {object}
     * @returns {Promise}
     */
    edit(id: Number, data: Object) {
        return this._send('/order/edit/' + id, data);
    }

    /**
     * Delete a order
     *
     * @param id {number}
     * @returns {Promise}
     */
    remove(id: Number) {
        return this._send('/order/delete/' + id, null);
    }

    /**
     * Generic function to call order api
     *
     * @param url {string}
     * @param data {object}
     * @returns {Promise}
     * @private
     */
    _send(url, data: Object) {
        return new Promise((resolve, reject) => {
            let method = data ? 'post' : 'get';
            this.http[method](url, JSON.stringify(data))
                .then(response => response.content)
                .then(result => {
                    if (result.success) {
                        // Check if we have a list or a single order
                        if (Array.isArray(result.data)) {
                            let orders = [];
                            // Create orders of json data and cache it
                            for (let data of result.data) {
                                let order = new Order(data);
                                this.cache[order.id] = order;
                                orders.push(order);
                            }
                            return resolve(orders);
                        }
                        else {
                            let order = new Order(result.data);
                            this.cache[order.id] = order;
                            return resolve(order);
                        }
                    }
                    else {
                        reject(result.error);
                    }
                })
                .catch(reject)
        });
    }
}
