/* eslint-disable prettier/prettier */
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";

// npx expo install @react-native-google-signin/google-signin
// npx expo install expo-dev-client

export default function App() {
  const [error, setError] = useState();
  console.log('====================================');
  console.log(error);
  console.log('====================================');
  const [userInfo, setUserInfo] = useState();

  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId:
        "1067210173792-0rmv64hlqpdmlt0sn8a9uls3bqmot8kv.apps.googleusercontent.com",
      androidClientId:
        "1067210173792-7ll70976qo1m4chiohmqqckh6gd8a5qn.apps.googleusercontent.com",
      iosClientId:
        "1067210173792-5mu569f784o8m1klsutnurld49p113m3.apps.googleusercontent.com",
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const signIn = async () => {
    console.log("Pressed sign in");

    try {
      await GoogleSignin.hasPlayServices();
      console.log('Play Services available');
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      // setError();
    } catch (e) {
      setError(e);
      console.error('Play Services error', e);
    }
  };

  const logout = () => {
    setUserInfo(undefined);
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(error)}</Text>
      {userInfo && <Text>{JSON.stringify(userInfo.user)}</Text>}
      {userInfo ? (
        <Button title="Logout" onPress={logout} />
      ) : (
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Standard}
          color={GoogleSigninButton.Color.Dark}
          onPress={signIn}
        />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});