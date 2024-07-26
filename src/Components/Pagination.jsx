import React from 'react'

const Pagination = ({ currentPage, maxPage, handlePrevious, handleNext }) => {
    return (
        <div className='common-class button-box'>
            <button
                className={currentPage === 1 ? 'disabled' : 'common-button'}
                onClick={handlePrevious}
                disabled={currentPage === 1}>
                Previous
            </button>
            <button
                className={currentPage === maxPage ? 'disabled' : 'common-button mobile-css'}
                onClick={handleNext}
                disabled={currentPage === maxPage}>
                Next
            </button>
        </div>
    )
}

export default Pagination
