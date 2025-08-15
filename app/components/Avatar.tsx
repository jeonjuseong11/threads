import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface AvatarProps {
  size?: number;
  username?: string;
  imageUrl?: string;
}

export default function Avatar({ size = 40, username = "U", imageUrl }: AvatarProps) {
  if (imageUrl) {
    // 실제 이미지가 있을 때는 Image 컴포넌트를 사용할 수 있습니다
    return (
      <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
        <Text style={[styles.text, { fontSize: size * 0.4 }]}>IMG</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: size * 0.4 }]}>
        {username.charAt(0).toUpperCase()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E5E5EA",
  },
  text: {
    color: "white",
    fontWeight: "bold",
  },
});
