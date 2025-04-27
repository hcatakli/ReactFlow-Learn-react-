import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from "react-native";

const exercises = [
  {
    id: 1,
    title: "Console Log",
    difficulty: "Easy",
    description: "Log 'Hello, React!' to the console.",
    codeExample: "console.log('Hello, React!');",
    correctCode: "console.log('Hello, React!');"
  },
  {
    id: 2,
    title: "State Management with useState",
    difficulty: "Medium",
    description: "Create a counter that increments by 1 each time a button is clicked.",
    codeExample: `
      const [count, setCount] = useState(0);
      return <Button title="Increment" onPress={() => setCount(count + 1)} />;
    `,
    correctCode: "const [count, setCount] = useState(0);"
  },
  {
    id: 3,
    title: "Handling Events",
    difficulty: "Hard",
    description: "Create a form with an input field and a submit button.",
    codeExample: `
      const [inputValue, setInputValue] = useState('');
      return <TextInput value={inputValue} onChangeText={setInputValue} />;
    `,
    correctCode: "const [inputValue, setInputValue] = useState('');"
  },
];

export default function ExercisePage() {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [userCode, setUserCode] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = () => {
    if (userCode.trim() === exercises[currentExercise].correctCode.trim()) {
      setFeedback("Correct! Well done.");
    } else {
      setFeedback("Try again! Check your code.");
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setUserCode('');
      setFeedback('');
    } else {
      setFeedback("Congratulations! You've completed all exercises.");
    }
  };

  const { title, difficulty, description, codeExample } = exercises[currentExercise];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>{title}</Text>
      <Text style={styles.difficulty}>Difficulty: {difficulty}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <Text style={styles.codeExampleTitle}>Example Code:</Text>
      <Text style={styles.codeExample}>{codeExample}</Text>

      <TextInput
        style={styles.input}
        value={userCode}
        onChangeText={setUserCode}
        placeholder="Write your code here..."
        multiline
      />
      
      <Button title="Submit" onPress={handleSubmit} />
      
      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
      
      <Button title="Next Exercise" onPress={handleNextExercise} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
  },
  difficulty: {
    fontSize: 18,
    marginBottom: 8,
    color: "#888",
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
  },
  codeExampleTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  codeExample: {
    fontSize: 14,
    backgroundColor: "#f4f4f4",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  input: {
    height: 150,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 16,
    padding: 10,
    textAlignVertical: "top",
  },
  feedback: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
