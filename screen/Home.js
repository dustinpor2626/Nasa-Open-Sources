import React, {Component} from 'react';
import SwipeNews from './SwipeNews.js';
import MarsWeather from './Mars.js';
import Marsnews from './Marsnews.js';
import Menu from './Menu.js';
import * as firebase from 'firebase';
import NetInfo from '@react-native-community/netinfo';
import {AdMobBanner} from 'react-native-admob';

import {Text,ImageBackground,StyleSheet,View,TouchableOpacity,Alert,ScrollView,Image,Modal,ActivityIndicator,Dimensions} from 'react-native';

var firebaseConfig = {
  apiKey: "AIzaSyD5IuhEib_hs5PGOUtYEGMkXsZuG1En9Rc",
  authDomain: "keyastro-54de4.firebaseapp.com",
  databaseURL: "https://keyastro-54de4.firebaseio.com",
  projectId: "keyastro-54de4",
  storageBucket: "keyastro-54de4.appspot.com",
  messagingSenderId: "1050550818737",
  appId: "1:1050550818737:web:db42373c64d560f3140f90",
  measurementId: "G-MBQXTT1SY4"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig); 
  }

  

class Home extends Component{

state = {
  network:true,
  show:'Checking Internet Connection',
  wide: Math.round(Dimensions.get('window').width),
  height:Math.round(Dimensions.get('window').height),
}


componentDidMount()
{

    NetInfo.fetch()
    .then(isConnected => {
      setTimeout(() => this.setState({show:'Seems Slow/No Internet'}),10000);

            if(isConnected)
            {

              var url = "https://api.nasa.gov/planetary/apod?api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";

              fetch(url)
                .then((response) => response.json())
                .then((resjsn) => {
                  this.props.navigation.setParams({img:resjsn.url});
                  this.props.navigation.setParams({img_data:resjsn.explanation});
                  this.props.navigation.setParams({img_title:resjsn.title});
                  this.props.navigation.setParams({img_date:resjsn.date});
                })
                .then(() => this.setState({network:false}))

            }else{
              this.setState({show:'no network connection'});
              alert('no man');
            }
    })


  }




static navigationOptions =({navigation})=>
({
    headerTitle : () => (<Text style={{fontSize:22,color:'white',paddingLeft:10,fontWeight:'bold'}}>ASTRONOMY</Text>),
    headerRight:() => (
    <TouchableOpacity onPress={() => navigation.navigate('DayImage',{
        Img_data:navigation.getParam('img_data'),
        Img_title:navigation.getParam('img_title'),
        Img:navigation.getParam('img'),
        Img_date:navigation.getParam('img_date'),
    })}>
      <View style={styles.day_img}>
      <Image style={{resizeMode:'cover',height:'100%',width:'100%'}} source={{uri:navigation.getParam('img')}}></Image>
      </View>
      </TouchableOpacity>
  ),

  headerStyle:{
    backgroundColor:'rgba(25,25,112,0.9)',
  }
})

  render(){
    return(

      <ScrollView >
      <ImageBackground source={require('./images/space.jpg')} style={styles.img_background} >

 <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-1889245236113302/2236742069"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>

      <View style={{height:this.state.height,width:this.state.wide,paddingBottom:60}}>


      <Modal
        visible = {this.state.network}>

        <ImageBackground source={require('./images/space3.png')} style={{height:'100%',width:'100%',resizeMode:'cover'}} blurRadius={1} >
            <View style={{height:'100%',width:'100%',alignItems:'center',justifyContent:'center'}}>
              <ActivityIndicator size={60}  animation={true}  color='red' />
              <Text style={{color:'red',marginTop:10,fontWeight:'bold'}}>{this.state.show}</Text>
            </View>
        </ImageBackground>
     </Modal>



        <View style={styles.news_swipe}>
          <SwipeNews/>
          </View>

          <View style={styles.content}>

          <View style={{height:'18%',width:'100%',flexDirection:'row'}}>
                <TouchableOpacity
                  style={{height:'100%',width:'100%'}}
                  onPress = {() => this.props.navigation.navigate('RoverCam')} >
                      <View style={styles.menu}><Menu name='Mars Rover' /></View>
                </TouchableOpacity>

            </View>




            <View style={{height:'18%',width:'100%',flexDirection:'row'}}>
                  <TouchableOpacity
                    style={{height:'100%',width:'100%'}}
                    onPress = {() => this.props.navigation.navigate('AirPurity')} >
                        <View style={styles.menu2}><Menu name='Air Purity' /></View>
                  </TouchableOpacity>


              </View>

            <View style={styles.flip}>
                  <View style={styles.planetContainer}>

                    <TouchableOpacity
                      onPress ={() => this.props.navigation.navigate('Planet',{Planet:'mercure'})}>
                      <View style={styles.planet}><Text style={styles.Planet_text}>Mercury</Text></View>
                      </TouchableOpacity>


                    <TouchableOpacity
                       onPress ={() => this.props.navigation.navigate('Planet',{Planet:'neptune'})}>
                        <View style={styles.planet}><Text style={styles.Planet_text}>Neptune</Text></View>
                        </TouchableOpacity>


                        <TouchableOpacity
                          onPress ={() => this.props.navigation.navigate('Planet',{Planet:'jupiter'})}>
                          <View style={styles.planet}><Text style={styles.Planet_text}>Jupiter</Text></View>
                          </TouchableOpacity>


                  </View>


                  <View style={styles.planetContainer}>


                          <TouchableOpacity
                            onPress ={() => this.props.navigation.navigate('Planet',{Planet:'soleil'})}>
                            <View style={styles.planet}><Text style={styles.Planet_text}>Sun</Text></View>
                            </TouchableOpacity>

                            <TouchableOpacity
                              onPress ={() => this.props.navigation.navigate('Planet',{Planet:'mars'})}>
                              <View style={styles.planet}><Text style={styles.Planet_text}>Mars</Text></View>
                              </TouchableOpacity>

                              <TouchableOpacity
                              onPress ={() => this.props.navigation.navigate('Planet',{Planet:'terre'})}>
                              <View style={styles.planet}><Text style={styles.Planet_text}>Earth</Text></View>
                              </TouchableOpacity>


                          <TouchableOpacity
                            onPress ={() => this.props.navigation.navigate('Planet',{Planet:'lune'})}>
                            <View style={styles.planet}><Text style={styles.Planet_text}>Moon</Text></View>
                            </TouchableOpacity>
                  </View>


                    <View style={styles.planetContainer}>




                          <TouchableOpacity
                            onPress ={() => this.props.navigation.navigate('Planet',{Planet:'pluton'})}>
                            <View style={styles.planet}><Text style={styles.Planet_text}>Pluto</Text></View>
                            </TouchableOpacity>


                            <TouchableOpacity
                              onPress ={() => this.props.navigation.navigate('Planet',{Planet:'saturne'})}>
                              <View style={styles.planet}><Text style={styles.Planet_text}>Saturn</Text></View>
                              </TouchableOpacity>


                              <TouchableOpacity
                                onPress ={() => this.props.navigation.navigate('Planet',{Planet:'venus'})}>
                                <View style={styles.planet}><Text style={styles.Planet_text}>Venus</Text></View>
                                </TouchableOpacity>
                    </View>


            </View>
            <View style={styles.nasa_news}>
              <View style={styles.nasa_tech_header}>
                    <View style={styles.nasa_tech_img}>
                          <Image source={require('./images/nasa.png')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View><Text style={{fontSize:12,fontWeight:'bold'}}>Patents,Software and Tech Reports</Text></View>
              </View>
              <View style={{width:'100%',height:'80%'}}>
                  <Marsnews/>
              </View>
            </View>
          </View>

          <View style={styles.help}>
              <View style={styles.mars_weather}>
              <MarsWeather/>
              </View>

              <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('Gps')}>
              <View style={styles.location}><Image source={require('./images/location1.png')} style={{height:'100%',width:'100%',resizeMode:'cover'}} /></View>
              </TouchableOpacity>

          </View>

          <View style={{height:80,width:'100%',marginBottom:10}}></View>


      </View>
      </ImageBackground>

      </ScrollView>

    );
  }
}

const styles = StyleSheet.create({

  day_img:{
    width:36,
    height:36,
    borderRadius:18,
    marginRight:15,
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'white',
    elevation:3,
    overflow:'hidden',
  },

  news_swipe:{
    height:'23%',
    width:'100%',
    backgroundColor:'rgba(255,0,0,0.1)',
  },

  location:{
    height:64,
    width:64,
    backgroundColor:'rgba(255,255,255,0.9)',
    borderRadius:32,
    marginTop:-10,
    elevation:5,
  },

  content:{
    height:'60%',
    width:'100%',
  },

  help:{
    height:'14%',
    width:'100%',
    flexDirection:'row',
    marginTop:60,
  },

  mars_weather:{
    height:'100%',
    width:'73%',
    backgroundColor:'orange',
    marginRight:5,
  },

  menu:{
    height:'95%',
    width:'100%',
    backgroundColor:'silver',
    marginTop:-2,
  },

  menu2:{
    height:'95%',
    width:'100%',
    backgroundColor:'silver',
    marginBottom:2,
  },

  flip:{
    height:'42%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.3)',
    paddingTop:5,
    marginTop:1,
  },

  nasa_news:{
    height:'35%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
  },

  planetContainer:{
    width:'100%',
    height:'33%',
    flexDirection:'row',
    justifyContent:'center',
  },

  planet:{
    height:'70%',
    width:'auto',
    borderRadius:10,
    backgroundColor:'black',
    marginTop:4,
    marginBottom:4,
    marginRight:10,
    marginLeft:10,
    paddingTop:5,
    paddingRight:8,
    paddingLeft:8,
    borderColor:'white',
    borderWidth:2,
  },

  Planet_text:{
    color:'white',
  },

  img_background:{
    height:'100%',
    width:'100%',
  },

  nasa_tech_header:{
    width:'100%',
    height:'20%',
    backgroundColor:'yellow',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row',
  },

nasa_tech_img:{
  height:'80%',
  width:'6%',
  borderRadius:10,
  backgroundColor:'red',
  overflow:'hidden',
}

});

export default Home;
