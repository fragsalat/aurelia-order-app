import {Validation} from 'aurelia-validation';
import {Router} from 'aurelia-router';
import {OrderService} from 'services/order-service';

export class Create {

    /**
     * Aurelia dependency injection
     *
     * @type {Array}
     */
    static inject = [Validation, OrderService, Router];

    /**
     * @type {string}
     */
    method = 'create';

    /**
     * @type {string}
     */
    articleName = '';

    /**
     * @type {string}
     */
    sku = '';

    /**
     * @type {number}
     */
    quantity = 0;

    /**
     * @type {number}
     */
    price = 0.0;

    /**
     * Get instances and initialize form validation
     *
     * @param validation {Validation}
     * @param orderService {OrderService}
     * @param router {Router}
     */
    constructor(validation, orderService, router) {
        this.orderService = orderService;
        this.router = router;
        this.validation = validation.on(this)
            .ensure('articleName')
                .hasLengthBetween(10, 100)
                .isNotEmpty()
            .ensure('sku')
                .containsOnlyAlphanumerics()
            .ensure('quantity')
                .isNumber()
                .isNotEmpty()
            .ensure('price')
                .isNumber()
                .isNotEmpty();
    }

    /**
     * Handles form submission event and collects data
     *
     * @param event {Event}
     */
    onSubmit(event: Event) {
        this.validation.validate().then(() => {
            let data = {
                articleName: this.articleName,
                sku: this.sku,
                quantity: this.quantity,
                price: this.price
            };

            this.sendData(data);
        }, errors => {
            throw new Error('Invalid shit');
        });
    }

    /**
     * Sends data to api
     *
     * @param data {object}
     */
    sendData(data) {
        this.orderService.create(data).then(order => {
            alert('The order was created.');
            this.router.navigateToRoute('home');
        });
    }
}
