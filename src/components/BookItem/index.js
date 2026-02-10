import './index.css'

import {Link} from 'react-router-dom'

const BookItem = props => {
  const {item} = props

  const {title, id, authorName, coverPic} = item
  return (
    <Link className="link" to={`/books/${id}`}>
      {' '}
      <li className="single-book-item">
        <img alt={title} className="cover-pic" src={coverPic} />

        <h1 className="book-title">{title}</h1>

        <p>{authorName}</p>
      </li>
    </Link>
  )
}

export default BookItem
