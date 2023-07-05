import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useUpdateUserMutation } from "../app/feature/user/apiSlice";

export default function Profile(props) {
  const route = useRoute();
  const [updateUser] = useUpdateUserMutation();
  const { userId } = route.params;
  const [description, setDescription] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (props.route.params?.imagePath) {
      setProfilePicture(props.route.params.imagePath);
      setUser(userId)
    }
  }, [props.route.params?.imagePath]);

  useEffect(() => {
    console.log(profilePicture);
  }, [profilePicture, user]);
  console.log(user)



  const handlePress = async () => {
    if (!description.trim()) {
      alert("Please set Username");
    } else {
      
      const userData = {
        description,
        profilePicture
      };
      console.log(userData);
      const response = await axios.put(`https://chatwave.onrender.com/api/v1/user/update/${userId}`, userData);
      console.log(response)

      

      
      


    // navigation.navigate("login");
    }
    
  };

  return (
    <SafeAreaView>
      <Container>
        <TopNav>
          <BackIcon>
           
           <TouchableOpacity style={{backgroundColor:"#0b141a" }} onPress={()=> navigation.goBack()}>
           <FontAwesome name="long-arrow-left" size={28} color="white" />
           </TouchableOpacity>
          </BackIcon>
          <BodyText style={{ color: "#005c4b", fontSize: 16 }}>
            Profile Settings
          </BodyText>
          <BackIcon>
            <Fontisto name="more-v-a" size={24} color="white" />
          </BackIcon>
        </TopNav>
        <ProfileCon>
          <ImageBtn
            onPress={() => navigation.navigate("camera-screen")}
          >
            {!profilePicture ? (
              <MaterialCommunityIcons
                name="camera"
                size={60}
                color="white"
              />
            ) : (
              <ImageId
                source={{ uri: profilePicture }}
              />
            )}
          </ImageBtn>
          <TextCon>
            <BodyText style={{ fontSize: 20, color: "#005c4b" }}>
              Profile Info
            </BodyText>
            <BodyText style={{ textAlign: "center" }}>
              Please provide your Profile Picture and Description
            </BodyText>
          </TextCon>
          <FormCon>
         
          <Input
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
            placeholderTextColor="white"
          />
          <SubmitBtn onPress={handlePress}>
            <BodyText style={{ color: "white", fontSize: 16 }}>
              Update Profile
            </BodyText>
          </SubmitBtn>
          </FormCon>
        </ProfileCon>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  height: 100%;
  width: 100%;
  background-color: #0b141a;
`;
const TopNav = styled.View`
  height: 70px;
  background-color: #0b141a;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BodyText = styled.Text`
  font-family: "Medium";
  color: white;
`;

const BackIcon = styled.TouchableOpacity`
  background-color: #0b141a;
  flex-direction: row;
  align-items: center;
`;

const ProfileCon = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
`;

const ImageBtn = styled.TouchableOpacity`
height: 150px;
width: 150px;
background-color: #005c4b;
border-radius: 75px;
border: 10px solid #e9edf1;
  align-items: center;
  justify-content: center;
  shadow-color: black;
  shadow-opacity: 0.2;
  shadow-offset: 0px 2px;
  shadow-radius: 4px;
  elevation: 4;
`;

const ImageId = styled.Image`
height: 100%;
width: 100%;
border-radius: 75px;
`;

const TextCon = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  padding: 0 30px;
`;

const FormCon = styled.View`
width: 100%;
padding: 0 20px;
`

const Input = styled.TextInput`
border: 1.5px solid #005c4b;
color:white;
height: 60px;
  border-radius: 12px;
  padding: 10px;
  font-family: "Regular";
  font-size: 14px;
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
