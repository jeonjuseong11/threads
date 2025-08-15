import { BlurView } from "expo-blur";
import { usePathname, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();
  const isLoggedIn = false;
  const top = insets.top;
  const bottom = insets.bottom;

  const { width, height } = Dimensions.get("window");

  console.log(`화면 너비: ${width}dp  , 화면 높이: ${height}dp`);
  console.log(
    `화면 너비: ${width * PixelRatio.get()}px  , 화면 높이: ${height * PixelRatio.get()}px`
  );

  return (
    <View style={[styles.container, { paddingTop: top, paddingBottom: bottom }]}>
      <BlurView intensity={70} tint="light" style={styles.header}>
        <Image source={require("@/assets/images/react-logo.png")} style={styles.headerLogo} />
        {!isLoggedIn && (
          <TouchableOpacity style={styles.loginButton} onPress={() => router.navigate("/login")}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
        )}
      </BlurView>
      {isLoggedIn && (
        <View style={styles.tabContainer}>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.navigate("/")}>
              <Text style={{ color: pathname === "/" ? "black" : "gray" }}>For you</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.tab}>
            <TouchableOpacity onPress={() => router.navigate("/following")}>
              <Text style={{ color: pathname === "/following" ? "black" : "gray" }}>Following</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  tabContainer: {
    flexDirection: "row",
  },
  tab: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
  },
  headerLogo: {
    width: 42, //DP, DIP
    height: 42,
  },
  loginButton: {
    position: "absolute",
    right: 10,
    top: 5,
    backgroundColor: "black",
    borderWidth: 1,
    borderColor: "black",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  loginButtonText: {
    color: "white",
  },
});
