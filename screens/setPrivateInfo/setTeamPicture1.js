import React, { Fragment, Component } from "react";
import { LinearGradient, ImagePicker, Permissions } from "expo";
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from "react-native";
import { Icon } from "react-native-elements";
import { url } from "../../url";

class Title extends Component {
  render() {
    return (
      <View>
        <Text style={styles.title}>{this.props.name}</Text>
      </View>
    );
  }
}

const NextButton = props => {
  return (
    <TouchableOpacity style={styles.nextButton} onPress={props.handleImagePicked}>
      <Text style={styles.nextButtonText}>Next</Text>
    </TouchableOpacity>
  );
};

const Dot = props => {
  let currentStyle = props.active ? styles.dotActive : styles.dotInactive;

  return (
    <TouchableOpacity onPress={props.next}>
      <View style={[styles.dot, currentStyle]} />
    </TouchableOpacity>
  );
};

export default class TeamPicture1 extends Component {
  state = {
    // image: this.props.navigation.state.params.data.image || {
    //     0: null,
    //     1: null,
    //     2: null
    // },
    // sex: this.props.navigation.state.params.data.sex,
    // teamname: this.props.navigation.state.params.data.teamname,
    // count: this.props.navigation.state.params.data.count,
    // averageAge: this.props.navigation.state.params.data.age,
    // comment: this.props.navigation.state.params.data.comment,
    // userId: this.props.navigation.state.params.data.userId,
    // locationId: this.props.navigation.state.params.data.locationId

    image: { 0: null, 1: null, 2: null },
    sex: 1,
    teamname: "FBing",
    count: 4,
    averageAge: 30,
    comment: "do you know gangnamstyle",
    userId: 5
  };

  _uploadImageAsync = async uri => {
    let apiUrl = `${url}/upload`;
    let uriParts = uri.split(".");
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append("photo", {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`
    });

    let options = {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        // userId: this.props.navigation.state.params.data.userId
        userId: 5
      }
    };
    return await fetch(apiUrl, options);
  };

  _pickImage = async num => {
    const { status: cameraRollPerm } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (cameraRollPerm === "granted") {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [5, 7]
      });

      let image = this.state.image;
      image[num] = pickerResult.uri;
      this.setState({ image: image });
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      if (!pickerResult.cancelled) {
        uploadResponse = await this._uploadImageAsync(this.state.image[0]);
        uploadResult = await uploadResponse.json();
      }
      console.log(uploadResult);
    } catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert(" 또안되네시발 ");
    } finally {
      const { averageAge, comment, count, image, locationId, sex, teamname, userId } = this.state;

      this.props.navigation.navigate("Home", {
        sex,
        teamname,
        count,
        averageAge,
        comment,
        image,
        userId,
        locationId
      });
      console.log("upload!");
    }
  };

  componentDidMount = () => {};
  render() {
    const { sex, teamname, count, averageAge, comment, image, userId, locationId } = this.state;
    firstImage = image[0];
    secondImage = image[1];
    thirdImage = image[2];
    return (
      <LinearGradient colors={["coral", "#f44283", "#f441bb", "#8341f4"]} style={styles.backGround}>
        <View style={styles.container}>
          <View style={styles.dotContainer}>
            <Dot active={true} />
            <Dot
              next={() => {
                this.props.navigation.navigate("SetTeamPicture2", {
                  sex,
                  teamname,
                  count,
                  averageAge,
                  comment,
                  image,
                  userId,
                  locationId
                });
              }}
            />
            <Dot
              next={() => {
                this.props.navigation.navigate("SetTeamPicture3", {
                  sex,
                  teamname,
                  count,
                  averageAge,
                  comment,
                  image,
                  userId,
                  locationId
                });
              }}
            />
          </View>
          <View style={styles.titleContainer}>
            <Title name="팀 사진을 저장해주세요" />
            <Title name="(사진 누르면 수정가능)" />
          </View>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View>
              <Title name="가장 섹시한 사진을 넣어주세요" />
            </View>
            {firstImage === null ? (
              <TouchableOpacity onPress={() => this._pickImage(0)} lineHeight="300">
                {/* <Text style={styles.text}> */}
                <Icon name="image" color="#00aced" size={300} />

                {/* </Text> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(0)}>
                <Image
                  source={{ uri: firstImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}

            <View>
              <Title name="가장 귀여운 사진을 넣어주세요" />
            </View>
            {secondImage === null ? (
              <TouchableOpacity onPress={() => this._pickImage(1)} lineHeight="300">
                {/* <Text style={styles.text}> */}
                <Icon name="image" color="#00aced" size={300} />

                {/* </Text> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(1)}>
                <Image
                  source={{ uri: secondImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}

            <View>
              <Title name="가장 우리 팀다운 사진을 넣어주세요" />
            </View>
            {thirdImage === null ? (
              <TouchableOpacity onPress={() => this._pickImage(2)} lineHeight="300">
                {/* <Text style={styles.text}> */}
                <Icon name="image" color="#00aced" size={300} />

                {/* </Text> */}
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => this._pickImage(2)}>
                <Image
                  source={{ uri: thirdImage }}
                  style={{
                    width: 250,
                    height: 350,
                    resizeMode: "contain"
                  }}
                />
              </TouchableOpacity>
            )}
          </ScrollView>
          <NextButton handleImagePicked={this._handleImagePicked} />
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  backGround: {
    flex: 1,
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    marginTop: 40,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  dotActive: {
    backgroundColor: "#FC3768"
  },
  dotInactive: {
    backgroundColor: "#D2D2D4"
  },
  dotContainer: {
    width: 80,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  titleContainer: {
    width: "100%",
    paddingTop: "5%",

    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    marginTop: "5%",
    width: "100%",
    color: "white",
    fontSize: 15
  },

  text: {
    textAlign: "center",
    paddingLeft: 60,
    paddingRight: 60,
    fontSize: 50,
    lineHeight: 300
  },
  nextButton: {
    width: "100%",
    backgroundColor: "#FC3768",
    paddingTop: 20,
    paddingBottom: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  nextButtonText: {
    fontSize: 20,
    color: "white"
  },
  content: {
    flex: 0.3,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  }
});
