import React, {Component} from 'react';
import Html from 'react-native-render-html';

import {StyleSheet,View,TouchableOpacity,ScrollView,Dimensions,FlatList,Image,Modal} from 'react-native';


class App extends Component
{
  state = {
    data:[],
    wide: Math.round(Dimensions.get('window').width),
    modal:false,
    img_url:'',
    img_title:'',
    img_text:'',
  }


componentDidMount(){
  var url = "https://api.nasa.gov/techtransfer/patent/?engine&api_key=mvIAWs1R9FXLxuUs7GKlknamPe8fL0ZnmbQGkzeX";

  fetch(url)
  .then(res => res.json())
  .then(resjsn => {
    this.setState({data:resjsn.results});
  }).then(() => {


      var x = this.state.data.length;
      var rand =  Math.floor(Math.random()*x);
      var scroll = rand*this.state.wide;
      setTimeout(() => {
        this.scrollview.scrollToOffset({offset:scroll,animated:false});
      },0);

  })


}

modalData = (url,title,text) =>  {
  this.setState({img_url:url});
  this.setState({img_title:title});
  this.setState({img_text:text});
  this.setState({modal:true});
}



    render(){
        return(
<View style={{height:'100%',width:'100%'}}>

<Modal
  visible = {this.state.modal}
  onRequestClose = {() => this.setState({modal:false})}
>

<View style={styles.container}>

<View style={styles.img_container2}>
<Image source={{uri:this.state.img_url}} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
</View>

  <View style={styles.header}>
        <Html html={this.state.img_title} style={styles.title}/>
  </View>

  <ScrollView style={{width:'100%'}}>
    <View style={styles.explanation}>
        <Html html={this.state.img_text} />
    </View>
  </ScrollView>

</View>

</Modal>

          <FlatList
            data = {this.state.data}
            horizontal
            ref = {(refs) => {this.scrollview = refs}}
            keyExtractor = {(item,index) => 'key'+index}
            initialNumToRender = {3}
            windowSize = {3}
            bounces = {true}
            showsHorizontalScrollIndicator = {false}
            renderItem = {({item}) => {


              return(

                <View style={{height:'100%',width:this.state.wide,justifyContent:'center',alignItems:'center',marginTop:10}}>
              <TouchableOpacity
                  onPress = {() => this.modalData(item[10],item[2],item[3])} >
                    <View style={{height:'80%',width:'90%',flexDirection:'row',alignItems:'center'}}>
                        <View style={styles.img_container}>
                          <Image source={{uri:item[10]}} style={{width:'100%',height:'100%',resizeMode:'cover'}} />
                        </View>
                        <View style={styles.text_container}>
                            <Html html={item[2]} />
                        </View>
                    </View>
                </TouchableOpacity>
                </View>

              );
            }}

            />

</View>
        );
    }
}

const styles = StyleSheet.create({

img_container:{
  height:90,
  width:90,
  borderRadius:45,
  marginRight:-16,
  zIndex:2,
  overflow:'hidden',
  borderWidth:3,
  borderColor:'white',
  backgroundColor:'white',
},

text_container:{
  height:'90%',
  width:'78%',
  backgroundColor:'white',
  justifyContent:'center',
  paddingLeft:25,
  borderBottomRightRadius:5,
  borderTopRightRadius:5,
},

img_container2:{
  height:250,
  width:'100%',
  elevation:2,
},

explanation:{
  width:'100%',
  height:'auto',
  paddingRight:20,
  paddingLeft:20,
  paddingBottom:20,
  paddingTop:5,
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

container:{
  height:'100%',
  width:'100%',
},

});

export default App;
