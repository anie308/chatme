import { View, Text } from "react-native";

import { useState, useEffect } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Avatar from "./Avatar";
import Chat from "./Chat";
import Chats from "./Chats";
import CameraScreen from "./CameraScreen";
import Profile from "./Profile";
export default function Route() {
  const [currUser, setCurrUser] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const getToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setCurrUser(token);
    };

    getToken();
  });
  // useEffect(() => {
  //   const getParams = async () => {
  //     const decodedId = jwt_decode(currUser).id;
  //     setToken(decodedId);
  //   };
  //   getParams();
  // }, []);

  // useEffect(() => {
  //   if (currUser) {
  //     socket.current = io(host);
  //     socket.current.emit("add-user", token);
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (socket.current) {
  //     socket.current.on("msg-recieve", (msg) => {
  //       console.log(msg);
  //       setArrivalMessage({ fromSelf: false, message: msg });
  //       setUnreadCount((count) => count + 1); // Increment the unread count
  //     });
  //   }
  // }, []);

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currUser ? (
          <>
            <Stack.Screen
              name="chats"
              options={{ headerShown: false }}
              component={Chats}
              token={currUser}
              setCurrUser={setCurrUser}
            />

            <Stack.Screen
              name="profile"
              options={{ headerShown: false }}
              component={Profile}
            />
            <Stack.Screen
              name="camera-screen"
              options={{
                headerShown: false,
              }}
              component={CameraScreen}
            />
            <Stack.Screen
              token={currUser}
              name="chat"
              options={{
                headerShown: false,
              }}
              component={Chat}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="login"
              options={{
                headerShown: false,
              }}
              component={SignIn}
            />
            <Stack.Screen
              name="sign-up"
              options={{
                headerShown: false,
              }}
              component={SignUp}
            />
            <Stack.Screen
              name="avatar"
              options={{
                headerShown: false,
              }}
              component={Avatar}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
