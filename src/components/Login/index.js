import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
class Login extends Component {
  state = {username: '', password: '', errorMsg: ''}

  componentDidMount() {}

  successView = data => {
    console.log(data)
    console.log(data.jwt_token)
    Cookies.set('jwt_token', data.jwt_token, {expires: 30})

    const {history} = this.props

    history.replace('/')
  }

  failureView = errorMsg => {
    this.setState({
      errorMsg,
    })
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    console.log(username, password)

    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    console.log(options)

    const response = await fetch('https://apis.ccbp.in/login', options)

    console.log(response)
    const data = await response.json()

    console.log(data)
    if (response.ok === true) {
      this.successView(data)
    } else {
      this.failureView(data.error_msg)
    }
  }

  onName = event => {
    this.setState({username: event.target.value})
  }

  onPassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, errorMsg} = this.state
    return (
      <div className="login-page">
        <img
          className="login-img"
          alt="website login"
          src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768324567/Rectangle_1467_1_s9z6jl.png"
        />

        <div className="login-form">
          <form className="form" onSubmit={this.onLogin}>
            <img
              className="logo"
              alt="login website logo"
              src="https://res.cloudinary.com/dbbcdkvje/image/upload/v1768811821/Group_7731_cx4tmt.png"
            />
            <div className="field-input">
              <label htmlFor="name"> Username*</label>

              <input
                value={username}
                onChange={this.onName}
                className="input"
                id="name"
                type="text"
              />
            </div>

            <div className="field-input">
              <label htmlFor="password">Password*</label>

              <input
                value={password}
                onChange={this.onPassword}
                className="input"
                id="password"
                type="password"
              />
            </div>
            <div className="field-input button-field">
              {' '}
              <p className="errr">{errorMsg}</p>
              <button className="button input" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
