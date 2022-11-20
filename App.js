import React, {useState, useCallback} from 'react';
import axios from "axios";
import { StyleSheet, Text, View, ImageBackground, TextInput, ActivityIndicator } from 'react-native';

export default function App() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState('');
  const api = {
    key: "784259aeeb1845c6830e826ea0add047",
    baserUrl: "https://api.openweathermap.org/data/2.5/",
  }
  // const fetchData = useCallback(() => {
  //   setLoading(true);
  //   setInput("");
  //   fetch('https://api.openweathermap.org/data/3.0/weather?appid=${api.key}&q=${input}&units=metric')
  //   .then(res => {
  //     setData(res.data);
  //   }).catch(e => console.dir(e))
  //     .finally(() => setLoading(false));
  // }, [api.key, input]);
  const fetchData = useCallback(() => {
    setLoading(true);
    setInput('');
    axios({
      method: 'GET',
      url: `https://api.openweathermap.org/data/2.5/weather?&q=${input}&units=metric&appid=${api.key}`,
    })
    .then(res => {
      setData(res.data);
    }).catch(e => console.dir(e))
      .finally(() => setLoading(false));
  }, [api.key, input]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require('./assets/Bg1.jpg')}
      resizeMode="cover"
      style={styles.image}
      >
      <View>
        <TextInput placeholder='Enter city name ...'
          onChangeText={text => setInput(text)}
          value={input}
          placeholderTextColor={"#000"}
          style={styles.textInput}
          onSubmitEditing={fetchData}
        />
      </View>

      {loading && 
        (<View>
          <ActivityIndicator size={'large'} color='#000'/>
        </View>
      )}
      { data && 
        (<View style={styles.infoView}>
          <Text style={styles.cityCountryText}>
            { `${data?.name}, ${data?.sys?.country}` }
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString()}
          </Text>
          <Text style={styles.tempText}>
            {`${data?.main?.temp} ℃`}
          </Text>
          <Text style={styles.minMaxText}>
            {`Min ${data?.main?.temp_min} ℃ / Max ${data?.main?.temp_max} ℃`}
          </Text>
        </View>) 
      }
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    // borderBottomWidth: 3,
    padding: 5,
    paddingVertical: 20,
    marginVertical: 100,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    opacity: 0.5,
    fontSize: 19,
    borderRadius: 16,
    // borderBottomColor: "#eee"
  },
  infoView: {
    alignItems: "center",
  },
  cityCountryText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: 'bold',
  },
  dateText: {
    color: '#fff',
    fontSize: 32,
    marginVertical: 10,
  },
  tempText: {
    fontSize: 45,
    color: "#fff",
    marginVertical: 10,
  },
  minMaxText: {
    fontSize: 22,
    color: "#fff",
    // fontWeight: 500,
    marginVertical: 10,
  },
});
