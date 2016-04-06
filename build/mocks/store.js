'use strict';

class Store {

    constructor() {
        this.data = [];
    }

    get(id) {
        return this.data.find(obj => obj.id == id);
    }

    add(obj) {
        this.data.push(obj);
    }
    
    put(id, obj) {
        var index = this.data.findIndex(obj => obj.id == id);
        if (index != -1) {
            this.data[index] = obj;
        }
    }

    remove(id) {
        var index = this.data.findIndex(obj => obj.id == id);
        if (index != -1) {
            this.data.splice(index, 1);
        }
    }
}

module.exports = Store;
