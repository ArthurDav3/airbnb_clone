// bookingWidget.jsx
import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

class UserCheckoutWidget extends React.Component {
  state = {
    authenticated: false,
    booking: {},
    startDate: "",
    endDate: "",
    loading: false,
    error: false,
  }

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        })
      })
    // this.getPropertyBookings()
    this.getBooking()
  }

  getBooking = () => {
    fetch(`/api/bookings/${this.props.booking_id}`)
    .then(handleErrors)
    .then(data =>{
      this.setState({
        booking: data.booking
      })
    })
  }

  submitBooking = (e) => {
    if (e) { e.preventDefault(); }
    const { start_date, end_date } = this.state.booking;

    fetch(`/api/bookings/${this.props.booking_id}`, safeCredentials({
      method: 'POST',
        body: JSON.stringify({
          booking: {
            property_id: this.props.property_id,
            start_date: this.state.booking.start_date,
            end_date: this.state.booking.end_date,
          }
        })
    }))
      .then(handleErrors)
      .then(response => {
        return this.initiateStripeCheckout(response.booking.id)
      })
      .catch(error => {
        console.log(error);
      })
  }

  initiateStripeCheckout = (booking_id) => {
    return fetch(`/api/charges?booking_id=${booking_id}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

        stripe.redirectToCheckout({
          // Make the id field from the Checkout Session creation API response
          // available to this file, so you can provide it as parameter here
          // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          // If `redirectToCheckout` fails due to a browser or network
          // error, display the localized error message to your customer
          // using `result.error.message`.
        });
      })
      .catch(error => {
        console.log(error);
      })
  }
  render () {
    const { authenticated } = this.state;
    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      );
    };

    return (
      <div className="p-4 mb-4">
        <form onSubmit={this.submitBooking}>
          <button type="submit" className="btn btn-small btn-danger">Unpaid</button>
        </form>
      </div>
    )
  }
}

export default UserCheckoutWidget