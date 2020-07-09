import React, {Component} from 'react';

import {Text,ImageBackground,StyleSheet,View,TouchableOpacity,ScrollView,Image,Modal} from 'react-native';
import {AdMobBanner} from 'react-native-admob';


class DayImage extends Component{

  state={
    x:255,
    y:255,
    z:100,
    modal:false,
}

componentDidMount() {
var rand1;
var rand2;
var rand3;

setInterval(() => {
   rand1 = 1 + Math.floor(Math.random()*254);
  this.setState({x:rand1});

   rand2 = 1 + Math.floor(Math.random()*254);
  this.setState({y:rand2});

   rand3 = 1 + Math.floor(Math.random()*254);
  this.setState({z:rand3});

},1000);

}


static navigationOptions = {
  header:null
}

  render(){
    return(

<View style={styles.container}>

<Modal
visible = {this.state.modal}
onRequestClose = {() => this.setState({modal:false})}
>
  <View style={styles.container}>


  <View style={styles.img_container}>
  <Image source={{uri:this.props.navigation.state.params.Img}} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
  </View>

    <View style={styles.header}>
    <Text style={styles.title}>{this.props.navigation.state.params.Img_title}</Text>
    </View>

    <AdMobBanner
  adSize="fullBanner"
  adUnitID="ca-app-pub-1889245236113302/2236742069"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
    <ScrollView style={{width:'100%'}}>
      <View style={styles.explanation}>
      <Text style={styles.explanation_text}>{this.props.navigation.state.params.Img_data}</Text>
      </View>
    </ScrollView>


  </View>


</Modal>


     <ImageBackground style={{resizeMode:'cover',height:'100%',width:'100%'}} source={{uri:this.props.navigation.state.params.Img}}>

       <View style={styles.img_data}>

       <Text style={{ color:'rgb(' + this.state.x +' ,' + this.state.y + ', ' + this.state.z + ')' ,}}>
        {this.props.navigation.state.params.Img_date}
       </Text>

       <TouchableOpacity
        onPress = {() => this.setState({modal:true})}
       >
       <Text style={{ marginLeft:220,color:'rgb(' + this.state.x +',' + this.state.y + ',' + this.state.z + ')' ,}}>About</Text>
       </TouchableOpacity>
       </View>


       </ImageBackground>


      </View>
    );

}
}

const styles = StyleSheet.create({

container:{
  height:'100%',
  width:'100%',
},

textstyle:{

},

header:{
  width:'100%',
  height:50,
  elevation:2,
  borderBottomWidth:0.5,
  borderColor:'gray',
  alignItems:'center',
  justifyContent:'center',
},

explanation:{
  width:'100%',
  height:'auto',
  paddingRight:20,
  paddingLeft:20,
  paddingBottom:20,
  paddingTop:5,
  backgroundColor:'black',
},

explanation_text:{
  color:'white',
  fontWeight:'bold',
  fontSize:16,
},

img_data:{
  marginLeft:10,
  marginTop:560,
  flex:1,
  flexDirection:'row',
},

img_container:{
  height:250,
  width:'100%',
  elevation:2,
},

});

export default DayImage;
