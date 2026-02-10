import {Redirect, withRouter, Link} from 'react-router-dom'
import './index.css'
const NotFound = props => {
  const onHome = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="not-found">
      <div className="bg">
        <img
          alt="not found"
          src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768897238/Group_7484_wiooal.png"
        />

        <h1>Page Not Found</h1>
        <p>
          we are sorry, the page you requested could not be found,Please go back
          to the homepage.
        </p>
        <Link>
          {' '}
          <button onClick={onHome}> Go Back to Home</button>
        </Link>
      </div>
    </div>
  )
}

export default withRouter(NotFound)
