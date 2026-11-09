
import { Ionicons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type LessonCardProps = {
    title: string;
    difficulty: string;
    progress: number;
    onPress: () => void;
};

export default function LessonCard({
    title,
    difficulty,
    progress,
    onPress,
}: LessonCardProps) {
    const safeProgress = Math.max(0, Math.min(100, progress));

    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.card,
                pressed && styles.pressed,
            ]}
        >
            <View style={styles.topRow}>
                <View style={styles.iconContainer}>
                    <Ionicons
                        name="book-outline"
                        size={23}
                        color="#38BDF8"
                    />
                </View>

                <Text style={styles.arrow}>›</Text>
            </View>

            <Text style={styles.title}>{title}</Text>
            <Text style={styles.difficulty}>
                {difficulty} Level
            </Text>

            <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>Your progress</Text>
                <Text style={styles.progressValue}>
                    {safeProgress}%
                </Text>
            </View>

            <View style={styles.progressBackground}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${safeProgress}%` },
                    ]}
                />
            </View>

            <Text style={styles.tapHint}>
                Continue learning
            </Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        padding: 18,
        marginTop: 12,
        borderRadius: 16,
        backgroundColor: "#172238",
        borderWidth: 1,
        borderColor: "#263650",
    },
    pressed: {
        opacity: 0.75,
        transform: [{ scale: 0.98 }],
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 14,
    },
    iconContainer: {
        width: 42,
        height: 42,
        borderRadius: 12,
        backgroundColor: "#203650",
        justifyContent: "center",
        alignItems: "center",
    },
    arrow: {
        fontSize: 28,
        color: "#38BDF8",
    },
    title: {
        fontSize: 19,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    difficulty: {
        fontSize: 13,
        color: "#A5B4C8",
        marginTop: 6,
    },
    progressInfo: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 18,
        marginBottom: 8,
    },
    progressLabel: {
        fontSize: 13,
        color: "#A5B4C8",
    },
    progressValue: {
        fontSize: 13,
        fontWeight: "bold",
        color: "#38BDF8",
    },
    progressBackground: {
        height: 7,
        backgroundColor: "#303D54",
        borderRadius: 5,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
        backgroundColor: "#38BDF8",
        borderRadius: 5,
    },
    tapHint: {
        fontSize: 12,
        color: "#A5B4C8",
        marginTop: 12,
    },
});
