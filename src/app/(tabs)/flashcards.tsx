
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const CARD_HEIGHT = SCREEN_HEIGHT - 100;
const STORAGE_KEY = "completedFlashcards";

const flashcards = [
    {
        id: "1",
        question: "What is an IP address?",
        answer: "A logical address used to identify a device on a network.",
        difficulty: "Beginner",
    },
    {
        id: "2",
        question: "What is TCP?",
        answer: "Transmission Control Protocol. It provides reliable, connection-oriented communication.",
        difficulty: "Intermediate",
    },
    {
        id: "3",
        question: "What is subnetting?",
        answer: "The process of dividing a network into smaller logical networks.",
        difficulty: "Advanced",
    },
];

export default function FlashcardsScreen() {
    const router = useRouter();

    const [flippedCards, setFlippedCards] = useState<string[]>([]);
    const [completedCards, setCompletedCards] = useState<string[]>([]);

    useEffect(() => {
        async function loadProgress() {
            try {
                const savedProgress = await AsyncStorage.getItem(STORAGE_KEY);

                if (savedProgress) {
                    setCompletedCards(JSON.parse(savedProgress));
                }
            } catch (error) {
                console.log("Error loading flashcard progress:", error);
            }
        }

        loadProgress();
    }, []);

    async function markCompleted(id: string) {
        if (completedCards.includes(id)) return;

        const updatedCards = [...completedCards, id];

        setCompletedCards(updatedCards);

        try {
            await AsyncStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(updatedCards)
            );
        } catch (error) {
            console.log("Error saving flashcard progress:", error);
        }
    }

    function flipCard(id: string) {
        setFlippedCards((current) =>
            current.includes(id)
                ? current.filter((cardId) => cardId !== id)
                : [...current, id]
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Flashcard Feed</Text>
                <Pressable onPress={() => router.back()}>
                    <Text style={styles.backText}>Back</Text>
                </Pressable>
            </View>

            <View style={styles.progressHeader}>
                <Text style={styles.progressText}>
                    Completed: {completedCards.length}/{flashcards.length}
                </Text>
            </View>

            <FlatList
                data={flashcards}
                keyExtractor={(item) => item.id}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                snapToInterval={CARD_HEIGHT}
                decelerationRate="fast"
                getItemLayout={(_, index) => ({
                    length: CARD_HEIGHT,
                    offset: CARD_HEIGHT * index,
                    index,
                })}
                renderItem={({ item, index }) => {
                    const isFlipped = flippedCards.includes(item.id);
                    const isCompleted = completedCards.includes(item.id);

                    return (
                        <View style={styles.page}>
                            <Pressable
                                style={styles.card}
                                onPress={() => flipCard(item.id)}
                            >
                                <Text style={styles.cardNumber}>
                                    CARD {index + 1} / {flashcards.length}
                                </Text>

                                <Text style={styles.difficulty}>
                                    {item.difficulty}
                                </Text>

                                <Text style={styles.cardLabel}>
                                    {isFlipped ? "ANSWER" : "QUESTION"}
                                </Text>

                                <Text style={styles.cardText}>
                                    {isFlipped ? item.answer : item.question}
                                </Text>

                                <Text style={styles.tapHint}>
                                    Tap to {isFlipped ? "see question" : "reveal answer"}
                                </Text>
                            </Pressable>

                            {isFlipped && (
                                <Pressable
                                    style={[
                                        styles.completeButton,
                                        isCompleted && styles.completedButton,
                                    ]}
                                    onPress={() => markCompleted(item.id)}
                                >
                                    <Text style={styles.completeButtonText}>
                                        {isCompleted
                                            ? "✓ Completed"
                                            : "Mark as Completed"}
                                    </Text>
                                </Pressable>
                            )}

                            <Text style={styles.swipeHint}>
                                Swipe up for the next flashcard ↑
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0B1120",
    },
    header: {
        height: 60,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    headerTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "bold",
    },
    backText: {
        color: "#38BDF8",
        fontSize: 16,
    },
    progressHeader: {
        paddingHorizontal: 20,
        paddingVertical: 5,
    },
    progressText: {
        color: "#A5B4C8",
        fontSize: 14,
    },
    page: {
        height: CARD_HEIGHT,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    card: {
        width: "100%",
        height: "78%",
        backgroundColor: "#172238",
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "#263650",
        padding: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    cardNumber: {
        position: "absolute",
        top: 25,
        fontSize: 13,
        color: "#A5B4C8",
    },
    difficulty: {
        position: "absolute",
        top: 55,
        fontSize: 14,
        color: "#38BDF8",
        fontWeight: "bold",
    },
    cardLabel: {
        fontSize: 14,
        color: "#A5B4C8",
        marginBottom: 20,
        fontWeight: "bold",
    },
    cardText: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        color: "#FFFFFF",
        lineHeight: 36,
    },
    tapHint: {
        position: "absolute",
        bottom: 25,
        fontSize: 14,
        color: "#A5B4C8",
    },
    completeButton: {
        backgroundColor: "#7C3AED",
        paddingVertical: 13,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginTop: 12,
    },
    completedButton: {
        backgroundColor: "#166534",
    },
    completeButtonText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 14,
    },
    swipeHint: {
        color: "#A5B4C8",
        marginTop: 10,
        fontSize: 14,
    },
});
