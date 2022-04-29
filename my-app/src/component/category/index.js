import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { getDataCategory, getDataBook, getDataBookmark } from '../../actions';

import './category.css';

const Category = ({ getDataCategory, getDataBook, getDataBookmark, categoryRed }) => {
  useEffect(() => {
    getDataCategory();
  },[]);

  return(
    <div className="category">
      <header class="title">Book Store</header>

      <div className="categories">
        {categoryRed && categoryRed.length > 0 ?
          categoryRed.map((item) => {
            return(
              <div
                key={item.id}
                className="categories-list"
                onClick={() => getDataBook(item.id)}
                role="button"
                tabIndex="0"
              >
                {item.name}
              </div>
            );
          }) :
          <tr>
            <td>Loading</td>
          </tr>
        }
        <div className="bookmarked" onClick={getDataBookmark}>Bookmarked</div>
      </div>
    </div>
  )
}

const mapStateToPops = (state) => {
  return {
    categoryRed: state.categoryRed,
  }
}

export default connect(mapStateToPops, { getDataCategory, getDataBook, getDataBookmark })(Category);