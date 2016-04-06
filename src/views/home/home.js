import {Router} from 'aurelia-router';
import {OrderService} from 'services/order-service'

export class Home {

    /**
     * Aurelia dependency injection
     *
     * @type {Array}
     */
    static inject = [OrderService, Router];

    /**
     * @type {Array}
     */
    orders = [];

    /**
     * @type {number}
     */
    offset = 0;

    /**
     * @type {number}
     */
    limit = 10;

    /**
     * @type {boolean}
     */
    loading = false;

    /**
     * Get instances
     *
     * @param orderService {OrderService}
     * @param router {Router}
     */
    constructor(orderService, router) {
        this.orderService = orderService;
        this.router = router;
        this.loadMoreOrders();
    }

    /**
     * Load orders depending on offset and limit (required for lazy loading)
     */
    loadMoreOrders() {
        this.loading = true;
        this.orderService.list(this.offset, this.limit).then(orders => {
            this.orders = this.orders.concat(orders);
            this.offset += orders.length;
            this.loading = false;
        });
    }
}
