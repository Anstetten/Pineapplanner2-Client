import React from "react";
import Logo from "../components/Base/Logo/Logo";

class Home extends React.Component {
  render() {
    return (
      <div className='homeWrapper'>
      <h1>Welcome to <Logo size="large"/></h1>
      </div>
    );
  }
}

export default Home;
