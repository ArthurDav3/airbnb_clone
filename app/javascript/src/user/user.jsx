// user.jsx
import React from 'react';
import Layout from '@src/layout';
import { handleErrors } from '@utils/fetchHelper';
import './user.scss';


class User extends React.Component  {
  state = {
    user: {},
    loading: true,
  } 

  componentDidMount() {
    fetch(`/api/users/${this.props.user_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          user: data.user,
          loading: false,
        })
      }) 
  }

  getUserBookings() {
    fetch(`/api/bookings/`)
    .then(handleErrors)
    .then(data => {
      this.setState({
        propert
      })
    })
  }

  render() {
    
    const { user, loading } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      username,
      email
    } = user

    return (
      <Layout>    
        <div className="container pt-4 mt-4 ">
        <div className="row pt-4 mt-4">
          <h2>User Profile</h2>
          <div className="col-md-6 pt-4 mt-4">
            <h3>Username: </h3><h4 key={user.id}>{user.username}</h4>
            <h3>Email: </h3><h4 key={user.email}>{user.email}</h4>
            <h3>Booking</h3><h4></h4>
          </div>
          <div className="col-md-6">

          </div>
        </div>
          
        </div> 
      </Layout>
    )
     
      
  }
} 

export default User;