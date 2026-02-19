import {Component} from 'react'
import Cookies from 'js-cookie'
import './index.css'
import Footer from '../Footer'
import Context from '../../context/Context'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'
const apiConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
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
class BookDetails extends Component {
  state = {bookDetails: {}, apiStatus: apiConstants.initial}
  componentDidMount() {
    this.getDetails()
  }

  successView = data => {
    const e = data.book_details
    const filteredlist = {
      aboutAuthor: e.about_author,
      aboutBook: e.about_book,
      authorName: e.author_name,
      coverPic: e.cover_pic,
      readStatus: e.read_status,
      title: e.title,
      rating: e.rating,
      id: e.id,
    }

    this.setState({bookDetails: filteredlist, apiStatus: apiConstants.success})
  }

  failureView = () => {
    this.setState({
      apiStatus: apiConstants.failure,
    })
  }

  getDetails = async () => {
    const jwtToken = Cookies.get('jwtToken')
    const options = {
      method: 'GET',

      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const {match} = this.props

    console.log(match.params)
    try {
      const response = await fetch(
        `https://apis.ccbp.in/book-hub/books/${match.params.id}`,
        options,
      )
console.log(options)

      console.log(response)
      const data = await response.json()

      if (response.ok === true) {
        this.successView(data)
      } else {
        this.failureView(data)
           console.log(response.json().errMsg)

      }
    } catch (e) {
      this.failureView()
    }
  }

  renderSuccess = () => {
    const {bookDetails} = this.state

    let {
      authorName,

      coverPic,

      readStatus,

      title,

      rating,

      aboutBook,

      aboutAuthor,
      id,
    } = bookDetails

    return (
      <Context.Consumer>
        {value => {
          const {changeStatus, readstatus, ischanged, commonBookList} = value

          console.log(readstatus)

          const onChangeStatus = event => {
            console.log(readstatus, bookDetails.id)

            changeStatus(bookDetails.id, event.target.value)
          }

          return (
            <div className="book-details-bg">
              <div className="book-details">
                <div className="book-info">
                  <img alt={title} className="books-img" src={coverPic} />

                  <div>
                    <h5>{title}</h5>
                    <p>{authorName}</p>
                    <p>
                      Avg Rating
                      <BsFillStarFill className="star-logo" size={9} />
                      {rating}
                    </p>

                    <p>
                      Status:
                      <select onChange={e => onChangeStatus(e)}>
                        {bookshelvesList.map(e => (
                          <option
                            selected={readStatus === e.label}
                            value={e.label}
                            id={e.label}
                          >
                            {e.label}
                          </option>
                        ))}
                      </select>
                      <span className="span-item">
                        {ischanged ? readstatus : readStatus}{' '}
                      </span>
                    </p>
                  </div>
                </div>
                <hr className="hr" />
                <div>
                  <h1>About Author</h1>
                  <p>{aboutAuthor}</p>
                </div>
                <hr className="hr" />
                <div>
                  <h1>About Book</h1>
                  <p>{aboutBook}</p>
                </div>
              </div>

              <Footer className="footer-part" />
            </div>
          )
        }}
      </Context.Consumer>
    )
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

  renderLoader = () => {
    return (
      <div className="bg" testid="loader">
        <Loader type="TailSpin" />
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

      default:
        return null
    }
  }
}
export default BookDetails
