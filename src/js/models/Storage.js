export default class Storage {

    getItemsFromLS() {
        let items = {
            inc: [],
            exp: []
        };
        if (localStorage.getItem('items') !== null) {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    addItemToLS (item, type) {
        let items = {
            inc: [],
            exp: []
        };
        if (localStorage.getItem('items') !== null) {
            items = JSON.parse(localStorage.getItem('items'));
        }
        items[type].push(item);
        localStorage.setItem('items', JSON.stringify(items))
    }

    deleteItemFromLS(deletedItemID, type) {
        let items = {
            inc: [],
            exp: []
        };
        if (localStorage.getItem('items') !== null) {
            items = JSON.parse(localStorage.getItem('items'));
        }
        items[type].forEach( (item, index) => {
            if (item.id === parseInt(deletedItemID)) {
                items[type].splice(index, 1)
            }
        })
        localStorage.setItem('items', JSON.stringify(items))
    }
}