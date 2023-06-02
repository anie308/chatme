import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { signIn } from "../firebase";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { useLoginUserMutation } from "../app/feature/user/apiSlice";
import { ActivityIndicator } from "react-native";
import { useDispatch } from "react-redux";
import { setUser } from "../app/feature/user/authSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigation = useNavigation();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

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
      dispatch(setUser(response.accessToken));
      console.log(response.accessToken);
      await AsyncStorage.setItem("token", response.accessToken).then(() => {
        showMessage({
          message: "Success",
          description: "You have successfully logged in",
          type: "success",
        });
        navigation.navigate("chats");
      });
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView>
      <Container>
        <LogoCon></LogoCon>
        <TextCon>
          <HeadText>Sign In to ChatMe Social App</HeadText>
          <View style={{ display: "flex", flexDirection: "row", marginTop: 5 }}>
            <BodyText style={{ color: "#6A7185" }}>First time here?</BodyText>
            <TouchableOpacity onPress={() => navigation.navigate("sign-up")}>
              <BodyText
                style={{ color: "#4a86f7", marginLeft: 5, fontWeight: 600 }}
              >
                Sign Up
              </BodyText>
            </TouchableOpacity>
          </View>
        </TextCon>
        <FormCon>
          <Input
            placeholder="User Name"
            value={username}
            onChangeText={setUsername}
          />
          <Input
            placeholder="Password"
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
    </SafeAreaView>
  );
}

const Container = styled.View`
  padding: 20px;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  background-color: #202c33;
`;
const LogoCon = styled.View`
  margin-top: 60px;
  height: 150px;
  width: 150px;
  background-color: #4a86f7;
  border-radius: 75px;
  border: 10px solid #e9edf1;
`;

const TextCon = styled.View`
  height: 50px;
  width: 100%;
  margin-top: 50px;
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
  margin-top: 40px;
`;

const Input = styled.TextInput`
  border: 1.5px solid #4a86f7;
  height: 60px;
  border-radius: 12px;
  padding: 10px;
  font-family: "Regular";
  font-size: 15px;
  margin-top: 30px;
`;

const SubmitBtn = styled.TouchableOpacity`
  height: 60px;
  width: 100%;
  background-color: #005c4b;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  border-radius: 12px;
`;
