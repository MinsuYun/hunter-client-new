import React, { Component } from "react";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import DistrictScreen from "../screens/bottomNavi/DistrictScreen";
import StoreScreen from "../screens/bottomNavi/StoreScreen";
import SettingScreen from "../screens/bottomNavi/SettingScreen";
import ConditionsScreen from "../components/bottomNavi/Conditions";
import ChatScreen from "../screens/chat/Chat";
import ChatListScreen from "../screens/chatlist/ChatList";
import RenewProfileScreen from "../components/bottomNavi/RenewProfile";
import TopBarRightIcon from "../components/bottomNavi/topBarRightIcons";
import { Icon } from "react-native-elements";
import { FontAwesome, AntDesign } from "@expo/vector-icons";

//District 스텍
const DistrictStack = createStackNavigator({
  DistrictHome: {
    screen: DistrictScreen
  },
  TopBarRightIcon: {
    screen: TopBarRightIcon
  },
  ChatList: {
    screen: ChatListScreen,
    navigationOptions: {
      title: "채팅"
    }
  },
  Chat: {
    screen: ChatScreen
  }
});

//Setting 스텍
const SettingStack = createStackNavigator({
  SettingHome: {
    screen: SettingScreen
  },
  TopBarRightIcon: {
    screen: TopBarRightIcon
  },
  RenewProfile: {
    screen: RenewProfileScreen,
    navigationOptions: {
      title: "프로필수정"
    }
  },
  Conditions: {
    screen: ConditionsScreen,
    navigationOptions: {
      title: "이용약관"
    }
  },
  ChatList: {
    screen: ChatListScreen,
    navigationOptions: {
      title: "채팅"
    }
  },
  Chat: {
    screen: ChatScreen
  }
});

//Store 스텍
const StoreStack = createStackNavigator({
  StoreHome: {
    screen: StoreScreen,
    navigationOptions: {
      title: "저기어때"
    }
  },
  TopBarRightIcon: {
    screen: TopBarRightIcon
  },
  ChatList: {
    screen: ChatListScreen,
    navigationOptions: {
      title: "채팅"
    }
  },
  Chat: {
    screen: ChatScreen
  }
});

//하단탭네비게이션
const TabNavigator = createBottomTabNavigator({
  DistrictTap: {
    screen: DistrictStack
  },
  StoreTap: {
    screen: StoreStack
  },
  SettingTap: {
    screen: SettingStack
  }
});

DistrictStack.navigationOptions = {
  // tabBarLabel: "라운지",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome size={24} name={"thermometer-quarter"} color={tintColor} />
  ),
  // ({ tintColor }) => <AntDesign name="run" color={tintColor} size={24} />
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "hotpink", // active icon color
    inactiveTintColor: "darkgray", // inactive icon color
    style: {
      backgroundColor: "ghostwhite" // TabBar background
    }
  }
};

// #171F33
StoreStack.navigationOptions = {
  // tabBarLabel: "매장",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome size={24} name={"thermometer-full"} color={tintColor} />
  ),
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "hotpink", // active icon color
    inactiveTintColor: "darkgray", // inactive icon color
    style: {
      backgroundColor: "ghostwhite" // TabBar background
    }
  }
};

SettingStack.navigationOptions = {
  // tabBarLabel: "설정",
  tabBarIcon: ({ tintColor }) => (
    <FontAwesome size={24} name={"info"} color={tintColor} />
  ),
  tabBarOptions: {
    showLabel: false, // hide labels
    activeTintColor: "hotpink", // active icon color
    inactiveTintColor: "darkgray", // inactive icon color
    style: {
      backgroundColor: "ghostwhite" // TabBar background
    }
  }
};

const AppTabContainer = createAppContainer(TabNavigator);

class TabMainNavigator extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    console.log(
      this.props.navigation.state.params,
      " 지금 이값으로 database에서 다른 팀들에 대한 프로필을 불러온다. TapNavigations.js line:144--------------------------------------------------"
    );
    return <AppTabContainer />; // AppTabContainet 컴포넌트를 리턴한다.
  }
}

const HomeStack = createStackNavigator({
  TabMainNavigator
});

export default HomeStack;
