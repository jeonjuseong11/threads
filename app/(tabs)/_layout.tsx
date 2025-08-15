import { Ionicons } from "@expo/vector-icons";
import { type BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import { Tabs, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Animated, Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

const AnimatedTabBarButton = ({ children, onPress, style }: BottomTabBarButtonProps) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const handlePressOut = () => {
    Animated.sequence([
      Animated.spring(scaleValue, {
        toValue: 1.2,
        useNativeDriver: true,
        speed: 200,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 200,
      }),
    ]).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onPressOut={handlePressOut}
      style={[
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      android_ripple={{ borderless: false, radius: 0 }}
    >
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>{children}</Animated.View>
    </Pressable>
  );
};

export default function TabLayout() {
  const router = useRouter();
  const isLoggedIn = true;
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarButton: (props) => <AnimatedTabBarButton {...props} />,
        }}
        backBehavior="history"
      >
        <Tabs.Screen
          name="(home)"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="home" color={focused ? "black" : "gray"} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="search" color={focused ? "black" : "gray"} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="add"
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (isLoggedIn) {
                router.navigate("/modal");
              } else {
                openLoginModal();
              }
            },
          })}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons name="add" color={focused ? "black" : "gray"} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="activity"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "heart" : "heart-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                openLoginModal();
              }
            },
          })}
        />
        <Tabs.Screen
          name="[username]"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                color={focused ? "black" : "gray"}
                size={24}
              />
            ),
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              if (!isLoggedIn) {
                openLoginModal();
              }
            },
          })}
        />
        <Tabs.Screen
          name="following"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="(post)/[username]/post/[postId]"
          options={{
            href: null,
          }}
        />
      </Tabs>
      <Modal
        visible={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        transparent
        animationType="slide"
      >
        <View
          style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <View style={{ backgroundColor: "white", padding: 20 }}>
            <Text>Login</Text>
            <TouchableOpacity onPress={closeLoginModal}>
              <Ionicons name="close" size={24} color="#555" />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
