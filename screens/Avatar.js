

import React, { useEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import styled from "styled-components/native";
import { Buffer } from "buffer";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Avatar() {
  const api = "https://api.multiavatar.com/45678945";
  const navigate = useNavigation();
  const [avatars, setAvatars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [avatar, setAvatar] = useState(undefined);

  useEffect(() => {
    async function fetchData() {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`,
          { responseType: "arraybuffer" }
        );
        if (image.status !== 200) {
          setError(true);
        } else {
            setLoading(false);
          const buffer = Buffer.from(image.data, "binary").toString("base64");
          data.push(buffer);
        }
      }
      setAvatars(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  return (
    <SafeAreaView>
      <Container>
        <Text style={{ fontFamily: "Medium", fontSize: 25 }}>
          Select Avatar
        </Text>
        {error ? (
          <Text>Something went wrong</Text>
        ) : (
          <>
            {loading ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <ListCon>
                {avatars.map((avatar, index) => (
                  <AvatarCon
                    onPress={() => setAvatar(avatar)}
                    key={index}
                    style={{ borderColor: "blue" }}
                  >
                    
                    <AvatarImage source={{ uri: `data:image/svg+xml;base64,${avatar}` }} />
                  </AvatarCon>
                ))}
              </ListCon>
            )}
          </>
        )}

        <TouchableOpacity style={{backgroundColor: "#4a86f7", paddingHorizontal: 20, paddingVertical: 15, borderRadius: 15, marginTop: 20 }}>
            <Text style={{fontFamily: "Medium", color: "white", fontSize: 15}}>Set as Profile Piicture</Text>
        </TouchableOpacity>
      </Container>
    </SafeAreaView>
  );
}

const Container = styled.View`
  height: 100%;
  background-color: #fff;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListCon = styled.View`
    flex-direction: column;
    margin-top: 30px;
`;

const AvatarCon = styled.TouchableOpacity`
  height: 80px;
  width: 80px;
  border-width: 1px;
  border-radius: 40px;
  margin: 10px;
  flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const AvatarImage = styled.Image`
  height: 100%;
  width: 100%;
  border-radius: 40px;
  
`;
