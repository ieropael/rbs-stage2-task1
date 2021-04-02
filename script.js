class good {
    constructor(id, title, quantity, cost) {
        this.id = id;
        this.title = title;
        this.quantity = quantity;
        this.cost = cost;
    }
}

let stock = [
    { id: 1, title: 'Ручка', quantity: 5, cost: 10 },
    { id: 2, title: 'Тетрадь', quantity: 5, cost: 30 },
    { id: 3, title: 'Блокнот', quantity: 5, cost: 20 },
    { id: 4, title: 'Папка', quantity: 5, cost: 100 },
    { id: 5, title: 'Скоросшиватель', quantity: 5, cost: 200 },
];

stock.push(new good(6, 'Файл', 5, 5));
console.log(stock);

let basket = [];

let summary = 0;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('stock-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('item')) {
            transfer(stock, basket, event.target);
        }
    });
    document.getElementById('basket-items').addEventListener('click', (event) => {
        if (event.target.classList.contains('item')) {
            transfer(basket, stock, event.target);
        }
    });
    refresh(stock, basket);
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
    summary = 0;
    for (let items of basket) {
        summary += items.cost * items.quantity;
    }
    document.getElementById('summary').innerHTML = 'Сумма: ' + summary;
}

// перемещение предметов
function transfer(fromStorage, toStorage, good) {
    fromStorage.forEach((item, i) => {
        if (Number(good.id) === item.id) {
            item.quantity--;
            addTo(toStorage, item);
            if (item.quantity <= 0) {
                fromStorage.splice(i, 1);
            }
            refresh(stock, basket);
        }
    });
}

// проверка наличия таких же предметов
function addTo(storage, item) {
    for (let i = 0; i < storage.length; i++) {
        if (storage[i].id === item.id) {
            storage[i].quantity++;
            return;
        }
    }
    storage.push({ id: item.id, title: item.title, quantity: 1, cost: item.cost });
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

// function transfer(fromStorage, toStorage, good) {
//     fromStorage.data.each(function (item) {
//         if (good.id === item.id) {
//             item.quantity--;
//             addTo(toStorage, item);
//             if (item.quantity <= 0) {
//                 fromStorage.remove(good.id);
//             }
//         }
//     });
//     fromStorage.refresh();
//     toStorage.refresh();
//     $$("summary").refresh();
// }
// function addTo(toStorage, item) {
//     if (toStorage.exists(item.id)) {
//         toStorage.getItem(item.id).quantity++;
//     } else {
//         toStorage.add({ id: item.id, title: item.title, quantity: 1, cost: item.cost });
//     }
//     $$("summary").getItem("sum").value = 0;
//     $$("basket").data.each(function (item) {
//         $$("summary").getItem("sum").value += item.cost * item.quantity;
//     });
// }