import React from 'react'
import './user.scss'
import { handleErrors } from '@utils/fetchHelper'

// NOTE TO ME will need to heck the booking endpoint
// to see if is paid working 

class UserBooking extends React.Component  {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      booking: {},
      show: false
    }
    this.getUser = this.getUser.bind(this)
    this.getBooking = this.getBooking.bind(this)
  }
    
  componentDidMount() {
    this.getUser()
    this.getBooking()
  }
  
  getUser() {
    fetch(`/api/users/${this.props.user_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          user: data.user,
          loading: false,
        })
      }) 
  }

  getBooking() {
    fetch('/api/bookings')
      .then(handleErrors)
      .then(data => {
        console.log(data)
        this.setState({
          booking: data.booking,
          loading: false,
        })
      }) 
  }

  
  _showForm = (bool) => {
    this.setState({
      showForm: bool
    });
  }

  render() {
  
    return (
      <div className="">
        <div className="my-3">

        </div>
      </div>
    )
  }
}

export default UserBooking