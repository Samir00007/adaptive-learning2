
import { useRouter } from "expo-router";
import {
    ScrollView,
    StyleSheet,
    Text
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
        title: "JavaScript Functions",
        difficulty: "Intermediate",
        progress: 30,
    },
    {
        id: 3,
        title: "Computer Networks",
        difficulty: "Advanced",
        progress: 20,
    },
];

export default function LessonsScreen() {
    const router = useRouter();

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.content}
        >
            <Text style={styles.heading}>My Lessons</Text>
            <Text style={styles.subtitle}>
                Choose a lesson to continue learning.
            </Text>

            {lessons.map((lesson) => (
                <LessonCard
                    key={lesson.id}
                    title={lesson.title}
                    difficulty={lesson.difficulty}
                    progress={lesson.progress}
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
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#101820",
    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#ffffff",
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 15,
        color: "#bbbbbb",
        marginBottom: 20,
    },
});
