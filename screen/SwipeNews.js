import React, {Component} from 'react';
import {WebView} from 'react-native-webview';

import {Text,StyleSheet,View,TouchableOpacity,Dimensions,Modal,Image,FlatList} from 'react-native';

class StudentList extends Component{



  state = {
    wide: Math.round(Dimensions.get('window').width),
    scroll_pos:0,
    pre_scroll_pos:0,
    data:[],
    webpage_modal:false,
    web_address:'',
  }

componentDidMount(){

  var url = 'https://newsapi.org/v2/everything?q=nasa&sortBy=popularity&apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';

  fetch(url)
    .then((response) => response.json())
    .then((resjsn) => this.setState({data:resjsn.articles}))
    .then(() => {
      var url = 'https://newsapi.org/v2/everything?q=astronomy&sortBy=popularity&apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';

      fetch(url)
      .then(res => res.json())
      .then(resjsn => this.setState({data:[...this.state.data,resjsn.articles]}))
    })
    .then(() => {

      var url = 'https://newsapi.org/v2/everything?q=spacex&sortBy=popularity&apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';

      fetch(url)
      .then(res => res.json())
      .then(resjsn => this.setState({data:[...this.state.data,resjsn.articles]}))
    })
    .then(() => {

      var url = 'https://newsapi.org/v2/everything?q=hubble&sortBy=popularity&apiKey=6d8e7040e44e474e8b1ec3dc1198ac80';

      fetch(url)
      .then(res => res.json())
      .then(resjsn => this.setState({data:[...this.state.data,resjsn.articles]}))
    })


}


webpage = (data) => {
  this.setState({webpage_modal:true});
  this.setState({web_address:data});
}


  render(){
    return(
<View>
      <Modal
        visible={this.state.webpage_modal}
        onRequestClose = {() => this.setState({webpage_modal:false})}>
        <WebView
          source={{uri:this.state.web_address}}
        />
      </Modal>

        <FlatList
          data = {this.state.data}
          horizontal
          keyExtractor = {(item,index) => 'key'+index}
          initialNumToRender = {5}
          windowSize = {5}
          bounces = {true}
          ref={(ref) => {this.scrollview = ref;}}
          showsHorizontalScrollIndicator = {false}
          renderItem = {({item,index}) => {
            return(
              <View
              style={{height:'100%',width:this.state.wide,flexDirection:'row',justifyContent:'center',alignItems:'center',borderColor:'gray',borderWidth:1,marginRight:10}}
              >
              <TouchableOpacity
                  onPress = {() => this.webpage(item.url)} >

                <View style={styles.img_text}>
                <View style={styles.img}>
                  <Image source={{uri:item.urlToImage}} style={{height:'100%',width:'100%'}}/>
                </View>
                <View style={styles.title}><Text style={styles.title_text}>{item.title}</Text></View>
              </View>

              </TouchableOpacity>
              </View>

            );
          }} />

</View>
    );
  }
}

const styles = StyleSheet.create({

img:{
  height:'90%',
  width:'35%',
},

title:{
  height:'90%',
  width:'65%',
  backgroundColor:'rgba(240,230,140,0.9)',
  justifyContent:'center',
  alignItems:'center',
  paddingLeft:15,
},

img_text:{
  height:'90%',
  width:'100%',
  paddingLeft:5,
  backgroundColor:'wheat',
  alignItems:'center',
  flexDirection:'row',
  justifyContent:'center',
}

});

export default StudentList;
