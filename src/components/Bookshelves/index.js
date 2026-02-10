import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'

import {Link} from 'react-router-dom'

import Context from '../../context/Context'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Footer from '../Footer'
import {IoMdSearch} from 'react-icons/io'
import BooksItem from '../BooksItem'
import {Redirect} from 'react-router-dom'
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  error: 'ERROR',
}
const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Bookshelves extends Component {
  static contextType = Context

  state = {
    searchInput: '',
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    bookshelfLabel: bookshelvesList[0].label,
    bookList: [],
    apiStatus: apiConstants.initial,
    filteredlist: [],
    isCategory: false,
  }

  componentDidMount() {
    this.getBooks()
  }

  tryAgain = () => {
    this.getBooks()
  }

  somethingWrong = error => {
    this.setState({
      apiStatus: apiConstants.error,
    })
  }

  renderError = () => {
    return (
      <div className="bg">
        <img src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png" />

        <p>Please went wrong, Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  onLabel = event => {
    console.log(event.target.id)

    console.log(event.target)

    console.log(event.target.value)

    const newValue = bookshelvesList.filter(e => e.id === event.target.id)[0]

    const {filteredlist} = this.state

    this.setState(
      {
        bookshelfName: newValue.value,
        bookshelfLabel: newValue.label,
        isCategory: true,
        booksList: filteredlist,
      },

      this.getBooks,

      this.nextFun,
    )
  }

  onName = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  noBooksView = () => {}

  successView = data => {
    const filteredList = data.books.map(e => ({
      authorName: e.author_name,

      coverPic: e.cover_pic,
      rating: e.rating,
      readStatus: e.read_status,
      title: e.title,
      id: e.id,
    }))

    const {commonBookList} = this.context

    this.setState(
      {
        booksList: filteredList,
        filteredlist: filteredList,
        apiStatus: apiConstants.success,
      },

      this.nextFun,
    )
  }

  nextFun = () => {
    const {booksList, bookList, filteredlist} = this.state

    const {getList, commonBookList} = this.context

    const {gettingList} = this.context
    if (gettingList) {
      const {filteredlist} = this.state
      getList(filteredlist)
    }
    console.log('common')

    let newVal
    if (booksList.length == filteredlist.length) {
      newVal = 0
    } else {
      newVal = filteredlist.findIndex(
        e => e.id == booksList[booksList.length - 1].id,
      )
    }

    console.log(newVal)
    console.log(commonBookList)

    console.log('commonBookList')

    this.setState(prevState => ({
      booksList: commonBookList.slice(newVal, newVal + 8),
    }))
  }

  failureView = () => {
    this.setState({
      apiStatus: apiConstants.failure,
    })
  }

  getBooks = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {bookshelfName, searchInput} = this.state
    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/?shelf=${bookshelfName}&search=${searchInput}`,
        options,
      )

      const data = await response.json()
      console.log(response)

      if (response.ok == true) {
        this.successView(data)
      } else {
        this.failureView(data)
      }
      console.log(data)
    } catch (e) {
      console.log(e)
      this.somethingWrong(e)
    }
  }

  onPrev = () => {
    const {filteredlist, booksList} = this.state

    const newVal = filteredlist.findIndex(e => e.id == booksList[0].id)

    console.log(newVal)

    if (newVal > 8) {
      this.setState({booksList: filteredlist.slice(newVal - 8, newVal)})
    }
  }

  onSearch = () => {
    const {searchInput} = this.state
    this.getBooks()
  }

  renderFailure = () => {
    return (
      <div className="bg">
        <img
          alt="failure view"
          src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png"
        />

        <p>Something went wrong. Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  onNext = () => {
    this.nextFun()
  }

  renderResult = () => {
    const {booksList, bookshelfLabel, bookList, bookshelfName, searchInput} =
      this.state

    return (
      <Context.Consumer>
        {value => {
          const {isNavClicked, commonBookList} = value

          console.log(commonBookList)

          return (
            <div className="book-shelve">
              {isNavClicked ? (
                <ul className="sm-header-list">
                  <Link className="li" to="/">
                    <li
                      className={
                        this.props.location.pathname === '/' ? 'selected' : null
                      }
                    >
                      Home
                    </li>
                  </Link>
                  <Link className="li" to="/shelf">
                    <li
                      className={
                        this.props.location.pathname === '/bookshelves'
                          ? 'selected'
                          : null
                      }
                    >
                      Bookshelves
                    </li>
                  </Link>
                  <li className="">
                    <button onClick={this.onLogout} className="logout-button">
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <div className="empty-cont"></div>
              )}

              <ul className="shelve-list">
                <h1>Bookshelves</h1>

                {bookshelvesList.map(e => (
                  <li
                    className={e.value === bookshelfName ? 'selected' : 'non'}
                    onClick={this.onLabel}
                    id={e.id}
                    key={e.id}
                    value={e.value}
                  >
                    {e.label}
                  </li>
                ))}
              </ul>

              <div className="books-cont">
                <div className="book-search">
                  <h1 className="bookshelf-label">{bookshelfLabel} Books</h1>
                  <div>
                    <div className="search-box">
                      <input
                        placeholder="Search"
                        className="search-input"
                        onChange={this.onName}
                        value={searchInput}
                        type="search"
                        role="searchbox"
                      />
                      <button
                        type="button"
                        testid="searchButton"
                        onClick={this.onSearch}
                      >
                        <BsSearch size={21} />
                      </button>
                    </div>
                  </div>
                </div>

                <ul className="book-shelves-list">
                  {bookshelvesList.map(e => (
                    <button
                      onClick={this.onLabel}
                      id={e.id}
                      value={e.value}
                      className={
                        e.value === bookshelfName
                          ? 'selected-book-shelve'
                          : 'non-selected-book-shelve'
                      }
                    >
                      {e.label}
                    </button>
                  ))}
                </ul>
                {booksList.length === 0 ? (
                  <div className="no-result-view">
                    <img
                      alt="no books"
                      className="no-img"
                      src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768895924/Asset_1_1_h0mr0a.png"
                    />
                    <p>
                      Your search for {searchInput} did not find any matches.
                    </p>
                  </div>
                ) : (
                  <div>
                    <ul className="books-list">
                      {booksList.map(e => (
                        <BooksItem item={e} key={e.id} />
                      ))}
                    </ul>

                    <div className="buttons-cont">
                      <button onClick={this.onPrev}>Prev</button>

                      <button onClick={this.onNext}>Next</button>
                    </div>
                  </div>
                )}

                <div className="foote2">
                  <Footer />
                </div>
              </div>

              <div className="foote">
                <Footer />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

  renderLoader = () => {
    return (
      <div className="bg" testid="loader">
        <Loader type="TailSpin" color="lightblue" />
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state
    console.log(apiStatus)
    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderResult()

      case 'FAILURE':
        return this.renderFailure()

      case 'ERROR':
        return this.renderError()
    }
  }
}

export default Bookshelves
