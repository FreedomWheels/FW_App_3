import React, {useState, useEffect} from 'react';
// import {collection, getDocs, addDoc, setDoc, doc} from 'firebase/firestore';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Button,
  Modal,
  Alert,
  StatusBar,
  Dimensions,
  ScrollView,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import db from './android/app/src/firebaseConfig.js';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckSquare, faSquare} from '@fortawesome/free-regular-svg-icons';
import {faBars} from '@fortawesome/free-solid-svg-icons';

const HomePageScreen = () => {
  // State variables and functions will be added here
  // Inside the App function, before the return statement
  const [showLevelButtons, setShowLevelButtons] = useState(false);
  const [addStudentModalVisible, setAddStudentModalVisible] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [notes, setNotes] = useState({});
  const [activeLevel, setActiveLevel] = useState(null);
  const [level1Skills, setLevel1Skills] = useState([
    'Speed Adjustment & Control',
    'Steering Control',
    'Lane Placement',
    'Properly Making Left & Right Turns',
    'Using Turn Signals',
    'Understand Road Signs & Markings',
    'Complete Stop at Signs/Intersections (left, right, left)',
    'Proper Space Adjustment with Other Vehicles',
    'Scan for Hazards while Driving',
  ]);
  const [level2Skills, setLevel2Skills] = useState([
    'Turning Right at a Redlight',
    'Change Lanes Appropriately on Multi-lane Roads',
    'Identify and Respond to Potential Hazards Quickly',
    'Yielding Space to Other Drivers as Needed',
    'Maintain Proper Following Distance while Driving & Stopping',
  ]);
  const [level3Skills, setLevel3Skills] = useState([
    'Changing Lanes Safely on Higher Speeds Roads',
    'Keep Sufficient Space Around the Vehicle while Driving',
    'Merging Onto/Off Highways Smoothly',
    'Maintain Proper Speed and Lane Placement on the Highway',
    'Navigate All Types of Roadways Confidently',
  ]);
  const [skillStatus, setSkillStatus] = useState({});

  const handleHamburgerMenuPress = () => {
    // Your logic for handling the hamburger menu press event goes here
  };

  const handleAddStudent = async () => {
    // Add your validation logic for the input fields here
    if (firstName && lastName) {
      try {
        await addStudent(firstName, lastName, startDate);

        // Clear input fields and close the modal
        setFirstName('');
        setLastName('');
        setAddStudentModalVisible(false);

        // Show the level buttons
        setShowLevelButtons(true);

        // Show an alert or a message to confirm that the student has been added
        Alert.alert('Success', 'Student added successfully!');
      } catch (error) {
        // Handle any errors during the add operation
        console.error('Error adding student:', error);
        Alert.alert(
          'Error',
          'There was an error adding the student. Please try again.',
        );
      }
    } else {
      // Show an alert if the input fields are not valid
      Alert.alert('Error', 'Please fill in all the required fields.');
    }
  };

  const handleNotesChange = (text, skillId) => {
    setNotes(prevNotes => ({...prevNotes, [skillId]: text}));

    setSkillStatus(prevStatus => ({
      ...prevStatus,
      [skillId]: {
        ...prevStatus[skillId],
        notes: text,
      },
    }));
  };

  const handleSkillCheck = skillId => {
    setSkillStatus(prevStatus => ({
      ...prevStatus,
      [skillId]: {
        ...prevStatus[skillId],
        completed: !prevStatus[skillId]?.completed,
      },
    }));
  };

  const getSkillStyle = skillId => {
    const status = skillStatus[skillId];
    console.log(status);
    if (!status || (!status.completed && !status.notes)) {
      return {borderColor: 'red'}; // Incomplete skill
    } else if (status.completed) {
      return {borderColor: 'green'}; // Completed skill with notes
    } else {
      return {borderColor: 'yellow'}; // Partially completed skill (either completed without notes or has notes but not marked as completed)
    }
  };

  const renderBottomButtons = () => {
    return (
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => console.log('Submit')}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    );
  };

  // const renderBottomButtons = () => {
  //   switch (selectedLevel) {
  //     case 1:
  //       return (
  //         <>
  //           <Button
  //             title="Level 2"
  //             onPress={() => {
  //               setActiveLevel(level2Skills);
  //               setSelectedLevel(2);
  //             }}
  //           />
  //           <Button
  //             title="Level 3"
  //             onPress={() => {
  //               setActiveLevel(level3Skills);
  //               setSelectedLevel(3);
  //             }}
  //           />
  //           <Button title="Submit" onPress={() => console.log('Submit')} />
  //         </>
  //       );
  //     case 2:
  //       return (
  //         <>
  //           <Button
  //             title="Level 1"
  //             onPress={() => {
  //               setActiveLevel(level1Skills);
  //               setSelectedLevel(1);
  //             }}
  //           />
  //           <Button title="Submit" onPress={() => console.log('Submit')} />
  //           <Button
  //             title="Level 3"
  //             onPress={() => {
  //               setActiveLevel(level3Skills);
  //               setSelectedLevel(3);
  //             }}
  //           />
  //         </>
  //       );
  //     case 3:
  //       return (
  //         <>
  //           <Button title="Submit" onPress={() => console.log('Submit')} />
  //           <Button
  //             title="Level 1"
  //             onPress={() => {
  //               setActiveLevel(level1Skills);
  //               setSelectedLevel(1);
  //             }}
  //           />
  //           <Button
  //             title="Level 2"
  //             onPress={() => {
  //               setActiveLevel(level2Skills);
  //               setSelectedLevel(2);
  //             }}
  //           />
  //         </>
  //       );
  //   }
  // };

  // const renderBackButton = () => (
  //   <TouchableOpacity
  //     style={styles.backButton}
  //     onPress={() => console.log('Back pressed')}>
  //     <Text style={styles.backButtonText}>Back</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../images/Logo_TagLine_NoBorder_Cropped.png')}
            style={styles.logo}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Skill Assessment</Text>
        </View>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => console.log('Menu pressed')}>
          <FontAwesomeIcon icon={faBars} size={32} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        <TouchableOpacity
          style={styles.addNewStudentButton}
          onPress={() => setAddStudentModalVisible(true)}>
          <Text style={styles.addNewStudentButtonText}>Add New Student</Text>
        </TouchableOpacity>
        <View style={styles.levelButtons}>
          <TouchableOpacity
            style={[
              styles.levelButton,
              selectedLevel === 1 && styles.activeLevelButton,
            ]}
            onPress={() => {
              setActiveLevel(level1Skills);
              setSelectedLevel(1);
            }}>
            <Text style={styles.levelButtonText}>Level 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.levelButton,
              selectedLevel === 2 && styles.activeLevelButton,
            ]}
            onPress={() => {
              setActiveLevel(level2Skills);
              setSelectedLevel(2);
            }}>
            <Text style={styles.levelButtonText}>Level 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.levelButton,
              selectedLevel === 3 && styles.activeLevelButton,
            ]}
            onPress={() => {
              setActiveLevel(level3Skills);
              setSelectedLevel(3);
            }}>
            <Text style={styles.levelButtonText}>Level 3</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {activeLevel &&
            activeLevel.map((skill, index) => {
              const skillStyle = getSkillStyle(index);
              return (
                //   <DropShadow style={styles.shadowContainer}>
                <View key={index} style={[styles.skillContainer, skillStyle]}>
                  <View style={styles.skillTextContainer}>
                    <Text style={styles.skillText}>{skill}</Text>
                    <TouchableOpacity onPress={() => handleSkillCheck(index)}>
                      {skillStatus[index]?.completed ? (
                        <FontAwesomeIcon
                          icon={faCheckSquare}
                          size={24}
                          color="black"
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faSquare}
                          size={24}
                          color="black"
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.notesInputContainer}>
                    <TextInput
                      style={styles.notesInput}
                      placeholder="Notes..."
                      onChangeText={text => handleNotesChange(text, index)}
                      value={notes[index]}
                    />
                  </View>
                </View>
                //   </DropShadow>
              );
            })}
        </ScrollView>
        <View style={styles.bottomButtons}>{renderBottomButtons()}</View>
        {/* {renderBackButton()} */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#808a9f',
  },
  // shadowContainer: {
  //     shadowOffset: { width: 0, height: 5 },
  //     shadowColor: '#fff',
  //     shadowOpacity: 0.4,
  //     shadowRadius: 2,
  // },
  header: {
    display: 'flex',
    justifyContent: 'space-betweeen',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#808a9f',
    paddingHorizontal: 15,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingBottom: 30,
  },
  logoContainer: {
    position: 'absolute',
    //   left: -40,
    top: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  logo: {
    width: 70,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  menuButton: {
    position: 'absolute',
    right: 15,
    top: Platform.OS === 'android' ? StatusBar.currentHeight + 5 : 5,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#161616',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addNewStudentButton: {
    backgroundColor: '#fdfdbf', // Change this to the color of your choice
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  addNewStudentButtonText: {
    color: '#161616', // Change this to the color of your choice
    fontSize: 16,
    fontWeight: 'bold',
  },
  levelButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: '100%',
  },
  levelButton: {
    backgroundColor: '#C7E6EB',
    color: '#161616',
    width: '25%',
    borderRadius: 3,
    textAlign: 'center',
  },
  levelButtonText: {
    color: '#161616',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  levelContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#808a9f',
    width: Dimensions.get('window').width,
    alignItems: 'center',
    paddingVertical: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  skillText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
    width: '80%',
    color: '#c7e6eb',
  },
  submitButton: {
    backgroundColor: '#FE938C',
    width: '80%',
    borderRadius: 5,
    paddingVertical: 7,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#161616',
    fontSize: 24,
    textAlign: 'center',
  },
  skillContainer: {
    borderWidth: 4,
    borderRadius: 5,
    marginBottom: 5,
    marginTop: 10,
    width: '100%',
    backgroundColor: '#808a9f',
  },

  skillNameContainer: {
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  notesContainer: {
    flex: 3,
    borderWidth: 1,
    borderRadius: 10,
    marginRight: 10,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  skillTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    margin: 10,
  },
  notesInputContainer: {
    flex: 1,
    width: '95%',
    margin: 10,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 5,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default HomePageScreen;
