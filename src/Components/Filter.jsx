
import React from "react";
import { MdFilterAlt } from 'react-icons/md';

const Filter = ({
    input,
    selectedDate,
    selectedType,
    searchItems,
    handleFilterByDate,
    handleFilterByType,
    filterData,
    items,
}) => {
    
    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <div className='bucket'>
            <div className='left-bucket'>
                <div className="dropdown">
                    <button className="common-button dropdown-toggle media-responsive" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by Date
                    </button>
                    <ul className="dropdown-menu">
                        {
                            [...new Set(items.map((item) => formatDate(item.date)))].map((date, index) => (
                                <li key={index}>
                                    <a
                                        className={`dropdown-item ${selectedDate === date ? 'active' : ''}`}
                                        onClick={() => handleFilterByDate(date)}
                                    >
                                        {date}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div className="dropdown">
                    <button className="common-button dropdown-toggle media-responsive" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Filter by Type
                    </button>
                    <ul className="dropdown-menu">
                        {
                            [...new Set(items.map((item) => item.type))].map((type, index) => (
                                <li key={index}>
                                    <a
                                        className={`dropdown-item ${selectedType === type ? 'active' : ''}`}
                                        onClick={() => handleFilterByType(type)}
                                    >
                                        {type}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                <div>
                    <button className='common-button' onClick={filterData}>
                        Filter <MdFilterAlt style={{marginBottom: '4px'}}/>
                    </button>
                </div>
            </div>

            <div className='input-box'>
                <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder='Search retreats by title'
                    value={input}
                    onChange={(e) => searchItems(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Filter
