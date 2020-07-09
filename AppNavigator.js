import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';


import Home from './screen/Home.js';
import DayImage from './screen/DayImage.js';
import RoverCam from './screen/RoverCam.js';
import SwipeNews from './screen/SwipeNews.js';
import AirPurity from './screen/AirPurity.js';
import Gps from './screen/Gps.js';
import Planet from './screen/Planet.js';
import RoverImage from './screen/RoverImage.js';




const AppNavigator = createStackNavigator({
  Home:Home,
  DayImage:DayImage,
  RoverCam :RoverCam,
  AirPurity:AirPurity,
  SwipeNews:SwipeNews,
  Gps:Gps,
  Planet:Planet,
  RoverImage:RoverImage,
},
{
  initialRouteName:'Home',
}

);

export default createAppContainer(AppNavigator);
