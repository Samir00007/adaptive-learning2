
import { useLocalSearchParams, useRouter } from "expo-router";
import { Button, ScrollView, StyleSheet, Text, View } from "react-native";

export default function LessonScreen() {
  const router = useRouter();

  const { title, difficulty, progress } =
    useLocalSearchParams<{
      title?: string;
      difficulty?: string;
      progress?: string;
    }>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{title ?? "Lesson Details"}</Text>

      <Text style={styles.info}>
        Difficulty: {difficulty ?? "Beginner"}
      </Text>

      <Text style={styles.info}>
        Current progress: {progress ?? "0"}%
      </Text>

      <View style={styles.lessonBox}>
        <Text style={styles.sectionTitle}>Learning Material</Text>

        <Text style={styles.content}>
          Welcome to this lesson!

          {"\n\n"}Study the topic carefully and practise what you learn.
          More learning material will be added in the next steps.
        </Text>
      </View>

      <Button
        title="Mark as Completed"
        onPress={() =>
          router.replace({
            pathname: "/",
            params: {
              completedLesson: title ?? "",
            },
          })
        }
      />
      <View style={styles.buttonSpacing}>
        <Button
          title="Back to Lessons"
          onPress={() => router.back()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    backgroundColor: "#ffffff",
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#222222",
  },
  info: {
    fontSize: 16,
    marginBottom: 8,
    color: "#555555",
  },
  lessonBox: {
    backgroundColor: "#eeeeee",
    padding: 18,
    borderRadius: 12,
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
  buttonSpacing: {
    marginTop: 16,
  },
});
