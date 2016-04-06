import {useView} from 'aurelia-framework';
import {Validation} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {OrderService} from 'services/order-service';
import {Create} from './create';

@useView('views/order/create.html')
export class Edit extends Create {

    /**
     * Aurelia dependency injection
     *
     * @type {Array}
     */
    static inject = [Validation, OrderService, Router];

    /**
     * @type {string}
     */
    method = 'edit';

    /**
     * @type {number}
     */
    id = null;

    /**
     * Get dependency instances
     * @param validation {Validation}
     * @param orderService {OrderService}
     * @param router {Router}
     */
    constructor(validation, orderService, router) {
        super(validation, orderService, router);
        this.orderService = orderService;
    }

    /**
     * Get object related to route parameter
     *
     * @param params {object}
     */
    activate(params) {
        this.orderService.get(params.id).then(order => {
            this.id = order.id;
            this.articleName = order.articleName;
            this.sku = order.sku;
            this.quantity = order.quantity;
            this.price = order.price;
        });
    }

    /**
     * Sends data to api
     *
     * @param data {object}
     */
    sendData(data) {
        this.orderService.edit(this.id, data).then(order => {
            alert('The order was updated.');
            this.router.navigateToRoute('home');
        });
    }
}
