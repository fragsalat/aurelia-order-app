import {HttpClient} from 'aurelia-http-client';

export class Main {

    /**
     * Aurelia dependency injection
     *
     * @type {Array}
     */
    static inject = [HttpClient];

    /**
     * Configure http client base url and content type
     *
     * @param httpClient {HttpClient}
     */
    constructor(httpClient) {
        httpClient.configure(config => {
            config.withBaseUrl('http://localhost:3002');
            config.withHeader('Content-Type', 'application/json');
        });
    }

    /**
     * Configure aurelia router by defining routes
     *
     * @param config {RouterConfiguration}
     * @param router {Router}
     */
    configureRouter(config, router) {
        config.title = 'Aurelia order sample';
        config.map([
            {
                route: '',
                name: 'home',
                moduleId: './views/home/home',
                nav: true,
                title: 'Home'
            },
            {
                route: '/create',
                name: 'createOrder',
                moduleId: './views/order/create',
                nav: true,
                title: 'Create order'
            },
            {
                route: '/edit/:id',
                name: 'editOrder',
                moduleId: './views/order/edit',
                nav: false,
                title: 'Edit order'
            },
            {
                route: '/delete/:id',
                name: 'deleteOrder',
                moduleId: './views/order/delete',
                nav: false,
                title: 'Delete order'
            }
        ]);

        this.router = router;
    }
}
