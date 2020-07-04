import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TextInput, StatusBar, TouchableOpacity,Image } from 'react-native';


export default App = () => {

  const [titlePressed, setPressed] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [appData, setAppData] = useState([])
  const [search, setSearch] = useState('')

 
  const textOnPress = {
    backgroundColor: titlePressed ? '#202020' : '#fff',
    fontWeight: titlePressed ? "bold" : "normal",
    color: titlePressed ? '#fff' : '#000',
  }
  
// in the future change "updated_at" to the last time you sync'd (or 0 if https://en.meming.world/images/en/thumb/5/5d/James_Franco_First_Time.jpg/300px-James_Franco_First_Time.jpg)
  useEffect(async => {
    fetch('https://songbase.life/api/v1/app_data?updated_at=0')
      .then((response) => response.json())
      .then((json) => setAppData(json.songs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, []); 

  return (
    <View style={styles.container}>
      <StatusBar barstyle="Dark-content" />
      <View>
        <Text 
          style={styles.headerText}
          // onPress to go home
        >Songbase</Text>
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          placeholder="search..."
          onChangeText={(val) => setSearch(val)}
          value={search}
        />
        <TouchableOpacity
          style={styles.closeButtonParent}
          onPress={() => setSearch('')}>
          <Image
            style={styles.closeButton}
            source={require('./assets/close.png')}
          />
        </TouchableOpacity>
      </View>
      <View>
      { isLoading ? <ActivityIndicator/> : (
       <FlatList
        data={appData.sort((a, b) => a.title.localeCompare(b.title)).slice(0, 100)}
        keyExtractor={(item) =>  item.id.toString() }
        renderItem={({ item: { title }, index }) => (
          <View>
            <Text 
              style={[styles.titleText, textOnPress, {backgroundColor: index % 2 === 0 ? '#F2F2F2' : 'white'}]}
              onPress={() => setPressed(true)}
            >{title}</Text>
          </View>
        )}/>
      )}
      </View>
    </View>
  ) 
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
    padding: 10,
    marginTop: 20,
    color: 'blue',
    fontSize: 40,
  },
  inputView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    padding: 10,
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#777',
    width: 130,
    height: 30,
  },
  closeButton: {
    height: 32,
    width: 32,
  },
  closeButtonParent: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  titleText: {
    flex: 1,
    textAlign: 'left',
    justifyContent: 'center',
    marginHorizontal: 30,
    fontSize: 16,
  },
});  