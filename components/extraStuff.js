import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

<TextInput onChangeText={(val) => setName(val)}/>
setSong(e) {
    var songId = e.target.closest(".index_row").id;
    this.setState({ page: songId });
    window.history.pushState({ page: songId }, "", songId);
    window.scrollTo(0, 0);
  }



  (search === '') ? <FlatList
  data={appData.sort((a, b) => a.title.localeCompare(b.title)).slice(0, 100)}
  keyExtractor={(item) =>  item.id.toString() }
  renderItem={({ item: { title }, index }) => (
    <View>
      <Text 
      style={[styles.titleText, textOnPress, {backgroundColor: index % 2 === 0 ? 'white' : '#F2F2F2'}]}
      onPress={() => setPressed(true)}
  >{title}</Text>
    </View>
  )}/>