import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Picker } from 'react-native';
import { useState } from 'react';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());

  const handleAddTask = () => {
    if (task.trim()) {
      const selectedDate = new Date(year, month - 1, day);
      setTasks([...tasks, { text: task, done: false, deadline: selectedDate }]);
      setTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => {
    const timeLeft = item.deadline ? item.deadline - new Date() : null;
    const daysLeft = timeLeft ? Math.floor(timeLeft / (1000 * 60 * 60 * 24)) : null;

    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity style={styles.taskTextContainer} onPress={() => handleToggleTask(index)}>
          <Text style={item.done ? styles.taskTextDone : styles.taskText}>{item.text}</Text>
          {item.deadline && (
            <Text style={styles.deadlineText}>
              Deadline: {item.deadline.toDateString()} ({daysLeft} days left)
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={(text) => setTask(text)}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={year}
          onValueChange={(itemValue) => setYear(itemValue)}
        >
          {Array.from({ length: 10 }, (_, i) => (
            <Picker.Item key={i} label={(new Date().getFullYear() + i).toString()} value={new Date().getFullYear() + i} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={month}
          onValueChange={(itemValue) => setMonth(itemValue)}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
          ))}
        </Picker>

        <Picker
          style={styles.picker}
          selectedValue={day}
          onValueChange={(itemValue) => setDay(itemValue)}
        >
          {Array.from({ length: 31 }, (_, i) => (
            <Picker.Item key={i} label={(i + 1).toString()} value={i + 1} />
          ))}
        </Picker>
      </View>

      <FlatList
        style={styles.taskList}
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  addButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
  },
  taskList: {
    flex: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskText: {
    fontSize: 16,
  },
  taskTextDone: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 4,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    color: 'white',
    fontSize: 16,
  },
  pickerContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  picker: {
    flex: 1,
    height: 40,
  },
  deadlineText: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
});

export default App;
