import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function HomeScreen() {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState("");
  const [emotion, setEmotion] = useState("");
  const [insight, setInsight] = useState("");

  const emotions = ["Anxious", "Calm", "Angry", "Hopeful", "Overwhelmed"];

  const handleSave = async () => {
    if (!title || !entry || !emotion) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/journal",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            emotion,
            entry,
          }),
        }
      );

      const data = await response.json();

      setInsight(data.insight);

    } catch (error) {
      console.error(error);
      alert("Server not reachable");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recovery Journal</Text>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Write your thoughts..."
        style={[styles.input, { height: 120 }]}
        value={entry}
        onChangeText={setEntry}
        multiline
      />

      <Text style={styles.label}>Select Emotion:</Text>

      <View style={styles.emotionContainer}>
        {emotions.map((emo) => (
          <TouchableOpacity
            key={emo}
            style={[
              styles.emotionButton,
              emotion === emo && styles.selectedEmotion,
            ]}
            onPress={() => setEmotion(emo)}
          >
            <Text>{emo}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Entry" onPress={handleSave} />

      {insight !== "" && (
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>AI Insight:</Text>
          <Text>{insight}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  emotionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  emotionButton: {
    borderWidth: 1,
    padding: 8,
    margin: 5,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  selectedEmotion: {
    backgroundColor: "#ddd",
  },
  resultBox: {
    marginTop: 20,
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f0f0f0",
  },
  resultTitle: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});
