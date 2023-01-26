import React from 'react'
import { Container } from "reactstrap";
import PassengerForm from '../../components/Passenger/PassengerForm'
import "../../components/Passenger/passenger.css"

const HomeView = () => {
  return (
    <>
    <Container id="pageContainer">
      <Container id="formContainer">
        <PassengerForm />
      </Container>
    </Container>        
    </>
  )
}

export default HomeView