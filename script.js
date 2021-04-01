let stock = [
    { id: 1, title: 'Ручка', quantity: 30, cost: 10 },
    { id: 2, title: 'Тетрадь', quantity: 20, cost: 30 },
    { id: 3, title: 'Блокнот', quantity: 25, cost: 20 },
    { id: 4, title: 'Папка', quantity: 10, cost: 100 },
    { id: 5, title: 'Скоросшиватель', quantity: 5, cost: 200 },
];
let basket = [];

let summary = 0;

const stockItems = document.getElementById('stock-items');
const basketItems = document.getElementById('basket-items');

document.addEventListener('DOMContentLoaded', () => {
    refresh(stock, basket)
});

stockItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('item')) {
        transfer(stock, basket, event);
    }
});

basketItems.addEventListener('click', (event) => {
    if (event.target.classList.contains('item')) {
        transfer(basket, stock, event);
    }
});

// обновление таблицы
function refresh(stock, basket) {
    document.getElementById('stock-items').innerHTML = '';
    document.getElementById('basket-items').innerHTML = '';
    stock.forEach((item, i) => {
        document.getElementById('stock-items').appendChild(createElement(item, i))
    });
    basket.forEach((item, i) => {
        document.getElementById('basket-items').appendChild(createElement(item, i))
    });
    for (let items of basket) {
        summary += items.cost * items.quantity;
    }
    document.getElementById('summary').innerHTML = 'Сумма: ' + summary;
    summary = 0;
}

// перемещение предметов
function transfer(fromStorage, toStorage, event) {
    fromStorage.forEach((item, i) => {
        if (event.target.id == item.id) {
            item.quantity--;
            checkTransfer(toStorage, item);
            if (item.quantity <= 0) {
                fromStorage.splice(i, 1);
            }
            refresh(stock, basket);
        }
    });
}

// проверка наличия таких же предметов
function checkTransfer(storage, item) {
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id == item.id) {
            storage[i].quantity++;
            return;
        }
    }
    storage.push(JSON.parse(JSON.stringify(item)));
    storage[storage.length - 1].quantity = 1;
}

// создание ячеек
function createElement(item, i) {
    // создание ячейки номера предмета
    let itemNumber = document.createElement('div');
    itemNumber.className = 'item item-number';
    itemNumber.innerHTML = i + 1;
    itemNumber.id = item.id;

    // создание ячейки названия предмета
    let itemTitle = document.createElement('div');
    itemTitle.className = 'item item-title';
    itemTitle.innerHTML = item.title;
    itemTitle.id = item.id;

    // создание ячейки количества предметов
    let itemQuantity = document.createElement('div');
    itemQuantity.className = 'item item-quantity';
    itemQuantity.innerHTML = item.quantity;
    itemQuantity.id = item.id;

    // создание ячейки стоимости предмета
    let itemCost = document.createElement('div');
    itemCost.className = 'item item-cost';
    itemCost.innerHTML = item.cost;
    itemCost.id = item.id;

    // создание ячейки id предмета
    let itemField = document.createElement('div');
    itemField.className = 'item item-field';
    itemField.id = item.id;

    // создание строки с данными предмета
    itemField.appendChild(itemNumber);
    itemField.appendChild(itemTitle);
    itemField.appendChild(itemQuantity);
    itemField.appendChild(itemCost);

    return itemField;
}