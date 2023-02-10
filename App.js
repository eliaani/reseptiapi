import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [meals, setMeals] = useState([]);
  
  const fetchMeals = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setMeals(data.meals))
    .catch(error => {Alert.alert('Error', error);
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={{margin: 50}}>
      <TextInput style={{fontSize: 30, margin:10}} placeholder='e.g tomato' 
        onChangeText={text => setKeyword(text)} />
      <Button title="Search" onPress={fetchMeals} />
      </View>
      <FlatList 
        keyExtractor={(item, index) => index.toString()} 
        renderItem={({item}) => 
          <View>
            <Text style={{fontSize: 18, fontWeight: "bold"}}>{item.strMeal}</Text>
            <Image source={{uri: item.strMealThumb}}
            style={styles.image}/>
          </View>}
        data={meals} 
      /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    width:100,
    height:100,
    borderWidth:2,
    borderColor:'#000000',
    margin:15
  }
});