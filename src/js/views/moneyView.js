import {elements} from "./base";

export const getInput = () => {
    return {
        type: document.querySelector(elements.type).value,
        description: document.querySelector(elements.description).value,
        value: parseFloat(document.querySelector(elements.value).value)
    }
}

export const addNewItemToList = (newItem, type) => {
    let container;
    let itemList = `<li class="item" id="${type}-${newItem.id}">
                                <p class="item__description">${newItem.description}</p>
                                <div class="wrap">
                                     <div class="wrapper">
                                         <span class="item__value">${formatNumber(type, newItem.value)}</span>
                                         ${type === 'exp' ? `<span class="item__percentage">${type}</span>` : ''}
                                     </div>
                                     <div class="item__delete">
                                         <button class="item__delete--btn"><i class="fas fa-trash-alt" style="font-size:20px;color:gray"></i></button>
                                     </div>
                                </div>
                            </li>`
    if (type === 'exp') {
        container = elements.expensesList;
    }else {
        container = elements.incomeList;
    }
    document.querySelector(container).insertAdjacentHTML('beforeend', itemList)
}

export const deleteItemFromUI = (selectorID) => {
    document.getElementById(selectorID).remove();
}

export const clearFields =  () => {
    document.querySelector(elements.description).value = '';
    document.querySelector(elements.value).value = '';
}

export const displayBudget = (budget, inc, exp, percentage) => {
    let type;

    (budget > 0) ? type = 'inc' : type = 'exp'

    document.querySelector(elements.budget).innerHTML = formatNumber(type, budget);
    document.querySelector(elements.incomeBudget).innerHTML = formatNumber('inc', inc);
    document.querySelector(elements.expenseBudget).innerHTML = formatNumber('exp', exp);
    if (percentage > 0) {
        document.querySelector(elements.percentageBudget).innerHTML = `${percentage}%`;
    }else {
        document.querySelector(elements.percentageBudget).innerHTML = '...';
    }
}

export const displayPercentages = percentages => {

    const itemList = Array.from(document.querySelectorAll(elements.percentageItem));
    itemList.forEach( (item, index) => {
        if (percentages[index] > 0){
            item.textContent = `${percentages[index]}%`;
        }else {
            item.textContent = '...';
        }
    })
}

export const displayMonth = () => {
    let year, month, num;
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    const dateNow = new Date();

    year = dateNow.getFullYear();
    month = months[dateNow.getMonth()];
    num = dateNow.getDate();


    document.querySelector(elements.date).textContent = `${num} ${month} ${year}`;

}

export const changeType = () => {
    // get all input fields in array
    const allFields = Array.from(document.querySelectorAll(`${elements.type},${elements.value},${elements.description}`));

    allFields.forEach( (item) => {
        item.classList.toggle('red-focus')
    })

}

export const formatNumber = (type, number) => {
    let intPart, decimalPart;
    number = Math.abs(number).toFixed(2);
    intPart = number.split('.')[0]
    decimalPart = number.split('.')[1]


    if (intPart.length > 3) {
        number = `${intPart.substring(0,intPart.length -3)},${intPart.substring(intPart.length -3)}.${decimalPart}`
    }
    return `${type === 'exp' ? '-' : '+'} ${number}`
}

export const reloadPage = items => {
    items.inc.forEach( (item) => {
        addNewItemToList(item, 'inc')
    })
    items.exp.forEach( (item) => {
        addNewItemToList(item, 'exp')
    })
}