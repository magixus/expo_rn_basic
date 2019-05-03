import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Camera, Permissions, Constants } from "expo";

import BottomNavigation, {
  FullTab
} from "react-native-material-bottom-navigation";
import { MaterialIcons } from "@expo/vector-icons";

export default class App extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
    activeTab: undefined
  };
  tabs = [
    {
      key: "picture",
      icon: "wallpaper",
      label: "pictures",
      barColor: "#388E3C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "camera",
      icon: "camera",
      label: "take picture",
      barColor: "#B71C1C",
      pressColor: "rgba(255, 255, 255, 0.16)"
    },
    {
      key: "filter",
      icon: "filter",
      label: "filters",
      barColor: "#E64A19",
      pressColor: "rgba(255, 255, 255, 0.16)"
    }
  ];

  renderIcon = icon => ({ isActive }) => (
    <MaterialIcons size={24} color="white" name={icon} />
  );

  renderTab = ({ tab, isActive }) => (
    <FullTab
      isActive={isActive}
      key={tab.key}
      label={tab.label}
      renderIcon={this.renderIcon(tab.icon)}
    />
  );

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status == "granted" });
  }

  handleCameraStart() {
    console.log(this.state.type);
    console.log("you're going to lunch camera");
    return (
      <Camera style={{ flex: 1 }} type={this.state.type}>
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            flexDirection: "row"
          }}
        >
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: "flex-end",
              alignItems: "center"
            }}
            onPress={() => {
              this.setState({
                type:
                  this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
              });
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 10, color: "white" }}>
              {" "}
              Flip{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    );
  }
  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === false) {
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text> No access to Camera</Text>
          <Text>Please close the application and provide access to Camera</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{flex:1}}>
            <Button
              onPress={this.handleCameraStart}
              title="take a picture"
              color="#841585"
              accessibilityLabel="you're going to take a picture"
            />
          </View>
          <BottomNavigation
            onTabPress={newTab => this.setState({ activeTab: newTab.key })}
            renderTab={this.renderTab}
            tabs={this.tabs}
          />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Constants.statusBarHeight
  }
});
