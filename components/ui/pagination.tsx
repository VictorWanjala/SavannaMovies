import React from 'react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination: React.FC<PaginationProps> = (props) => {
  return (
    <div className='max-w-2xl mx-auto flex items-center justify-between gap-4 mt-8'>
      <button
        onClick={props.onPrevious}
        disabled={props.currentPage === 1}
        className='px-4 border-2 border-secondary py-2 bg-gray-800 text-white rounded disabled:opacity-50'
      >
        Previous
      </button>
      <span className='text-white'>
        Page {props.currentPage} of {props.totalPages}
      </span>
      <button
        onClick={props.onNext}
        disabled={props.currentPage === props.totalPages}
        className='px-4 py-2 border-2 border-secondary bg-gray-800 text-white rounded disabled:opacity-50'
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
