import React, { useState, useEffect } from 'react';
import { ColorRing } from 'react-loader-spinner';
import { MdFilterAlt } from "react-icons/md";

const Cards = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const limit = 3;

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    const fetchPage = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=${limit}`);
            const data = await response.json();
            setItems(data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevious = () => {
        setCurrentPage(prevPage => prevPage > 1 ? prevPage - 1 : 1);
    };

    const searchItems = (searchValue) => {
        setInput(searchValue);
        filterItems(searchValue, selectedDate, selectedType);
    };

    const handleFilterByDate = (date) => {
        setSelectedDate(date);
        filterItems(input, date, selectedType);
    };

    const handleFilterByType = (type) => {
        setSelectedType(type);
        filterItems(input, selectedDate, type);
    };

    const filterItems = (searchValue, date, type) => {
        let filteredData = items;

        if (searchValue) {
            filteredData = filteredData.filter((item) =>
                Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
            );
        }

        if (date) {
            filteredData = filteredData.filter((item) => formatDate(item.date) === date);
        }

        if (type) {
            filteredData = filteredData.filter((item) => item.type === type);
        }

        setFilteredResults(filteredData);
    };

    const filterData = () => {
        setInput('');
        setSelectedDate('');
        setSelectedType('');
        fetchPage(currentPage);
    };

    return (
        <section className='card-section'>
            <div className='container'>
                <div className='bucket'>
                    <div className='left-bucket'>
                        <div className="dropdown">
                            <button className="common-button dropdown-toggle media-responsive" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter by Date
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    [...new Set(items.map((item) => formatDate(item.date)))].map((date, index) => {
                                        return (
                                            <li key={index}><a className="dropdown-item" onClick={() => handleFilterByDate(date)}>
                                                {date}
                                            </a></li>
                                        );
                                    })
                                }
                            </ul>
                        </div>

                        <div className="dropdown">
                            <button className="common-button dropdown-toggle media-responsive" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Filter by Type
                            </button>
                            <ul className="dropdown-menu">
                                {
                                    [...new Set(items.map((item) => item.type))].map((type, index) => {
                                        return (
                                            <li key={index}><a className="dropdown-item" onClick={() => handleFilterByType(type)}>
                                                {type}
                                            </a></li>
                                        );
                                    })
                                }
                            </ul>
                        </div>

                        <div>
                            <button className='common-button' onClick={filterData}>
                                <MdFilterAlt />
                            </button>
                        </div>
                    </div>

                    <div className='input-box'>
                        <input type="text" className="form-control" id="exampleInputEmail1" placeholder='Search retreats by title' value={input} onChange={(e) => searchItems(e.target.value)} />
                    </div>
                </div>
                <div className='row'>
                    {loading ? (
                        <div className='common-class'>
                            <ColorRing
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="color-ring-loading"
                                wrapperStyle={{}}
                                wrapperClass="color-ring-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                            />
                        </div>
                    ) : (
                        <>
                            {
                                (input.length > 1 || selectedDate || selectedType) ? (
                                    filteredResults.map((item, index) => {
                                        return (
                                            <div className='col-lg-4 col-md-6 mb-4' key={index}>
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
                                            </div>
                                        );
                                    })
                                ) : (
                                    items.map((item, index) => {
                                        return (
                                            <div className='col-lg-4 col-md-6 mb-4' key={index}>
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
                                            </div>
                                        );
                                    })
                                )
                            }
                        </>
                    )}
                </div>
                <div className='common-class button-box'>
                    <button
                        className={currentPage === 1 ? 'disabled' : 'common-button'}
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <button
                        className='common-button'
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Cards;
