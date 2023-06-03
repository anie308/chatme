import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useEffect } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

export default function Profile(props) {
  const [displayName, setDisplayName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (props.route.params?.imagePath) {
      setSelectedImage(props.route.params.imagePath);
    }
  }, [props.route.params?.imagePath]);

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage, user]);



  const handlePress = async () => {
    if (!displayName.trim() || !description.trim()) {
      alert("Please set Username");
    } else {
      let photoUrl;
      if (selectedImage) {
        const { url } = await uploadImage(
          selectedImage,
          `images/${user.uid}`,
          "profilePicture"
        );
        photoUrl = url;
      }

      const userData = {
        displayName,
        description,
        email: user.email,
      };

      if (photoUrl) {
        userData.photoUrl = photoUrl;
      }

      
      


    navigation.navigate("chats");
    }
    
  };

  return (
    <SafeAreaView>
      <Container>
        <TopNav>
          <BackIcon>
           
           <TouchableOpacity onPress={()=> navigation.goBack()}>
           <FontAwesome name="long-arrow-left" size={28} color="black" />
           </TouchableOpacity>
          </BackIcon>
          <BodyText style={{ color: "#4a86f7", fontSize: 16 }}>
            Profile Settings
          </BodyText>
          <BackIcon>
            <Fontisto name="more-v-a" size={24} color="black" />
          </BackIcon>
        </TopNav>
        <ProfileCon>
          <ImageBtn
            onPress={() => navigation.navigate("CameraScreen")}
          >
            {!selectedImage ? (
              <MaterialCommunityIcons
                name="camera"
                size={60}
                color="rgb(59 130 246)"
              />
            ) : (
              <ImageId
                source={{ uri: selectedImage }}
              />
            )}
          </ImageBtn>
          <TextCon>
            <BodyText style={{ fontSize: 20, color: "#4a86f7" }}>
              Profile Info
            </BodyText>
            <BodyText style={{ textAlign: "center" }}>
              Please provide your name and optional profile picture
            </BodyText>
          </TextCon>
          <FormCon>
          <Input
            placeholder="UserName"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <Input
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline={true}
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
  background-color: #f5f7fa;
`;
const TopNav = styled.View`
  height: 70px;
  background-color: white;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
`;

const BodyText = styled.Text`
  font-family: "Medium";
`;

const BackIcon = styled.TouchableOpacity`
  background-color: white;
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
  border-radius: 75px;
  border: 10px solid #e9edf1;
  background-color: white;
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
  border: 1.5px solid #4a86f7;
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
  background-color: #4a86f7;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  border-radius: 12px;
`;
