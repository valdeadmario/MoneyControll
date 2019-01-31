

export default class Money {
    constructor(items) {
        this.data = {
            allItems: items,
            totals: {
                inc: 0,
                exp: 0
            },
            budget: 0,
            percentage: -1
        }
    }
    calculateTotal(type) {
        let total = 0;
        this.data.allItems[type].forEach( (item) => {
            total += item.value;
        })
        this.data.totals[type] = total;
    }

    getData () {
        return this.data;
    }

    getBudget() {
        return {
            budget: this.data.budget,
            income: this.data.totals.inc,
            expence: this.data.totals.exp,
            percentage: this.data.percentage
        }
    }

    addNewItemToData(type, descr, value) {
        let item, ID = 0;
        if (this.data.allItems[type].length > 0 ) {
            ID = this.data.allItems[type][this.data.allItems[type].length - 1].id + 1;
        }
        if (type === 'exp') {
            item = new Expense(ID, descr,value)
        }else if (type === 'inc') {
            item = new Income(ID, descr,value)
        }
        this.data.allItems[type].push(item);
        return item;
    }

    calculateBudget() {
        this.calculateTotal('exp');
        this.calculateTotal('inc');

        this.data.budget = this.data.totals.inc - this.data.totals.exp;
        if (this.data.totals.inc !== 0) {
            this.data.percentage = Math.round((this.data.totals.exp / this.data.totals.inc) * 100);
        }else {
            this.data.percentage = -1;
        }
    }

    calculatePercentage() {
        if (this.data.allItems.exp.length > 0) {
            this.data.allItems.exp.forEach( (item) => {
                item.calculatePercentage(this.data.totals.inc);

            })
        }
    }

    getPerc() {
        let percentages = this.data.allItems.exp.map( (item) => {
            return item.getPercentage();
        })
        return percentages;
    }

    deleteItemFromData(type, id) {
        this.data.allItems[type].forEach( (item,index) => {
            if (item.id === parseInt(id)) {
                this.data.allItems[type].splice(index, 1);
            }
        })
    }
}

class Income {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
}

class Expense {
    constructor(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    calculatePercentage(income) {
        if (income > 0) {
            this.percentage = Math.round((this.value / income) * 100)
        }else {
            this.percentage = -1;
        }
    }

    getPercentage() {
        return this.percentage;
    }
}