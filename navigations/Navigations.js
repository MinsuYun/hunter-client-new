import { createAppContainer, createStackNavigator } from "react-navigation";

import MainScreen from "../screens/main/Main";
import SignUpScreen from "../screens/signup/SignUp";
import SignInScreen from "../screens/signin/SignIn";
import ChooseDistrictScreen from "../screens/setPrivateInfo/setDistrict";
import ChooseStoreScreen from "../screens/setPrivateInfo/setStore";
import ChooseSexScreen from "../screens/setPrivateInfo/setSex";
import SetTeamInfoScreen1 from "../screens/setPrivateInfo/setTeamInfo1";
import SetTeamInfoScreen2 from "../screens/setPrivateInfo/setTeamInfo2";

import SetTeamPictureScreen1 from "../screens/setPrivateInfo/setTeamPicture1";
import SetTeamPictureScreen2 from "../screens/setPrivateInfo/setTeamPicture2";
import SetTeamPictureScreen3 from "../screens/setPrivateInfo/setTeamPicture3";
// import TestScreen from "../screens/setPrivateInfo/blurTest";
import GetPictureScreen from "../components/getPicture/getPicture";

const RootStack = createStackNavigator(
  {
    Main: {
      screen: MainScreen,
      navigationOptions: {
        header: null
      }
    },
    SignUp: {
      screen: SignUpScreen,
      navigationOptions: {
        header: null
      }
    },
    SignIn: {
      screen: SignInScreen,
      navigationOptions: {
        header: null
      }
    },
    ChooseSex: {
      screen: ChooseSexScreen,
      navigationOptions: {
        header: null
      }
    },
    SetTeamInfo1: {
      screen: SetTeamInfoScreen1,
      navigationOptions: {
        header: null
      }
    },
    SetTeamInfo2: {
      screen: SetTeamInfoScreen2,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture1: {
      screen: SetTeamPictureScreen1,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture2: {
      screen: SetTeamPictureScreen2,
      navigationOptions: {
        header: null
      }
    },
    SetTeamPicture3: {
      screen: SetTeamPictureScreen3,
      navigationOptions: {
        header: null
      }
    },
    GetPicture: {
      screen: GetPictureScreen
    },
    ChooseDistrict: {
      screen: ChooseDistrictScreen,
      navigationOptions: {
        header: null
      }
    },
    ChooseStore: {
      screen: ChooseStoreScreen,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#28F1A6",
        elevation: 0,
        shadowOpacity: 0
      },
      headerTintColor: "#333333",
      headerTitleStyle: {
        fontWeight: "bold",
        color: "#ffffff",
        marginLeft: 25
      }
    }
  }
);

export default createAppContainer(RootStack);
