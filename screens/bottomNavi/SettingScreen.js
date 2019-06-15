import React from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo";
import { Avatar, Button,  } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


import TopBarRightIcons from "../../components/bottomNavi/topBarRightIcons";


export default class SettingScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: "설정",
      headerRight: <TopBarRightIcons />
    };
  };
  _handleButton = num => {
    switch (num) {
      case 1:
        alert("프로필수정");
        break;
      case 3:
        alert("로그아웃");
        break;
      case 4:
        alert("계정삭제");
    }
  };

  
  render() {
    return (
      <View style={{width: "100%", height: '100%', alignItems:'center', padding:'5%'}}>
        
        <Avatar
          size="medium"
          rounded
          icon={{name: 'rocket', color:'white', type: 'font-awesome'}}
          overlayContainerStyle={{backgroundColor: 'gainsboro'}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
         
        <View style={{ flex: 1, width: "100%", alignItems: "center", justifyContent: "center" }}>
          <View style={styles.buttonGroup}>
            <Button
              title="정보수정"
              type="outline"
              icon={{ type: "font-awesome", name: "check-circle", color: "pink", marginBottom: "5%" }}
              onPress={() => {
                this.props.navigation.navigate("RenewProfile");
              }}
              containerViewStyle={{width:'100%'}}
              buttonStyle={{width:"100%"}}
            />
            <Button 
            title="이용약관" 
            type="outline"
            icon={{ type: "font-awesome", name: "check-circle", color: "pink", marginBottom: "5%" }}
            onPress={() => this.props.navigation.navigate("Conditions")}  
            containerViewStyle={{width:'100%'}}
            buttonStyle={{width:"100%"}}
            />
            <Button
              title="로그아웃"
              type="outline"
              icon={{ type: "font-awesome", name: "check-circle", color: "pink", marginBottom: "5%" }}
              onPress={() => {
                this._handleButton(3);
              }}
              containerViewStyle={{width:'100%'}}
              buttonStyle={{width:"100%"}}
            />
            <Button
              title="계정삭제"
              type="outline"
              icon={{ type: "font-awesome", name: "check-circle", color: "pink", marginBottom: "5%" }}
              onPress={() => {
                this._handleButton(4);
              }}
              containerViewStyle={{width:'100%'}}
              buttonStyle={{width:"100%"}}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  avatarContainer: {
    marginTop: "5%"
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
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: "100%"
  },
  headerRightIcon: {
    marginRight: 15
  }
});
