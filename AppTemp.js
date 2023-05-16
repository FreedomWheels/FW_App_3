<ScrollView>
{activeLevel &&
  activeLevel.map((skill, index) => {
      const skillStyle = getSkillStyle(index);
      return(
      
    <View key={index}>
      {/* New View for skillTextContainer */}
      <View style={[styles.skillTextContainer, getSkillStyle(index)]}>
        <Text
          style={[styles.skillText, { lineHeight: 20 }]}
          numberOfLines={3}
        >
          {skill}
        </Text>
        {/* <View> */}
        <TouchableOpacity onPress={() => handleSkillCheck(index)}>
          {skillStatus[index]?.completed ? (
            <FontAwesomeIcon
              icon={faCheckSquare}
              size={24}
              color="black"
            />
          ) : (
            <FontAwesomeIcon icon={faSquare} size={24} color="black" />
          )}
        </TouchableOpacity>
      {/* </View> */}
      </View>
      {/* End of new View */}
      <View style={[styles.notesContainer]}>
        <TextInput
          style={[styles.notesInput, getSkillStyle(index)]}
          placeholder="Notes..."
          onChangeText={(text) => handleNotesChange(text, index)}
          value={notes[index]}
        />
      </View>
     
    </View>
  )})}
</ScrollView>

<View style={styles.levelButtons}>
<Button
  style={styles.levelButton}
  title="Level 1"
  onPress={() => {
    setActiveLevel(level1Skills);
    setSelectedLevel(1);
  }}
/>
<Button
  style={styles.levelButton}
  title="Level 2"
  onPress={() => {
    setActiveLevel(level2Skills);
    setSelectedLevel(2);
  }}
/>
<Button
  style={styles.levelButton}
  title="Level 3"
  onPress={() => {
    setActiveLevel(level3Skills);
    setSelectedLevel(3);
  }}
/>
</View>