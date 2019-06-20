import React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator,
  Header
} from "react-navigation";
import { View } from "react-native";
import DistrictScreen from "../screens/bottomNavi/DistrictScreen";
import StoreScreen from "../screens/bottomNavi/StoreScreen";
import SettingScreen from "../screens/bottomNavi/SettingScreen";
import ConditionsScreen from "../components/bottomNavi/Conditions";
import ChatScreen from "../screens/chat/Chat";
import ChatListScreen from "../screens/chatlist/ChatList";
import LetterListScreen from "../screens/letterList/LetterList";

import RenewProfileScreen from "../screens/bottomNavi/RenewProfile";
import {
  FontAwesome,
  MaterialCommunityIcons,
  AntDesign
} from "@expo/vector-icons";
import { LinearGradient, constant } from "expo";

//District 스텍
const DistrictStack = createStackNavigator({
  DistrictHome: {
    screen: DistrictScreen,
    navigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      )
    }
  }
});

//Setting 스텍
const SettingStack = createStackNavigator({
  SettingHome: {
    screen: SettingScreen,
    navigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      )
    }
  },
  RenewProfile: {
    screen: RenewProfileScreen,
    navigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      ),
      title: "정보수정",
      headerTitleStyle: {
        color: "#FAFBFB"
      }
    }
  },
  Conditions: {
    screen: ConditionsScreen,
    navigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      ),
      title: "이용약관",
      headerTitleStyle: {
        color: "#FAFBFB"
      }
    }
  }
});

//Store 스텍
const StoreStack = createStackNavigator({
  StoreHome: {
    screen: StoreScreen,
    navigationOptions: {
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      ),

      title: "저기어때",
      headerTitleStyle: {
        color: "#FAFBFB"
      }
    }
  }
});

//하단탭네비게이션 - 하단 탭 각각의 버튼(disctrict, store, setting)에 담긴 screen들을 담아놓은 BottomTabNavigator다.
const TabNavigator = createBottomTabNavigator({
  DistrictTap: {
    screen: DistrictStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <AntDesign size={25} name={"meho"} color={tintColor} marginTop="20%" />
      ),
      // ({ tintColor }) => <AntDesign name="run" color={tintColor} size={24} />
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "#E92D50", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "#131313" // TabBar background
        }
      }
    }
  },
  StoreTap: {
    screen: StoreStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <AntDesign size={25} name={"smile-circle"} color={tintColor} />
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "#E92D50", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "#131313" // TabBar background
        }
      }
    }
  },
  SettingTap: {
    screen: SettingStack,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <MaterialCommunityIcons
          size={30}
          name={"information"}
          color={tintColor}
        />
      ),
      tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: "#E92D50", // active icon color
        inactiveTintColor: "darkgray", // inactive icon color
        style: {
          backgroundColor: "#131313" // TabBar background
        }
      }
    }
  },
  {
    initialRouteName: "StoreTap"
  }
);

//HomeStack - Disctrict, Store, Setting Tab에 있는 모든 스크린들을 하나로 모은 Stack
//이 HomeStack에 담겨있는 모든 스크린들 사이에서는 Stack 인과관계가 생긴다. (즉, navigation.navigate를 통해 이동할 수 있다는 뜻이다)
const HomeStack = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        header: null
      }
    },
    ChatList: {
      screen: ChatListScreen,
      navigationOptions: {
        title: "채팅목록",
        headerTitleStyle: {
          color: "white"
        }
      }
    },
    Chat: {
      screen: ChatScreen
    },
    LetterList: {
      screen: LetterListScreen
    }
  },
  {
    initialRouteName: "TabNavigator",
    defaultNavigationOptions: {
      //채팅방 gradient
      headerBackground: (
        <LinearGradient
          colors={["#5B1ABE", "#C11490"]}
          start={[0.0, 0.5]}
          end={[1.0, 0.5]}
          locations={[0.0, 1.0]}
          style={{
            flex: 1,
            paddingTop: "20%"
          }}
        />
      )
    }
  }
);

export default HomeStack;
