import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

<TextInput onChangeText={(val) => setName(val)}/>
setSong(e) {
    var songId = e.target.closest(".index_row").id;
    this.setState({ page: songId });
    window.history.pushState({ page: songId }, "", songId);
    window.scrollTo(0, 0);
  }