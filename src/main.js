/**
 * Configure aurelia framework
 *
 * @param aurelia {FrameworkConfiguration}
 */
export function configure(aurelia) {
    aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('aurelia-validation');

    aurelia.start().then(() => aurelia.setRoot());
}
