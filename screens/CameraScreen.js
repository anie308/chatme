import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect, useRef } from "react";
import { View, TouchableOpacity, Image, Text } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import styled from "styled-components/native";


export default function CameraScreen() {

    const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);
  const cameraRef = useRef(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const [cameraFlash, setCameraFlash] = useState(
    Camera.Constants.FlashMode.off
  );
  const [isCameraReady, setIsCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");

      if (galleryStatus.status === "granted") {
        const userGalleryMedia = await MediaLibrary.getAssetsAsync({
          sortBy: ["creationTime"],
          mediaType: ["photo"],
        });
        setGalleryItems(userGalleryMedia.assets);
      }
    })();
  }, []);

  const pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [16, 9],
      quality: 1,
    });
    if (!result.canceled) {
      const path = result.assets[0].uri;
      navigation.navigate("Profile", { imagePath: path });
    }
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      if (photo) {
        const path = photo.uri;
        navigation.navigate("profile", { imagePath: path });
      }
    }
  };

  

  if (!hasCameraPermission || !hasGalleryPermission) {
    return (
      <View style={{flex:1, alignItems:"center", justifyContent:"center"}}>
        <PermText>Grant Permissions To Access Camera</PermText>
        <TouchableOpacity style={{backgroundColor: "#4a86f7", paddingHorizontal:15, paddingVertical: 10, borderRadius: 8, marginTop: 20 }}><PermText style={{color: "white"}}>Grant Permissions</PermText></TouchableOpacity>
      </View>
    );
  }
  return (
    <SafeAreaView>
      <Container>
        <CameraCon>
        {isFocused ? (
            <Camera
              style={{ height: "100%" }}
              ref={cameraRef}
              ratio={"16:9"}
              type={cameraType}
              flashMode={cameraFlash}
              onCameraReady={() => setIsCameraReady(true)}
            />
          ) : null}
        </CameraCon>
        <ButtonCon>
          <TouchableOpacity
            onPress={() =>
              setCameraFlash(
                cameraFlash === Camera.Constants.FlashMode.off
                  ? Camera.Constants.FlashMode.torch
                  : Camera.Constants.FlashMode.off
              )
            }
            style={{marginBottom: 20}}
            // className="h-[50px] w-[50px] rounded-full flex flex-col justify-center items-center"
          >
            <Feather name="zap" size={25} color={"white"} />
            <Text style={{color: "white"}}>Flash</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              )
            }
          >
            <Feather name="refresh-ccw" size={25} color={"white"} />
            <Text style={{color: "white"}}>Flip</Text>
          </TouchableOpacity>
        </ButtonCon>
        <BottomCon >
          <GalleryButton
            
            onPress={() => pickFromGallery()}
          >
            {galleryItems[0] == undefined ? (
              <></>
            ) : (
              <GalleryPreview
                
                source={{ uri: galleryItems[0].uri }}
              />
            )}
          </GalleryButton>
          <TouchableOpacity
            className="h-[80px] w-[80px] bg-red-300 border-[2px] border-white  rounded-full"
            disabled={!isCameraReady}
            onPress={takePicture}
          ></TouchableOpacity>
          <TouchableOpacity
            className="  rounded-full flex items-center justify-center"
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons name="cancel" size={50} color="black" />
            <Text className="mt-[5px]">Cancel</Text>
          </TouchableOpacity>
        </BottomCon>
      </Container>
    </SafeAreaView>
  );
}


const Container = styled.View`
background-color: blue;
height: 100%;


`

const CameraCon = styled.View`
height: 80%;
background-color: red;
`

const ButtonCon = styled.View`
position: absolute;
top: 40px;
right: 20px;
flex-direction: column;
justify-content: center;
align-items: center;

`

const BottomCon = styled.View`
height: 20%;
background-color: #4a86f7;
flex-direction: row;
justify-content: space-between;
align-items: center;
padding: 0 20px;
`
const PermText = styled.Text`
font-family: "Medium";
`

const GalleryButton = styled.TouchableOpacity`
height: 60px;
width: 60px;
border: 2px solid white;
border-radius: 10px;
`

const GalleryPreview = styled.Image`
height: 100%;
width: 100%;
border-radius: 10px;

`
