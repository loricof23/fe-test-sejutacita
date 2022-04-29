import './pagination.css';

const Pagination = ({
  activePage,
  onNext,
  onPrev,
}) => {
  return(
    <div className="pagination-page">
      <div className="pagination">
        <button
          className="btn-pagination"
          disabled={activePage === 0}
          onClick={onPrev}
        >
          Prev
        </button>
        <button
          className="btn-pagination"
          onClick={onNext}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default Pagination;