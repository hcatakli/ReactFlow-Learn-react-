import { Challenge } from '../types';

export const challenges: Challenge[] = [
  {
    id: 'challenge-1',
    title: 'Create a Simple Counter',
    description: 'Build a counter component with increment and decrement buttons',
    prompt: 'Create a counter component that displays a number and has buttons to increment and decrement the value.',
    initialCode: `import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  // Add your state here
  
  return (
    <View style={styles.container}>
      {/* Add your UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // Add more styles as needed
});`,
    solution: `import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  
  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Decrement" onPress={decrement} />
        <View style={styles.buttonSpacer} />
        <Button title="Increment" onPress={increment} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    marginBottom: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonSpacer: {
    width: 16,
  },
});`,
    hints: [
      'Use the useState hook to create a state variable for the counter',
      'Create two functions: one to increment and one to decrement the counter',
      'Display the counter value in a Text component',
      'Add two Button components with onPress handlers'
    ],
    difficulty: 'beginner',
    tags: ['state', 'hooks', 'ui'],
    moduleId: 'state-management'
  },
  {
    id: 'challenge-2',
    title: 'Build a Todo List',
    description: 'Create a simple todo list with add and delete functionality',
    prompt: 'Create a todo list component that allows users to add new todos and delete existing ones.',
    initialCode: `import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function TodoList() {
  // Add your state here
  
  return (
    <View style={styles.container}>
      {/* Add your UI here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  // Add more styles as needed
});`,
    solution: `import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  
  const addTodo = () => {
    if (text.trim() === '') return;
    
    const newTodo = {
      id: Date.now().toString(),
      text: text.trim(),
    };
    
    setTodos([...todos, newTodo]);
    setText('');
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Add a todo"
        />
        <Button title="Add" onPress={addTodo} />
      </View>
      
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  todoText: {
    fontSize: 16,
  },
  deleteButton: {
    color: 'red',
  },
});`,
    hints: [
      'Use useState to create state for the todo list array and input text',
      'Create a function to add new todos that creates a unique ID for each todo',
      'Create a function to delete todos by filtering out the todo with the specified ID',
      'Use a FlatList to render the list of todos',
      'Use a TextInput and Button for adding new todos'
    ],
    difficulty: 'intermediate',
    tags: ['state', 'lists', 'input'],
    moduleId: 'state-management'
  }
];