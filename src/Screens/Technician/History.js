import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import Entypo from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-date-picker';
import {TextInput} from 'react-native-paper';
import Service from '../../components/Service';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
const History = ({route, navigation}) => {
  const user = useSelector(state => state.Reducer.user);

  const {userId} = route.params;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState('first');

  const [routes, setRoutes] = useState([
    {
      key: 'first',
      label: 'Completed',
    },
    {
      key: 'second',
      label: 'Incomplete',
    },
    {
      key: 'third',
      label: 'Initiated',
    },
  ]);

  useFocusEffect(
    React.useCallback(() => {
      getServices();
    }, []),
  );

  const getServices = () => {
    setLoading(true);

    var requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',

        Authorization: `Bearer ${user.access_token}`,
      },
      // body: data,
    };

    fetch(
      `https://zacharydevworks.com/generator_app_backend/api/customer-history/${userId}`,
      requestOptions,
    )
      .then(response => response.text())
      .then(result => {
        let res = JSON.parse(result);
        console.log(res, 'Tesetingngngngngn');
        setData(res.serviceCallHistory);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
      });
  };

  return (
    <Layout back={true} navigation={navigation}>
      {loading ? (
        <View
          style={{
            marginVertical: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator color={'#000'} size="large" />
        </View>
      ) : (
        <>
          <View style={styles.tabContainer}>
            {routes.map(item => (
              <TouchableOpacity onPress={() => setIndex(item.key)}>
                <View
                  style={[
                    styles.tab,
                    {
                      width: Dimensions.get('window').width / 3.33,
                      backgroundColor:
                        index === item.key ? '#004890' : '#FFFFFF',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.tabTitle,
                      {color: index === item.key ? '#FFFFFF' : '#004890'},
                    ]}>
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          {index === 'first' && (
            <FlatList
              style={{marginTop: 10}}
              data={data.filter(item => item.status === 'complete').reverse()}
              renderItem={({item}) => (
                <Service
                  showPress={true}
                  item={item}
                  onPress={() => {
                    navigation.navigate('ServiceDetial', {
                      id: item.id,
                    });
                  }}
                />
              )}
            />
          )}
          {index === 'second' && (
            <FlatList
              style={{marginTop: 10}}
              data={data.filter(item => item.status === 'incomplete').reverse()}
              renderItem={({item}) => (
                <Service
                  showPress={true}
                  item={item}
                  onPress={() => {
                    navigation.navigate('ServiceDetial', {
                      id: item.id,
                    });
                  }}
                />
              )}
            />
          )}
          {index === 'third' && (
            <FlatList
              style={{marginTop: 10}}
              data={data.filter(item => item.status === 'initiated').reverse()}
              renderItem={({item}) => <Service showPress={true} item={item} />}
            />
          )}
        </>
      )}
    </Layout>
  );
};

export default History;

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#004890',
    height: 70,
    padding: 10,

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffff',
    borderRadius: 10,
    shadowColor: 'black', // Shadow color
    shadowOffset: {width: 0, height: 1}, // Shadow offset
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 4, // Shadow radius
  },
  tabTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    marginTop: 30,
    // alignSelf: 'center',
    // marginHorizontal: 30,
    // bottom: 50,
    justifyContent: 'space-between',
  },
});
