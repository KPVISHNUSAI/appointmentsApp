import './index.css'
import {format} from 'date-fns'

const AppointmentItem = props => {
  const {appointmentDetails} = props
  const {id, titleName, dateAdded, isStarred} = appointmentDetails
  const formattedDateAdded = format(dateAdded, 'dd MMMM yyyy, EEEE')

  const onClickStar = () => {
    const {toggleIsStarred} = props
    toggleIsStarred(id)
  }

  return (
    <li className="appointment-item">
      <div className="item-container">
        <p className="title-sty">{titleName}</p>
        <p className="date-sty">Date: {formattedDateAdded}</p>
      </div>
      <div className="star-container">
        {isStarred === false ? (
          <img
            className="star-icon"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png"
            alt="star"
            onClick={onClickStar}
          />
        ) : (
          <img
            alt="star"
            className="star-icon"
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png"
            onClick={onClickStar}
          />
        )}
      </div>
    </li>
  )
}

export default AppointmentItem
