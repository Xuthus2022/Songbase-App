import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator, FlatList, StyleSheet, TextInput } from 'react-native';

export default App2 = () => {

  // Variables that hold data
  const [songsData, setSongs] = useState([])
  const [referencesData, setReferences] = useState([])
  const [booksData, setBooks] = useState([])
  
  const [search, setSearch] = useState('') 

  // Variables that have true and false values
  const [titlePressed, setPressed] = useState(false)
  const [isLoading, setLoading] = useState(true)

  // Variables that cant be in StyleSheets
  const textOnPress = {
    backgroundColor: titlePressed ? '#202020' : '#fff',
    fontWeight: titlePressed ? "bold" : "normal",
    color: titlePressed ? '#fff' : '#000',
  }

  useEffect(() => {
    fetch('https://songbase.life/api/v1/app_data?updated_at=0')
      .then((response) => response.json())
      .then((json) => setSongs(json.songs))
      .then((json) => setReferences(json.references))
      .then((json) => setBooks(json.books))
      
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))
  }, []); 

  function handleChange(event) {
    switch (event.target.id) {
      case "index_search":
        setSearch(event.target.value) 
        break 
    }
  };

  function searchIsNumber() {
    const isNumberRegex = new RegExp("^[0-9]+$", "i")
    return isNumberRegex.test(search)
  };

  function getSearchResults() {
    const stripString = function(str) {
      str = str.replace(/\_/g, " ")
      return str.normalize("NFD").replace(/(\[.+?\])|[’'",“\-—–!?()\[\]]|[\u0300-\u036f]/g, "")
    } 
    const strippedSearch = stripString(search)
    const searchResults = []
    const displayLimit = 100 // react gets laggy rendering 2k songsData, so there's a limit

    if (strippedSearch == "") {
      console.log("no search detected.")
      searchResults = songsData.slice(0, displayLimit).map(song => {
        return {
          song: song,
          tag: ""
        }
      })
    } else if (() => searchIsNumber()) {
      const search = parseInt(search) 
      const refs = referencesData.filter(ref => ref.index == search) 
      searchResults = refs.map(ref => {
        const book = booksData.find(book => book.id == ref.book_id) 
        return {
          song: songsData.find(song => song.id == ref.song_id),
          tag:
            '<span class="search_tag">' +
            book.name +
            ": #" +
            ref.index +
            "</span>"
        } 
      }) 
      return searchResults 
    } else {
      const titleStartRegex = new RegExp("^" + strippedSearch, "i") 
      const titleMatchRegex = new RegExp(strippedSearch, "i") 
      const lyricsMatchRegex = new RegExp(strippedSearch, "i") 

      searchResults = songsData
        .filter(song => {
          const title = stripString(song.title) 
          const lyrics = stripString(song.lyrics) 
          return titleMatchRegex.test(title) || lyricsMatchRegex.test(lyrics) 
        })
        .map(song => {
          return {
            song: song,
            tag: ""
          } 
        }) 

      // sort the results, making title matches appear higher than lyrics matches
      searchResults.sort((a, b) => {
        const titles = [stripString(a.song.title), stripString(b.song.title)] 
        const weights = titles.map(title => {
          if (titleStartRegex.test(title)) {
            return 2 
          } else if (titleMatchRegex.test(title)) {
            return 1 
          } else {
            return 0 
          }
        }) 

        // sort alphabetically if they are in the same regex category
        if (weights[0] == weights[1]) {
          if (titles[0] < titles[1]) return -1 
          if (titles[0] > titles[1]) return 1 
          return 0 
        } else {
          return weights[1] - weights[0] 
        }
      }) 
    }

    return searchResults.slice(0, displayLimit) 
  };

  function render() {
    getKeysByValue = function(object, value) {
      return Object.keys(object).filter(key => object[key] === value);
    };

    return (
      <div className="song-index" key="song-index">
        <div className="search-form form" key="search-form">
          <input
            id="index_search"
            value={search}
            onChange={on}
            name="song[search]"
            className="index_search"
            placeholder="search..."
            key="search-input"
          />
          {search.length > 0 ? (
            <div className="btn_clear_search" onClick={this.props.clearSearch}>
              ×
            </div>
          ) : null}
        </div>
        <div className="title-list">
          {!!isLoading ? (
            <div className="loading">Loading song data...</div>
          ) : (
            () => getSearchResults().map(function(result, i) {
              return (
                <div
                  className="index_row"
                  key={i}
                  id={result.song.id}
                  onClick={this.props.setSong}
                >
                  <span className="index_row_title">{result.song.title}</span>
                  <span
                    className="index_row_tag"
                    dangerouslySetInnerHTML={{ __html: result.tag }}
                  />
                </div>
              );
            }, this)
          )}
        </div>
      </div>
    )
  };
};
