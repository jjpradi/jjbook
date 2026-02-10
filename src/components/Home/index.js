import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import Footer from '../Footer'
import {Link} from 'react-router-dom'
import './index.css'

import {BsSearch} from 'react-icons/bs'
import Context from '../../context/Context'
const apiConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const quoteTypes = [
  'Best quotes',
  'Love quotes',
  'Inspirational quotes',
  'Funny quotes',
  'Motivational quotes',
  'Life quotes',
  'Friends quotes',
  'Positive quotes',
  'More quotes',
]
import BookItem from '../BookItem'

let settings = {
  slidesToShow: 3,
  slidesToScroll: 3,
  speed: 500,
  dots: true,
  infinite: true,
}

class Home extends Component {
  state = {
    topBooks: [],
    currentBooks: [],
    apiStatus: apiConstant.initial,
    isError: false,
    quoteInput: 'inspire',
    quoteList: [],
    currentQuote: '',
  }

  componentDidMount() {
    this.getBooks()
  }

  tryAgain = () => {
    this.setState({apiStatus: apiConstant.initial})
    this.getBooks()
  }

  failureView = () => {
    this.setState({
      apiStatus: apiConstant.failure,
    })
  }

  successView = data => {
    const filteredList = data.books.map(e => ({
      authorName: e.author_name,
      coverPic: e.cover_pic,
      id: e.id,
      title: e.title,
    }))

    this.setState({
      topBooks: filteredList,
      currentBooks: filteredList.slice(0, 3),
      apiStatus: apiConstant.success,
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
    const options2 = {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'goodreads12.p.rapidapi.com',
        'x-rapidapi-key': '4668c942ecmshee3785fb0217015p104bb4jsn6106c87cb2e5',
      },
    }

    try {
      const response = await fetch(
        'https://apis.ccbp.in/book-hub/top-rated-books',

        options,
      )

      const data = await response.json()

      console.log(data)

      if (response.ok === true) {
        this.successView(data)
      } else {
        this.failureView()
      }
    } catch (e) {
      this.failureView()
    }
  }

  renderLoader = () => {
    return (
      <div className='bg' testid='loader'>
        <Loader type='TailSpin' color='#0284C7' height={50} width={50} />
      </div>
    )
  }

  onFind = () => {
    const {history} = this.props
    history.replace('/shelf')
  }

  onNext = () => {
    console.log(this.props)

    const {topBooks, currentBooks} = this.state
    console.log(topBooks, currentBooks)

    const newIndex = topBooks.findIndex(
      e => e.id === currentBooks[currentBooks.length - 1].id,
    )

    console.log(newIndex)
    if (newIndex + 1 !== topBooks.length) {
      this.setState({
        currentBooks: topBooks.slice(newIndex + 1, newIndex + 4),
      })
    }
  }
  onQuote = event => {
    const newInput = event.target.id.slice(0, -4)

    this.setState({quoteInput: newInput}, this.getBooks)
  }

  onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }
  onPrev = () => {
    const {topBooks, currentBooks} = this.state

    console.log(topBooks, currentBooks)

    const newIndex = topBooks.findIndex(
      e => e.id === currentBooks[currentBooks.length - 1].id,
    )

    console.log(newIndex)

    if (newIndex !== 3) {
      this.setState({
        currentBooks: topBooks.slice(newIndex - 4, newIndex - 1),
      })
    }
  }

  renderSuccess = () => {
    const {
      topBooks,
      apiStatus,
      currentBooks,
      currentQuote,
      isError,
      quoteList,
      quoteInput,
    } = this.state

    console.log(currentQuote, quoteList)

    return (
      <Context.Consumer>
        {value => {
          const {isNavClicked} = value

          return (
            <div className='home-page'>
              {isNavClicked ? (
                <ul className='sm-header-list'>
                  <Link className='li' to='/'>
                    <li
                      className={
                        this.props.location.pathname === '/' ? 'selected' : null
                      }
                    >
                      Home
                    </li>
                  </Link>
                  <Link className='li' to='/shelf'>
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
                  <li className=''>
                    <button onClick={this.onLogout} className='logout-button'>
                      Logout
                    </button>
                  </li>
                </ul>
              ) : (
                <div className='empty-cont'></div>
              )}
              <div>
                <h2>Find Your Next Favorite Books?</h2>

                <p>
                  You are in the right place. Tell us what titles or genres you
                  have enjoyed in the past, and we will give you surprisingly
                  insightful recommendations.
                </p>

                <div className='find-btn-2'>
                  <button className='find-button' onClick={this.onFind}>
                    Find Books
                  </button>
                </div>
              </div>

              <div className='books-bg'>
                <div className='top-books-header'>
                  <h2>Top Rated Books</h2>

                  <div className='find-btn'>
                    <button className='find-button' onClick={this.onFind}>
                      Find Books
                    </button>
                  </div>
                </div>

                <div className='slider-cont'>
                  {isError ? (
                    this.renderFailure()
                  ) : (
                    <div className='slider'>
                      <Slider {...settings}>
                        {topBooks.map(e => (
                          <BookItem key={e.id} item={e} />
                        ))}
                      </Slider>
                    </div>
                  )}
                </div>
              </div>
              <div>
                <div>
                  <h3>Quotes</h3>
                </div>
              </div>

              <div className='footer-part'>
                <Footer />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }

  renderFailure = () => {
    return (
      <div className='bg'>
        <img
          alt='failure view'
          className='error-image'
          src='https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897944/Group_7522_ywwtft.png'
        />

        <p>Something went wrong. Please try again</p>
        <button onClick={this.tryAgain}> Try Again</button>
      </div>
    )
  }

  render() {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case 'INITIAL':
        return this.renderLoader()

      case 'SUCCESS':
        return this.renderSuccess()

      case 'FAILURE':
        return this.renderFailure()
    }
  }
}

export default Home
