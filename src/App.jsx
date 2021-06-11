import React, { Component } from 'react';
import Navigation from './components/navigation/navigation';
import Register from './components/Register/register';
import SignIn from './components/SignIn/sign-in.jsx';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/image-link-form';
import Rank from './components/Rank/rank.jsx';
import FaceRecognition from './components/FaceRecognition/face-recognition.jsx';

import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

import './App.css';

const app = new Clarifai.App({
  apiKey: 'cde1cdfab7874e1581f1e4496b8377d4',
});

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800,
      },
    },
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      botomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onButtonSubmit = () => {
    console.log(this.state.imageUrl);
    this.setState({ imageUrl: this.state.input });
    app.models
      .predict('e15d0f873e66047e579f90cf82c9882z', this.state.input)
      .then((response) => this.displayBox(this.calculateFaceLocation(response)))
      .catch((err) => console.log(err));
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({ isSignedIn: false });
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  render() {
    const { isSignedIn, route, box, imageUrl } = this.state;

    return (
      <div className='App'>
        <Particles params={particlesOptions} className='particles' />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange}
        />
        {route === 'home' ? (
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRecognition box={box} imageUrl={imageUrl} />
          </div>
        ) : route === 'signin' ? (
          <SignIn onRouteChange={this.onRouteChange} />
        ) : (
          <Register onRouteChange={this.onRouteChange} />
        )}
      </div>
    );
  }
}

export default App;
