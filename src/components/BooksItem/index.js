import './index.css'
import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
const BooksItem = props => {
  const {item} = props

  const {coverPic, authorName, rating, readStatus, title, id} = item

  return (
    <Link className="link" to={`/books/${id}`}>
      <li className="books-item">
        <img alt={title} className="books-img" src={coverPic} />

        <div className="books-item-details">
          <h1 id="#h" className="h5">
            {title}
          </h1>

          <p className="para">{authorName}</p>
          <p className="p">
            Avg Rating : <BsFillStarFill className="star-logo" size={9} />{' '}
            {rating}
          </p>
          <p className="p">
            status : <span className="span">{readStatus}</span>
          </p>
        </div>
      </li>
    </Link>
  )
}

export default BooksItem
