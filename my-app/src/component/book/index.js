import { connect } from "react-redux";
import React, { useEffect, useState } from 'react';

import Pagination from "../pagination";

import { getDataBook, getNextPageBooks, getPrevPageBooks } from "../../actions";

import './book.css';

const Book = ({
  bookRed,
  getDataBook,
  getNextPageBooks,
  getPrevPageBooks,
  isLoading,
  page,
}) => {
  const [bookmarkedBooks, setBookmarkedBooks] = useState([]);

  useEffect(() => {
    getDataBook();

    setBookmarkedBooks(JSON.parse(localStorage.getItem('bookmarkedBooks')) || []);
  },[]);

  function makeBookmark(id) {
    const newValue = JSON.stringify([...bookmarkedBooks, id]);

    setBookmarkedBooks([...bookmarkedBooks, id]);

    localStorage.setItem('bookmarkedBooks', newValue);
  }

  const renderBookmarkedButton = (item) => {
    if (bookmarkedBooks.length > 0 && bookmarkedBooks.includes(item.id)) {
      return <div className="book-bookmarked">Bookmarked</div>;
    } 

    return <button className="btn-bookmark" onClick={() => makeBookmark(item.id)}>Bookmark</button>;
    
  }

  const renderBooks = () => {
    if (!isLoading) {
      if (bookRed.status === 200) {
        return (
          <div className="list">
            { bookRed.data.map((item) => (
                <div className="box">
                  <div className="title">{item.title}</div>
                  <div className="content">
                    <div className="cover">
                      <img src={item.cover_url} alt="image"></img>
                    </div>
      
                    <div className="description">
                      {renderBookmarkedButton(item)}
                      <div className="author">{item.authors[0]}</div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        );
      } else {
        return(<div className="statusText">{bookRed.statusText}</div>);
      }
    } 

    return (
      <div>Loading...</div>
    )
  }

  const shouldRenderPagination = bookRed.status === 200;

  return(
    <div className="book container">
      <header className="head-title">Books</header>

      <div className="search-container">
        <input type="text" placeholder="Search..."/>
      </div>

      {renderBooks()}

      {shouldRenderPagination &&
        <Pagination
          activePage={page}
          onNext={getNextPageBooks}
          onPrev={getPrevPageBooks}
        />
      }
    </div>
  )
}

const mapStateToPops = (state) =>{
  return {
    bookRed: state.bookRed,
    isLoading: state.isLoading,
    page: state.page,
  }
}

export default connect(mapStateToPops, { getDataBook, getNextPageBooks, getPrevPageBooks })(Book);