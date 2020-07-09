import React, {Component} from 'react';
import  getloc from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {AdMobBanner,AdMobInterstitial} from 'react-native-admob';

import {Text,ImageBackground,StyleSheet,View,Alert,ScrollView,Image,Modal} from 'react-native';

class Gps extends Component{

  state = {
    latitude:0,
    longitude:0,
    data:[],
    area:'',
    gps:true,
  }


componentDidMount(){

RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval:10000,fastInterval:5000})
.then(data => {

        getloc.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,
      })
      .then(location => {
        this.setState({latitude:location.latitude,longitude:location.longitude});
        this.show();
      })
      .catch(error => {
        const { code, message } = error;
        console.warn(code, message);
      })
      .then(() => {

          var url = 'https://api.ipgeolocation.io/astronomy?apiKey=4d5e6de6f7e246f2ac7d569a00876786&lat='
             +this.state.latitude+'&long='
             +this.state.longitude+'';

      fetch(url)
      .then(res => res.json())
      .then(resjsn => this.setState({data:resjsn}))
      })
      .then(() =>{

        var uri = 'https://api.openweathermap.org/data/2.5/weather?lat='
        +this.state.latitude+'&lon='
        +this.state.longitude+'&appid=7af03c11cb0e1c859a3a511364dbc609';

        fetch(uri)
        .then(res => res.json())
        .then(resjsn => this.setState({area:resjsn.name}))
      }).then(() =>   this.setState({gps:false}))

}).catch(e => {
  this.props.navigation.navigate('Home');
  alert('Location Invalid');
})

}

show(){
  AdMobInterstitial.setAdUnitID('ca-app-pub-1889245236113302/2552221235');
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
}


static navigationOptions = () => ({
  headerTitle : () => (<Text style={{fontSize:18,color:'white',paddingLeft:10,fontWeight:'bold'}}>Current Location Info</Text>),
  headerStyle:{
    backgroundColor:'rgba(25,25,112,0.9)',
  },
})


  render(){
    return(
      <ImageBackground source={require('./images/nature.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} blurRadius={2} >

      <View style={styles.container}>

<Modal
  visible = {this.state.gps}>

  <ImageBackground source={require('./images/location3.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}}  >
  </ImageBackground>
    </Modal>

          <ScrollView style={{width:'100%'}}>
              <View style={{height:'100%',width:'100%',alignItems:'center',paddingBottom:20}} >
                <View style={styles.img_container}>
                      <View style={styles.img}>
                          <Image source={require('./images/sunrise.jpeg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View style={styles.img_data}>
                      <Text style={styles.text} >Sun Rise  :  {this.state.data.sunrise}</Text>
                      </View>
                </View>

                <View style={styles.img_container}>
                      <View style={styles.img}>
                          <Image source={require('./images/sunset.jpeg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View style={styles.img_data}>
                      <Text style={styles.text} >Sun Set  :  {this.state.data.sunset}</Text>
                      </View>
                </View>


                <View style={styles.img_container}>
                      <View style={styles.img}>
                          <Image source={require('./images/day_time.jpeg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View style={styles.img_data}>
                      <Text style={styles.text} >Day Length  :  {this.state.data.day_length}</Text>
                      </View>
                </View>


                <View style={styles.img_container}>
                      <View style={styles.img}>
                          <Image source={require('./images/temp.jpeg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View style={styles.img_data}>
                      <Text style={styles.text} >Solar Noon  :  {this.state.data.solar_noon}</Text>
                      </View>
                </View>


                <View style={styles.img_container}>
                      <View style={styles.img}>
                          <Image source={require('./images/moonrise.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                      </View>
                      <View style={styles.img_data}>
                      <Text style={styles.text} >Moon Rise  :  {this.state.data.moonrise}</Text>
                      </View>
                </View>

                <View style={styles.last}>
                    <Text style={styles.text} >Moon Set :  {this.state.data.moonset}</Text>
                </View>


                <View style={styles.last}>
                    <View style={styles.location_img}><Image source={require('./images/location.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} /></View>
                    <Text style={styles.text}>  {this.state.area} </Text>
                </View>

                <Text style={styles.text}>Latitude : {this.state.latitude}</Text>

                    <Text style={styles.text}>Longitude : {this.state.longitude}</Text>

              </View>
          </ScrollView>

          <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-1889245236113302/2236742069"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
      </View>

      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({

container:{
  height:'100%',
  width:'100%',
  alignItems:'center',
},

img_container:{
  height:250,
  width:'85%',
  backgroundColor:'white',
  borderRadius:15,
  marginTop:20,
  marginBottom:10,
  alignItems:'center',
  overflow:'hidden',
  justifyContent:'center',
  borderColor:'black',
  borderWidth:1,
},

img:{
  height:'85%',
  width:'100%',
  backgroundColor:'black',
},

img_data:{
  height:'15%',
  width:'100%',
  backgroundColor:'red',
  alignItems:'center',
  justifyContent:'center',
},


last:{
  height:50,
  width:'auto',
  paddingRight:20,
  paddingLeft:20,
  borderRadius:25,
  backgroundColor:'black',
  alignItems:'center',
  justifyContent:'center',
  margin:20,
  flexDirection:'row',

},

text:{
  color:'white',
  fontWeight:'bold',
},

location_img:{
  height:20,
  width:20,
  borderRadius:10,
  overflow:'hidden',
}
});

export default Gps;
