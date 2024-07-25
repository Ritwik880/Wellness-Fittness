import React from 'react'

const Pagination = ({currentPage, handlePrevious, handleNext}) => {
    return (
        <div className='common-class button-box'>
            <button
                className={currentPage === 1 ? 'disabled' : 'common-button'}
                onClick={handlePrevious}
                disabled={currentPage === 1}>
                Previous
            </button>
            <button
                className='common-button'
                onClick={handleNext}>
                Next
            </button>
        </div>
    )
}

export default Pagination