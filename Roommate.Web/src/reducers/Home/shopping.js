import { combineReducers } from 'redux';

const shoppingList = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_SHOPPING_LIST_SUCCESS':
            return action.response;
        case 'ADD_SHOPPING_ITEM':
            return [...state, action.response];
        case 'TOGGLE_SHOPPING_ITEM':
            var items = state;
            console.log('aaaaa ' + items);
            for (let i; items.length; i++)
            {
                if (items[i].Id == action.response) {
                    items[i].IsCompleted = !items[i].IsCompleted;
                }
            }
            console.log('xxxx ' + items);
            return items;
        case 'CLEAR_SHOPPING_LIST':
            return [];
        default:
            return state;
    }
};

const name = (state = null, action) => {
    switch (action.type) {
        case 'ITEM_NAME_CHANGE':
            return action.response;
        default:
            return state;
    }
};

const shopping = combineReducers({
    shoppingList,
    name
});

export default shopping;
export const getShoppingList = (state) => state.home.shopping.shoppingList;
export const getName = (state) => state.home.shopping.name;
