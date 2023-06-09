import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useLoginUserMutation } from "../app/feature/user/apiSlice";
import { ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function SignIn() {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if(token) {
        navigation.navigate("chats");
      }
    };

    getToken();
  });

  const handlePress = async () => {
    try {
      const trimmedUsername = username.trim();
      const trimmedPassword = password.trim();

      if (!trimmedUsername || !trimmedPassword) {
        alert("Please Fill All Fields");
        return;
      }

      const user = { username: trimmedUsername, password: trimmedPassword };
      const response = await loginUser(user).unwrap();
      setPassword("");
      setUsername("");

      await AsyncStorage.setItem("token", response.accessToken);
      showMessage({
        message: "Success",
        description: "You have successfully logged in",
        type: "success",
      });
      navigation.navigate("chats");
    } catch (err) {
      console.warn(err);
    }
  };
  const headerHeight = useHeaderHeight();

  return (
    <SafeAreaView>
      <StatusBar style="light" backgroundColor="#0B141A" />
      <KeyboardAvoidingView
        style={{ height: "100%", backgroundColor: "#0b141a" }}
        contentContainerStyle={{ backgroundColor: "#0b141a" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={headerHeight}
      >
        <ScrollView horizontal={false}>
          <Container>
            <LogoCon></LogoCon>
            <TextCon>
              <HeadText style={{ color: "white" }}>
                Sign In to ChatWave Social App
              </HeadText>
              <View
                style={{ display: "flex", flexDirection: "row", marginTop: 5 }}
              >
                <BodyText style={{ color: "white" }}>First time here?</BodyText>
                <TouchableOpacity
                  onPress={() => navigation.navigate("sign-up")}
                >
                  <BodyText
                    style={{ color: "#005c4b", marginLeft: 5, fontWeight: 600 }}
                  >
                    Sign Up
                  </BodyText>
                </TouchableOpacity>
              </View>
            </TextCon>
            <FormCon>
              <Input
                placeholder="User Name"
                placeholderTextColor="white"
                value={username}
                onChangeText={setUsername}
              />
              <Input
                placeholder="Password"
                placeholderTextColor="white"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
              />
              <SubmitBtn onPress={handlePress}>
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <BodyText style={{ color: "white", fontSize: 16 }}>
                    Sign In
                  </BodyText>
                )}
              </SubmitBtn>
            </FormCon>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const Container = styled.View`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #0b141a;
`;
const LogoCon = styled.View`
  margin-top: 50px;
  height: 150px;
  width: 150px;
  background-color: #005c4b;
  border-radius: 75px;
  border: 10px solid #e9edf1;
`;

const TextCon = styled.View`
  height: 50px;
  width: 100%;
  margin-top: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const HeadText = styled.Text`
  font-family: "Medium";
  font-size: 16px;
`;
const BodyText = styled.Text`
  font-family: "Medium";
  font-size: 14px;
`;
const FormCon = styled.View`
  width: 100%;
  margin-top: 25px;
`;

const Input = styled.TextInput`
  border: 1.5px solid #005c4b;
  height: 60px;
  border-radius: 12px;
  padding: 10px;
  font-family: "Regular";
  font-size: 15px;
  margin-top: 25px;
  color: white;
`;

const SubmitBtn = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: #005c4b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 12px;
`;
