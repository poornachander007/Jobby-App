import './index.css'

const notFoundUrl =
  'https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png'
//  alt should be not found

const NotFound = () => (
  <div className="notFound_container">
    <img className="notFound_image" alt="not found" src={notFoundUrl} />
    <h1 className="notFound_heading">Page Not Found</h1>
    <p className="notFound_description">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
