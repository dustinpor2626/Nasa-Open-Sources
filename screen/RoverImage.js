import React, {Component} from 'react';

import {Text,ImageBackground,StyleSheet,View,FlatList,Image,Dimensions} from 'react-native';
import {AdMobInterstitial} from 'react-native-admob';


class RoverImage extends Component
{
  constructor(props){
    super(props);

    this.state = {
      data:[],
      height:Math.round(Dimensions.get('window').height)/2,
      wide: Math.round(Dimensions.get('window').width),
    }
  }



  componentDidMount(){

    var rov = this.props.navigation.state.params.rover ;
    var sols = parseInt(this.props.navigation.state.params.sol) ;
    var cam = this.props.navigation.state.params.camera ;
    var key = 'mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX';


    var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/'+rov+'/photos?sol='+sols+'&camera='+cam+'&api_key='+key;


    fetch(url)
    .then(res => res.json())
    .then(resjsn => {
        this.setState({data:resjsn.photos});
        this.props.navigation.setParams({length:this.state.data.length});
        this.props.navigation.setParams({date:resjsn.photos[0].earth_date});
        this.show();
      })

  }


  show(){
    AdMobInterstitial.setAdUnitID('ca-app-pub-1889245236113302/2552221235');
    AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
    AdMobInterstitial.requestAd().then(() => AdMobInterstitial.showAd());
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle : () => (<View><Text style={{fontSize:15,color:'white',paddingLeft:10,fontWeight:'bold'}}>Total Images Found  :   {navigation.getParam('length')} </Text>
                              <Text style={{fontSize:15,color:'white',paddingLeft:10,fontWeight:'bold'}}>Earth Date   :   {navigation.getParam('date')}</Text></View>),
    headerStyle:{
      backgroundColor:'rgba(25,25,112,0.9)',
    },
  })


    render(){


        return(

          <ImageBackground source={require('./images/space3.png')} style={{height:'100%',width:'100%'}} blurRadius={1} >

            <View style={styles.container}>

            <FlatList
              keyExtractor = {({item,index}) => 'key' + index}
              data = {this.state.data}
              initialNumToRender = {3}
              windowSize = {2}
              bounces = {true}
              showsVerticalScrollIndicator = {false}
              renderItem = {({item}) => {

                return(
                  <View
                      style={{
                        height:this.state.height - 60,
                        width:this.state.wide - 80,
                        borderRadius:15,
                        borderColor:'gray',
                        borderWidth:1,
                        marginTop:15,
                        marginBottom:10,
                        overflow:'hidden',
                        padding:2,
                      }}>
                        <Image source={{uri:item.img_src}} style={styles.img} />
                    </View>
                );
              }}

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

img:{
  height:'100%',
  width:'100%',
  resizeMode:'cover',
},

});

export default RoverImage;
