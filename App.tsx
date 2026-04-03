import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Platform } from 'react-native';
import Checkbox from 'expo-checkbox';

interface modelo {
  id: string;
  text: string;
  completed: boolean;
}

export default function App() {
  const [task, setTask] = useState<string>('');
  const [todoList, setTodoList] = useState<modelo[]>([]);

  const addTask = () => {
    if (task.trim().length === 0) return;
    setTodoList([...todoList, { id: Date.now().toString(), text: task, completed: false }]);
    setTask('');
  };

  const deleteTask = (id: string) => {
    setTodoList(todoList.filter(item => item.id !== id));
  };

  const completedTask = (id: string) => {
  setTodoList(
    todoList.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    )
  );
};

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View style={styles.mainContainer}>
          <Text style={styles.titleText}>To-do List</Text>
            
          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.input} 
              value={task}
              onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>

          <View>
            <FlatList
              data={todoList}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.todoItem}>
                  <Checkbox
                    value={item.completed}
                    onValueChange={() => completedTask(item.id)}
                    color={item.completed ? "#0891B2" : undefined}
                  />
                  <Text
                    style={[
                      styles.todoText,
                      item.completed && {
                        textDecorationLine: "line-through",
                        color: "black"
                      }
                    ]}>
                    {item.text}
                  </Text>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(item.id)}>
                    <Text style={styles.deleteButtonText}>X</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
      </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  
  mainContainer: {
    flex: 1,
    padding: 30,
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },

  titleText: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
 
  taskBody: {
    flex: 1,
    padding: 10,
  },

  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },

  addButton: {
    backgroundColor: '#0891B2',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },

  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },

  todoText: {
    fontSize: 16,
  },

  deleteButton: {
    backgroundColor: '#71717A',
    padding: 8,
    borderRadius: 8,
  },

  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  }
});