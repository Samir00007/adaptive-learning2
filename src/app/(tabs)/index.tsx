
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import LessonCard from "../components/LessonCard";

const lessons = [
  {
    id: 1,
    title: "React Native Basics",
    difficulty: "Beginner",
    progress: 60,
  },
  {
    id: 2,
    title: "Computer Networks",
    difficulty: "Intermediate",
    progress: 30,
  },
  {
    id: 3,
    title: "Operating Systems",
    difficulty: "Intermediate",
    progress: 20,
  },
];

export default function HomeScreen() {
  const router = useRouter();

  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [storageLoaded, setStorageLoaded] = useState(false);
  const [completedFlashcards, setCompletedFlashcards] = useState<string[]>([]);

  const { completedLesson } = useLocalSearchParams<{
    completedLesson?: string;
  }>();

  // Load completed lessons.
  useEffect(() => {
    async function loadCompletedLessons() {
      try {
        const savedLessons = await AsyncStorage.getItem(
          "completedLessons"
        );

        if (savedLessons !== null) {
          setCompletedLessons(JSON.parse(savedLessons));
        }
      } catch (error) {
        console.error("Could not load completed lessons:", error);
      } finally {
        setStorageLoaded(true);
      }
    }

    loadCompletedLessons();
  }, []);

  useEffect(() => {
    if (!storageLoaded) return;

    async function saveCompletedLessons() {
      try {
        await AsyncStorage.setItem(
          "completedLessons",
          JSON.stringify(completedLessons)
        );
      } catch (error) {
        console.error("Could not save completed lessons:", error);
      }
    }

    saveCompletedLessons();
  }, [completedLessons, storageLoaded]);

  // Add a newly completed lesson.
  useEffect(() => {
    if (!storageLoaded || typeof completedLesson !== "string") return;
    if (!completedLesson) return;

    setCompletedLessons((current) =>
      current.includes(completedLesson)
        ? current
        : [...current, completedLesson]
    );
  }, [completedLesson, storageLoaded]);

  const completedCount = lessons.filter((lesson) =>
    completedLessons.includes(lesson.title)
  ).length;

  const overallProgress = Math.round(
    lessons.reduce((total, lesson) => {
      const progress = completedLessons.includes(lesson.title)
        ? 100
        : lesson.progress;

      return total + progress;
    }, 0) / lessons.length
  );

  const flashcardTotal = 3;

  const flashcardProgress = Math.round(
    (completedFlashcards.length / flashcardTotal) * 100
  );



  useEffect(() => {
    async function loadFlashcardProgress() {
      try {
        const savedProgress = await AsyncStorage.getItem(
          "completedFlashcards"
        );

        if (savedProgress !== null) {
          setCompletedFlashcards(JSON.parse(savedProgress));
        }
      } catch (error) {
        console.error("Could not load flashcard progress:", error);
      }
    }

    loadFlashcardProgress();
  }, []);




  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.eyebrow}>YOUR LEARNING SPACE</Text>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.subtitle}>
            Ready to learn something new?
          </Text>
        </View>

        <View style={styles.profileIcon}>
          <Ionicons
            name="person-outline"
            size={25}
            color="#38BDF8"
          />
        </View>
      </View>

      {/* Progress summary */}
      <View style={styles.progressCard}>
        <Text style={styles.cardLabel}>YOUR PROGRESS</Text>

        <View style={styles.progressHeader}>
          <View>
            <Text style={styles.progressNumber}>
              {overallProgress}%
            </Text>
            <Text style={styles.progressDescription}>
              Overall learning progress
            </Text>
          </View>

          <View style={styles.progressIcon}>
            <Ionicons
              name="trending-up"
              size={30}
              color="#38BDF8"
            />
          </View>
        </View>

        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              { width: `${overallProgress}%` },
            ]}
          />
        </View>

        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statNumber}>
              {completedCount}/{lessons.length}
            </Text>
            <Text style={styles.statLabel}>
              Completed lessons
            </Text>
          </View>

          <View style={styles.statDivider} />

          <View>
            <Text style={styles.statNumber}>
              {lessons.length - completedCount}
            </Text>
            <Text style={styles.statLabel}>
              Lessons remaining
            </Text>
          </View>
        </View>
      </View>

      {/* Flashcards section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Quick Revision</Text>
        <Text style={styles.sectionSubtitle}>Learn on the go</Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.flashcardCard,
          pressed && styles.pressed,
        ]}
        onPress={() => router.push("/flashcards")}
      >
        <View style={styles.flashcardIcon}>
          <Ionicons
            name="layers"
            size={30}
            color="#FFFFFF"
          />
        </View>

        <View style={styles.flashcardText}>
          <Text style={styles.flashcardTitle}>
            Master with Flashcards
          </Text>

          <Text style={styles.flashcardDescription}>
            Revise concepts with interactive flashcards.
          </Text>
          <Text style={styles.flashcardProgressText}>
            Completed: {completedFlashcards.length}/{flashcardTotal}
            {" "}({flashcardProgress}%)
          </Text>

          <View style={styles.flashcardProgressBackground}>
            <View
              style={[
                styles.flashcardProgressFill,
                { width: `${flashcardProgress}%` },
              ]}
            />
          </View>

          <Text style={styles.flashcardAction}>
            Start revising  →
          </Text>
        </View>

        <Ionicons
          name="arrow-forward-circle"
          size={30}
          color="#FFFFFF"
        />
      </Pressable>

      {/* Lessons section */}
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>
            Continue Learning
          </Text>
          <Text style={styles.sectionSubtitle}>
            Pick up where you left off
          </Text>
        </View>
      </View>

      {lessons.map((lesson) => {
        const isCompleted = completedLessons.includes(lesson.title);

        return (
          <View key={lesson.id} style={styles.lessonWrapper}>
            <LessonCard
              title={lesson.title}
              difficulty={lesson.difficulty}
              progress={isCompleted ? 100 : lesson.progress}
              onPress={() =>
                router.push({
                  pathname: "/lesson",
                  params: {
                    title: lesson.title,
                    difficulty: lesson.difficulty,
                    progress: String(lesson.progress),
                  },
                })
              }
            />

            {isCompleted && (
              <Text style={styles.completedText}>
                <Ionicons
                  name="checkmark-circle"
                  size={15}
                  color="#34D399"
                />{" "}
                Completed
              </Text>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#0B1120",
  },

  container: {
    padding: 20,
    paddingTop: 30,
    paddingBottom: 35,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  eyebrow: {
    color: "#38BDF8",
    fontSize: 11,
    fontWeight: "bold",
    letterSpacing: 2,
    marginBottom: 8,
  },

  greeting: {
    color: "#F8FAFC",
    fontSize: 26,
    fontWeight: "bold",
  },

  subtitle: {
    color: "#94A3B8",
    fontSize: 14,
    marginTop: 6,
  },

  profileIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#17243A",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#334155",
  },

  progressCard: {
    backgroundColor: "#151F32",
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#263750",
    marginBottom: 30,
  },

  cardLabel: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },

  progressNumber: {
    color: "#38BDF8",
    fontSize: 36,
    fontWeight: "bold",
  },

  progressDescription: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 3,
  },

  progressIcon: {
    width: 55,
    height: 55,
    borderRadius: 16,
    backgroundColor: "#19334A",
    justifyContent: "center",
    alignItems: "center",
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#29364B",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 20,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#38BDF8",
    borderRadius: 10,
  },

  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  statNumber: {
    color: "#F8FAFC",
    fontSize: 19,
    fontWeight: "bold",
  },

  statLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
  },

  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: "#334155",
    marginHorizontal: 30,
  },

  sectionHeader: {
    marginBottom: 15,
  },

  sectionTitle: {
    color: "#F8FAFC",
    fontSize: 21,
    fontWeight: "bold",
  },

  sectionSubtitle: {
    color: "#94A3B8",
    fontSize: 13,
    marginTop: 5,
  },

  flashcardCard: {
    backgroundColor: "#5541A8",
    padding: 18,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  flashcardIcon: {
    width: 52,
    height: 52,
    borderRadius: 15,
    backgroundColor: "#7965D4",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  flashcardText: {
    flex: 1,
  },

  flashcardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  flashcardDescription: {
    color: "#E2DDFB",
    fontSize: 12,
    marginTop: 6,
    lineHeight: 18,
  },

  flashcardAction: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 10,
  },

  lessonWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },

  completedText: {
    color: "#34D399",
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 5,
  },

  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },

  flashcardProgressText: {
    color: "#FFFFFF",
    fontSize: 12,
    marginTop: 12,
    fontWeight: "600",
  },

  flashcardProgressBackground: {
    height: 7,
    backgroundColor: "#372B70",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },

  flashcardProgressFill: {
    height: "100%",
    backgroundColor: "#38BDF8",
    borderRadius: 10,
  },
});
