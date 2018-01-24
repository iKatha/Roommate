import React from 'react';

const ShoppingItem = ({ onClick, IsCompleted, Name, className }) => (
    <li
        className={className}
        onClick={onClick}
        style={{
            textDecoration: IsCompleted ? 'line-through' : 'none'
        }}
    >
        {Name}
    </li>
);

export default ShoppingItem;