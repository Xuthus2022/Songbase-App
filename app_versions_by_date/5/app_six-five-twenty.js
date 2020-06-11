import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';


export default App = () => {

  const [pressed, setPressed] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState([])

  const touchableText = {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 14,
    backgroundColor: pressed ? '#000' : '#fff',
    fontWeight: pressed ? "bold" : "normal",
    color: pressed ? '#fff' : '#000',
  }
  
// in the future change "updated_at" to the last time you sync'd (or 0 if https://en.meming.world/images/en/thumb/5/5d/James_Franco_First_Time.jpg/300px-James_Franco_First_Time.jpg)
  useEffect(() => {
    fetch('https://songbase.life/api/v1/app_data?updated_at=0')
      .then((response) => response.json())
      .then((json) => setData(json.songs))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, []);

  return (
//Parent View
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Songbase</Text>
      </View>
      <View>
        <TextInput style={styles.input}/>
      </View>
      <View>
      { isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data.sort((a, b) => a.title.localeCompare(b.title))}
          keyExtractor={(item) =>  item.id.toString() }
          renderItem={({ item: { title } }) => (
            <View>
              <Text 
              style={touchableText}
              onPress={() => setPressed(true)}
              >{title}</Text>
            </View>
          )}/>
      )}
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',
    justifyContent: 'center',
    marginTop: 30,
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    padding: 10,
    width: 100,
    height: 30,
    alignItems: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    padding: 38,
    height: 10,

  },
  headerText: {
    color: 'blue',
    fontSize: 40,
  }
});
