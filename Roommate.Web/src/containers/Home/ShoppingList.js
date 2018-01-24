import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions/Shopping';
import ShoppingItem from '../../components/Home/ShoppingItem';
import { getIsShoppingListFetching } from '../../reducers/fetching';
import { getShoppingList, getName } from '../../reducers/Home/shopping';

class ShoppingList extends Component {
    componentDidMount() {
        const { fetchShoppingList } = this.props;
        fetchShoppingList();
    }

    render() {
        const { isShoppingListFetching, shoppingList, toggleItem, clearList, addItem, name, onItemNameBlur } = this.props;
        var isListEmpty = shoppingList.length == 0
        if (isShoppingListFetching && !shoppingList.length) {
            return (
                <div className="shopping shopping__loader">
                    Loading
                <div className="first-dot"></div>
                    <div className="second-dot"></div>
                    <div className="third-dot"></div>
                </div>
            );
        }
        return (
            <div className="shopping">
                <input onBlur={(event) => onItemNameBlur(event.target.value)} className="shopping__input"></input >
                {name ? < button className="shopping__button shopping__button--add" onClick={() => addItem(name)}>Dodaj</button> : < button disabled className="shopping__button shopping__button--add" onClick={() => addItem(name)}>Dodaj</button>}
                
                {isListEmpty &&
                    <div className="shopping__empty">Lista jest pusta.</div>
                }
                <ul className="shopping__list">
                    {shoppingList.map(item =>
                        <ShoppingItem
                            key={item.Id}
                            {...item}
                            onClick={() => toggleItem(item.Id)}
                            className= "shopping__item"
                        />
                    )}
                </ul>
                <button onClick={clearList} className="shopping__button shopping__button--clear">Wyczyść</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isShoppingListFetching: getIsShoppingListFetching(state),
        shoppingList: getShoppingList(state),
        name: getName(state)
    };
};

ShoppingList = withRouter(connect(
    mapStateToProps,
    actions
)(ShoppingList));

export default ShoppingList;