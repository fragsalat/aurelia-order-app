import {Router} from 'aurelia-router';
import {OrderService} from 'services/order-service';

export class Delete {

    /**
     * Aurelia dependency injection
     *
     * @type {Array}
     */
    static inject = [Router, OrderService];

    /**
     * @type {boolean}
     */
    deleting = false;

    /**
     * @type {number}
     */
    id = null;

    /**
     * Get dependency instances
     *
     * @param router {Router}
     * @param orderService {OrderService}
     */
    constructor(router, orderService) {
        this.router = router;
        this.orderService = orderService;
    }

    /**
     * Get object related to route parameter
     *
     * @param params {object}
     */
    activate(params) {
        this.id = params.id;
    }

    /**
     * Handles abort action
     */
    abort() {
        this.router.navigateToRoute('home');
    }

    /**
     * Handles proceed action and sends delete request to api
     */
    proceed() {
        this.deleting = true;
        this.orderService.remove(this.id).then(() => {
            this.router.navigateToRoute('home');
        });
    }
}
