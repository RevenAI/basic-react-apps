import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const Content = () => {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem('shoppinglist');
        return savedItems ? JSON.parse(savedItems) : [
            { id: 1, checked: true, item: 'Samsung Mobile Phone' },
            { id: 2, checked: false, item: 'HP Laptop' },
            { id: 3, checked: false, item: '2 Bedroom flat' },
            { id: 4, checked: false, item: 'Beauty Unisex Bag' },
        ];
    });

    const updateLocalStorage = (updatedItems) => {
        setItems(updatedItems);
        localStorage.setItem('shoppinglist', JSON.stringify(updatedItems));
    };

    const handleCheck = (id) => {
        const listItems = items.map((item) =>
            item.id === id ? { ...item, checked: !item.checked } : item
        );
        updateLocalStorage(listItems);
    };

    const handleDelete = (id) => {
        const listItems = items.filter((item) => item.id !== id);
        updateLocalStorage(listItems);
    };

    const textStyle = (checked) => (checked ? { textDecoration: 'line-through' } : {});
    return (
        <main>
                <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                                style={textStyle(item.checked)}
                                onDoubleClick={() => handleCheck(item.id)}
                            >
                                {item.item}
                            </label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0"
                                aria-label={`Delete ${item.item}`}
                            />
                        </li>
                    ))}
                </ul>
                { items.length === 0 && <h4>Your cart is empty.</h4> }
        </main>
    );
};

export default Content;
