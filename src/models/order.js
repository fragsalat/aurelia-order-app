export class Order {

    /**
     * @type {number}
     */
    id = null;

    /**
     * @type {string}
     */
    articleName = null;

    /**
     * @type {string}
     */
    sku = null;

    /**
     * @type {number}
     */
    quantity = 0;

    /**
     * @type {number}
     */
    price = 0;

    /**
     * @type {string}
     */
    status = 'pending';

    /**
     * Simply assign data to instance
     *
     * @param data object
     */
    constructor(data: Object) {
        Object.assign(this, data);
    }
}
