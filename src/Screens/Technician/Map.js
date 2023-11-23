import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Platform,
  Linking,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Layout from '../../components/Layout';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Location from '../../Helper/MobileLocation';
import Geolocation from '@react-native-community/geolocation';
import {calculateDistance} from '../../Helper/DistanceCalculator';
import MobileLocation from '../../Helper/MobileLocation';

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;
const Map = ({navigation}) => {
  const [data, setData] = useState([]);
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const user = useSelector(state => state.Reducer.user);
  const [loading, setLoading] = useState(false);
  const [location, setLocaton] = useState({});
  const [itemDirection, setItemDirection] = useState(false);

  const onMapReady = e => {};

  const onRegionChange = region => {
    console.log('onRegionChange', region);
  };

  const onRegionChangeComplete = region => {
    console.log('onRegionChangeComplete', region);
  };

  useEffect(() => {
    setLoading(true);

    Geolocation.getCurrentPosition(
      async position => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
        var config = {
          method: 'get',
          url: 'https://zacharydevworks.com/generator_app_backend/api/my-customers',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.access_token}`,
          },
          params: {
            tech_id: user.user.id,
          },
        };

        axios(config)
          .then(function (response) {
            console.log(response);
            if (response.data) {
              setData(response.data);
            }

            setTimeout(() => {
              setLoading(false);
            }, 2000);
          })
          .catch(function (error) {
            console.log(error);
            setLoading(false);
          });
      },
      async error => {
        console.log(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 15000,
      },
    );
  }, []);
  return (
    <Layout back={true} navigation={navigation}>
      <View style={{flex: 1, height: Dimensions.get('window').height}}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {lat && long ? (
              <MapView
                style={{flex: 1}}
                provider={PROVIDER_GOOGLE}
                showsUserLocation
                onMapReady={onMapReady}
                showsMyLocationButton={false}
                onRegionChange={onRegionChange}
                onRegionChangeComplete={onRegionChangeComplete}
                initialRegion={{
                  latitude: '33.6427135',
                  longitude: '73.0809961',
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}>
                {data.map(item => {
                  if (item.customer.latitude && item.customer.longitude) {
                    console.log(item, 'Testing Data For Marker');
                    return (
                      <Marker
                        onPress={() => {
                          navigation.navigate('CustomerDetial', {
                            item: item.customer,
                          });

                          console.log(item, 'Hello');
                          // let lat = parseFloat(item.customer.latitude);
                          // let lon = parseFloat(item.customer.longitude);

                          // Linking.openURL(
                          //   `https://www.google.com/maps/dir/?api=1&origin=` +
                          //     lat +
                          //     `,` +
                          //     long +
                          //     `&destination=` +
                          //     lat +
                          //     `,` +
                          //     lon +
                          //     `&travelmode=driving`,
                          // );
                        }}
                        title={item.customer.fname}
                        draggable
                        pinColor="#1A98D5"
                        image={require('../markerImage/marker.png')}
                        coordinate={{
                          latitude: parseFloat(item.customer.latitude),
                          longitude: parseFloat(item.customer.longitude),
                          latitudeDelta: LATITUDE_DELTA,
                          longitudeDelta: LONGITUDE_DELTA,
                        }}
                        onCalloutPress={e => {
                          console.log('Marker was clicked', e);
                        }}></Marker>
                    );
                  }
                })}
              </MapView>
            ) : null}
          </>
        )}
      </View>
    </Layout>
  );
};

export default Map;

const styles = StyleSheet.create({});
