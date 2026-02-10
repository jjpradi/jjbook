import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import './index.css'
const Footer = () => {
  return (
    <div className="foot">
      <div className="lis">
        <ul className="ic-list">
          <FaGoogle className="icon-size" />

          <FaTwitter className="icon-size" />

          <FaInstagram className="icon-size" />

          <FaYoutube className="icon-size" />
        </ul>
      </div>
      <div>
        <p>Contact us</p>
      </div>
    </div>
  )
}

export default Footer
