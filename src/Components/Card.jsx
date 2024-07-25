import React from 'react';

const Card = ({ item }) => {
    return (
        <div className="card">
            <img src={item.image} className="card-img-top" alt={item.title} />
            <div className="card-body">
                <h5 className="card-title">
                    {item.title}
                </h5>
                <p className="card-text">
                    {item.description}
                </p>
                <p className="card-text">
                    Date: {formatDate(item.date)}
                </p>
                <p className="card-text">
                    Location: {item.location}
                </p>
                <p className="card-text">
                    Price: ${item.price}
                </p>
            </div>
        </div>
    );
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

export default Card;
