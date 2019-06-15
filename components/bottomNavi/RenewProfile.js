import React from "react";
import { ScrollView, View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from "react-native";
import {Badge, withBadge, Icon, Avatar} from "react-native-elements";
import IconBadge from 'react-native-icon-badge';

import { url } from "../../url";

const BadgedIcon = withBadge(' + ')(Icon)

const { width } = Dimensions.get("window");

export default class RenewProfile extends React.Component {
  //개인 프로필창을 클릭 시, 제일 먼저 실행되는 함수! 데이터베이스에서 개인프로필에 대한 정보를 가져온다.
  //혹은 로그인 했을때부터 data에 props로 계속 가지고 다녀 전달받는다.

  state = {
    sex: null,
    count: null,
    age: null,
    comment: null,
    teamname: null,

    locationId: null,
    userId: null
  };

  //개인의 유저 id 를 통해 데이터를 끌고 오는게 먼저!
  _bringProfileData = () => {
    fetch(`${url}/users/`, {
      method: "GET",
      headers: {                                     
        "Content-Type": "application/json"
      }
    });
  };

  _changeProfilePicture = () => {
    console.log("ok change your Profile Picture");
  };

  //프로필을 수정할 때 필요한 함수
  _renewProfileData = () => {
    fetch(`${url}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    }).then(async res => {
      if (res.ok) {
        console.log("--------Renew success---------", res.ok);
        flag = true;
        await this.setState({
          //여기서 state에 새로 수정한 내용들을 다시 담는다.
        });
        this._signInAsync();
      } else {
        console.log("--------Renew fail---------", res.ok);
        flag = false;
      }
    });
  };

  
  componentDidMount = () => {
    //componentDidMount를 통해 개인 프로필데이터를 가져오는 함수를 실행
    // this._bringProfileData();
  };
  render() {
    console.log()
    return (
        <View style={{alignItems:'center'}}>
          
          <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'center', marginTop:'10%'}}>
          
          {/* 프로필 사진을 가져와서 띄워준다.  */}
          {/* 사진옆에 수정버튼을 누르면 사진의 수정이 가능하다. => 수정하게 될 경우, S3로 쏴주고 그 사진을 다시 불러온다.   */}
          <TouchableOpacity onPress={this._changeProfilePicture}>
            <IconBadge
              MainElement={
                <Image
                source={{ uri: "http://img1.daumcdn.net/thumb/C246x358/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fmovie%2F91340b7a23541ea5697f7d765948446e75e40f7b" }}
                style={styles.avatar}
              />
              }


              BadgeElement={
                <View>
                  <Text  style={{color:'ghostwhite', fontSize:15}}>{' + '}</Text>
                </View>
              }
              IconBadgeStyle={
                {width:30,
                height:30,
                backgroundColor: 'rgba(0, 0, 0, 0.3)' }
              }
              Hidden={this.state.BadgeCount==0}
              />
              </TouchableOpacity>
          </View>
        
        <ScrollView>
        <Text style={{fontSize:80, textAlign:'center'}}>Who </Text>
        <Text style={{fontSize:65, textAlign:'center'}}>are We ?    </Text>
          
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>Scrolling down</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>What's the best</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:96}}>Framework around?</Text>
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Image source={{uri: "https://facebook.github.io/react-native/img/favicon.png", width: 64, height: 64}} />
          <Text style={{fontSize:80}}>React Native</Text>
        </ScrollView>
    </View>

    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: "5%",
    // flexDirection:'column'
    
    // alignItems:'center'
  },
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center"
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  buttonGroup: {
    flex: 60,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%"
  },
  button: {
    backgroundColor: "#7FC18A"
  },
  headerRightIcon: {
    marginRight: 15
  }
});
