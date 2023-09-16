import {Component} from 'react'

import './index.css'

import {v4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    title: '',
    date: '',
    starredFilter: false,
  }

  handleAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const dateAdded = new Date(date)
    const newAppointment = {
      id: v4(),
      titleName: title,
      dateAdded,
      isStarred: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  onChangeAppointmentTitle = event => {
    this.setState({title: event.target.value})
  }

  onChangeAppointmentDate = event => {
    this.setState({date: event.target.value})
  }

  handleToggleStarFilter = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  filterStarredAppointments = () => {
    this.setState(prevState => ({
      starredFilter: !prevState.starredFilter,
    }))
  }

  //   renderAppointmentsList = () => {
  //     const {appointmentsList, starredFilter} = this.state
  //     const sortedAppointments = [...appointmentsList].sort((a, b) => {
  //       if (starredFilter) {
  //         if (a.isStarred && !b.isStarred) {
  //           return -1
  //         }
  //         if (!a.isStarred && b.isStarred) {
  //           return 1
  //         }
  //       }
  //       return 0
  //     })

  //     return sortedAppointments.map(eachAppointment => (
  //       <AppointmentItem
  //         key={eachAppointment.id}
  //         appointmentDetails={eachAppointment}
  //         toggleIsStarred={this.handleToggleStarFilter}
  //       />
  //     ))
  //   }

  renderAppointmentsList = () => {
    const {appointmentsList, starredFilter} = this.state
    const filteredAppointments = starredFilter
      ? appointmentsList.filter(appointment => appointment.isStarred)
      : appointmentsList

    return filteredAppointments.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        appointmentDetails={eachAppointment}
        toggleIsStarred={this.handleToggleStarFilter}
      />
    ))
  }

  render() {
    const {title, date, appointmentsList, starredFilter} = this.state
    return (
      <div className="main-container">
        <div className="content-container">
          <div className="form-img-container">
            <form
              className="form-container"
              onSubmit={this.handleAddAppointment}
            >
              <h1>Add Appointments</h1>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                value={title}
                id="title"
                className="title-input"
                placeholder="Title"
                onChange={this.onChangeAppointmentTitle}
              />
              <label htmlFor="date">Date</label>
              <input
                className="date-input"
                type="date"
                value={date}
                id="date"
                onChange={this.onChangeAppointmentDate}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <div className="display-block-container">
              <img
                className="appointment-img"
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="line" />
          <h1>Appointments</h1>
          <div className="appointments-header">
            <button
              className={`starred-btn ${
                starredFilter === true ? 'active' : 'inactive'
              }`}
              type="button"
              data-testid="star"
              onClick={this.filterStarredAppointments}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-container">
            {appointmentsList.length > 0 ? (
              this.renderAppointmentsList()
            ) : (
              <p>No appointments available</p>
            )}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
