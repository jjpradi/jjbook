import {Link} from 'react-router-dom'
import './index.css'

import Cookies from 'js-cookie'

import Context from '../../context/Context'

import {withRouter} from 'react-router-dom'

const Header = props => {
  console.log(props)

  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <Context.Consumer>
      {value => {
        const {changeContext, isNavClicked} = value

        const onTask = () => {
          changeContext()
        }

        return (
          <nav className="header">
            <Link to="/">
              <img
                alt="website logo"
                className="book-logo"
                src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768811821/Group_7731_cx4tmt.png"
              />
            </Link>

            <div className={isNavClicked ? `popup clicked-nav` : `popup`}>
              <img
                onClick={onTask}
                src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768986821/menu_1_rtvc1w.png"
              />
            </div>

            <ul className="header-list">
              <Link className="li" to="/">
                <li
                  className={
                    props.location.pathname === '/' ? 'selected' : null
                  }
                >
                  Home
                </li>
              </Link>
              <Link className="li" to="/shelf">
                <li
                  className={
                    props.location.pathname === '/bookshelves'
                      ? 'selected'
                      : null
                  }
                >
                  Bookshelves
                </li>
              </Link>
              <li className="">
                <button onClick={onLogout} className="logout-button">
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        )
      }}
    </Context.Consumer>
  )
}

export default withRouter(Header)
