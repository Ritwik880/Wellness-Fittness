import React, { useState, useEffect } from 'react';
import Card from './Card';
import Filter from './Filter';
import Loading from './Loading';
import Pagination from './Pagination';

const Cards = () => {
    const [items, setItems] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredResults, setFilteredResults] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [maxPage, setMaxPage] = useState(1);

    const limit = 3;

    const fetchPage = async (page) => {
        try {
            setLoading(true);
            const response = await fetch(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${page}&limit=${limit}`);
            const data = await response.json();
            setLoading(false);

            if (data.length === 0) {
                setMaxPage(currentPage);
            } else {
                setItems(data);
                setMaxPage(currentPage + (data.length < limit ? 0 : 1));
            }
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPage(currentPage);
    }, [currentPage]);

    const handleNext = () => {
        if (currentPage < maxPage) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevious = () => {
        setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : 1));
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

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <section className='card-section'>
            <div className='container'>
                <Filter
                    input={input}
                    selectedDate={selectedDate}
                    selectedType={selectedType}
                    searchItems={searchItems}
                    handleFilterByDate={handleFilterByDate}
                    handleFilterByType={handleFilterByType}
                    filterData={filterData}
                    items={items}
                />
                <div className='row'>
                    {loading ? (<Loading />) : (
                        <>
                            {
                                (input.length > 1 || selectedDate || selectedType) ? (
                                    filteredResults.map((item, index) => (
                                        <div className='col-lg-4 col-md-6 mb-4' key={index}>
                                            <Card item={item} />
                                        </div>
                                    ))
                                ) : (
                                    items.map((item, index) => (
                                        <div className='col-lg-4 col-md-6 mb-4' key={index}>
                                            <Card item={item} />
                                        </div>
                                    ))
                                )
                            }
                        </>
                    )}
                </div>
                <Pagination currentPage={currentPage} handlePrevious={handlePrevious} handleNext={handleNext} maxPage={maxPage} />
            </div>
        </section>
    );
};

export default Cards;
