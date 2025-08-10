import { usePathname, useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Text style={{ color: pathname === "/" ? "black" : "gray" }}>For you</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/following")}>
          <Text style={{ color: pathname === "/following" ? "black" : "gray" }}>Following</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
