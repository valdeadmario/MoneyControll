import Money from './models/Money'
import Storage from './models/Storage'

import { elements} from "./views/base";
import * as moneyView from './views/moneyView'

const storage = new Storage();
const money = new Money(storage.getItemsFromLS());

const updateBudget = function () {
    let budget;
    // calculate budget
    money.calculateBudget();
    // get budget
    budget = money.getBudget();
    // display budget to UI
    moneyView.displayBudget(budget.budget, budget.income, budget.expence, budget.percentage);
}

const updatePercentage = function () {
    // calculate percentage in data structure
    money.calculatePercentage();
    // get all percentage
    let percentages = money.getPerc();
    // display percentage in user interface
    moneyView.displayPercentages(percentages);
}

const addNewItem = function (e) {
    let newItem;
    const input = moneyView.getInput();

    if (input.description !== '' && input.value > 0 && !isNaN(input.value)) {
        // add new item to data structure
        newItem = money.addNewItemToData(input.type, input.description, input.value);
        // add new item to user interface
        moneyView.addNewItemToList(newItem, input.type);
        // add new item to LS
        storage.addItemToLS(newItem, input.type);
        // clear input fields
        moneyView.clearFields();
        // recalculate budget
        updateBudget();
        // recalculate percentage
        updatePercentage();
        console.log(money.getData());
    }
    e.preventDefault()
}

const deleteItemFromList = function (e) {
    let item, itemType, itemID;
    item = e.target.parentNode.parentNode.parentNode.parentNode.id;
    if (item) {
        itemType = item.split('-')[0];
        itemID = item.split('-')[1];

        // delete item from data structure
        money.deleteItemFromData(itemType, itemID);
        // delete item from user interface
        moneyView.deleteItemFromUI(item);
        // delete item from LS
        storage.deleteItemFromLS(itemID, itemType);
        // recalculate budget
        updateBudget();
        // recalculate percentage
        updatePercentage();


    }
    e.preventDefault();
}

moneyView.displayBudget(0,0,0,0);
moneyView.displayMonth();
moneyView.reloadPage(money.getData().allItems);
updateBudget();

// event listener for aff button
document.querySelector(elements.addBtn).addEventListener('click', addNewItem);
// event listener for delete button
document.querySelector(elements.container).addEventListener('click', deleteItemFromList);
// event listener for type change
document.querySelector(elements.type).addEventListener('change', moneyView.changeType)
