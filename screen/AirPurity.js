import React, {Component} from 'react';
import  getloc from 'react-native-get-location';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import {AdMobInterstitial} from 'react-native-admob';
import * as firebase from 'firebase';


import {Text,ImageBackground,StyleSheet,View,Alert,ScrollView,Image,Modal} from 'react-native';



class TakeAttendance extends Component
{


  state = {
    latitude:0,
    longitude:0,
    img:require('./images/air.jpeg'),
    data:[],
    content:[],
    gps:true,
    key:'',
  }



  componentDidMount(){

    firebase.database().ref('keys/val')
    .on('value',data => this.setState({key:data.val()}))
    .then(() => {
      this.show();
      this.start();
    });

  }



show(){
  AdMobInterstitial.setAdUnitID('ca-app-pub-1889245236113302/2552221235');
  AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
  AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
}


  start(){

    RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({interval:10000,fastInterval:5000})
    .then(data => {

          getloc.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
        })
        .then(location => {
          this.setState({latitude:location.latitude,longitude:location.longitude});
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })
        .then(() => {

          var url = 'http://api.airpollutionapi.com/1.0/aqi?lat='
                    +this.state.latitude+'&lon='
                    +this.state.longitude+'&APPID=' + this.state.key;

              fetch(url)
              .then(res => res.json())
              .then(resjsn => {
                this.setState({data:resjsn.data});
                this.setState({content:this.state.data.aqiParams});
              })
        }).then(() =>  this.setState({gps:false}))



    }).catch(e => {
      this.props.navigation.navigate('Home');
      alert('Location Invalid');
    })
  }




  static navigationOptions = () => ({
    headerTitle : () => (<Text style={{fontSize:18,color:'white',paddingLeft:10,fontWeight:'bold'}}>Location Air Quality</Text>),
    headerStyle:{
      backgroundColor:'rgba(25,25,112,0.9)',
    },
  })

    render(){
        
        return(
          <ImageBackground source={require('./images/nature.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}} blurRadius={2} >
          <ScrollView>
              <View style={styles.img_container}>

              <Modal
                visible = {this.state.gps}>
                <ImageBackground source={require('./images/location3.jpg')} style={{height:'100%',width:'100%',resizeMode:'cover'}}  >
                </ImageBackground>
                </Modal>


              <Image source={this.state.img} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
              </View>

              <View style={styles.content}>
                    <View style={styles.alert}><Text style={styles.text}>{this.state.data.alert}</Text></View>
                    <View style={styles.text_container}><Text style={styles.text}>Last Updated : {this.state.data.updated}</Text></View>
                    <View style={styles.text_container}><Text style={styles.text}>Temperature : {this.state.data.temp} Cel</Text></View>
                    <View style={styles.text_container}><Text style={styles.text}>Accuracy : {this.state.data.accuracy}</Text></View>
                    <View style={styles.text_container}><Text style={styles.text}>Domination in air : {this.state.data.dominating}</Text></View>
                    <View style={styles.content_header}><Text style={{color:'white'}}>Content in Air</Text></View>

{this.state.content.map((data,index) => {

  return(

    <View style={styles.content_container} key = {index}>
        <Text style={styles.content_text}>Name  :  {data.name}</Text>
        <Text style={styles.content_text}>Amount :  {data.value}</Text>
        <Text style={styles.content_text}>{data.text}</Text>
    </View>

  );
})}

              </View>
          </ScrollView>

          </ImageBackground>
        );

    }
}

const styles = StyleSheet.create({


  img_container:{
    height:150,
    width:'100%',
    elevation:2,
    borderBottomColor:'black',
    borderBottomWidth:1,
  },

  content:{
    width:'100%',
    alignItems:'center',
    paddingBottom:30,
  },

  text:{
    color:'black',
    fontWeight:'bold',
  },

  alert:{
    paddingTop:10,
    paddingLeft:30,
    paddingRight:30,
    paddingBottom:10,
    justifyContent:'center',
    alignItems:'center',
    height:80,
    borderRadius:40,
    backgroundColor:'white',
    marginTop:5,
    marginBottom:5,
    marginLeft:15,
    marginRight:15,
  },

  text_container:{
    paddingLeft:20,
    paddingRight:20,
    alignItems:'center',
    justifyContent:'center',
    borderRadius:25,
    height:50,
    backgroundColor:'white',
    marginBottom:2,
  },

  content_header:{
    height:25,
    width:'100%',
    backgroundColor:'black',
    alignItems:'center',
    justifyContent:'center',
    marginTop:15,
    marginBottom:10,
  },

  content_container:{
    paddingRight:30,
    paddingBottom:20,
    paddingTop:20,
    paddingLeft:30,
    backgroundColor:'white',
    borderRadius:10,
    alignItems:'center',
    justifyContent:'center',
    marginBottom:5,
  },

  content_text:{
    color:'black',
    fontWeight:'bold',
    marginBottom:8,
  }

});

export default TakeAttendance;
