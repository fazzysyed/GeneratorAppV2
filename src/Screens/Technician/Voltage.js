import {View, Text, Image, Alert} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '../../components/Layout';
import {TextInput} from 'react-native-paper';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import Button from '../../components/Button';

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import {useDispatch} from 'react-redux';

import Toast from 'react-native-simple-toast';
import {add} from 'react-native-reanimated';
import MobileLocation from '../../Helper/MobileLocation';
const AddReadings = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {fromfirstScreen} = route.params;
  const [voltageReading, setVoltageReading] = useState('');
  const [l1, setL1] = useState('');
  const [l2, setL2] = useState('');
  const [l3, setL3] = useState('');
  const [techloading, setTechloading] = useState(false);
  const [phase, setPhase] = useState('');
  const [frequency, setFrequency] = useState('');
  const [btryVoltage, setBtryVoltage] = useState('');
  const [generatorHours, setGeneratorHours] = useState('');

  const technicianLogin = () => {
    let data = {
      voltage_reading: voltageReading,
      l1: l1,
      l2: l2,
      l3: l3,
      phase: phase,
      frequency: frequency,
      battery_voltage: btryVoltage,
      hours: generatorHours,
    };

    if (fromfirstScreen.service_type === 'Service Call') {
      navigation.navigate('ServiceCall1', {
        fromfirstScreen: {
          ...fromfirstScreen,
          voltageData: data,
        },
      });
    }

    if (fromfirstScreen.service_type === 'Warranty Call') {
      navigation.navigate('WarrantyCall1', {
        fromfirstScreen: {
          ...fromfirstScreen,
          voltageData: data,
        },
      });
    }

    if (fromfirstScreen.service_type === 'Fall Service') {
      navigation.navigate('SpringFallSerivce1', {
        fromfirstScreen: {
          ...fromfirstScreen,
          voltageData: data,
        },
      });
    }

    if (fromfirstScreen.service_type === 'Spring Service') {
      navigation.navigate('SpringFallSerivce1', {
        fromfirstScreen: {
          ...fromfirstScreen,
          voltageData: data,
        },
      });
    }
  };
  return (
    <Layout navigation={navigation} back>
      <Text
        style={{
          color: '#222222',
          fontWeight: 'bold',
          marginVertical: 5,
          fontSize: 20,
        }}>
        Add Information
      </Text>

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Voltage Readings
      </Text>
      <TextInput
        value={voltageReading}
        onChangeText={text => setVoltageReading(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#000"
        keyboardType="numeric"
        style={{
          height: 50,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
          marginVertical: 10,
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        L1 Reading
      </Text>
      <TextInput
        keyboardType="numeric"
        value={l1}
        onChangeText={text => setL1(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#000"
        style={{
          height: 50,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
          marginVertical: 10,
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        L2 Reading
      </Text>

      <TextInput
        keyboardType="numeric"
        value={l2}
        onChangeText={text => setL2(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        L3 Reading
      </Text>

      <TextInput
        keyboardType="numeric"
        value={l3}
        onChangeText={text => setL3(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="#transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Phase to Phase Reading
      </Text>

      <TextInput
        keyboardType="numeric"
        value={phase}
        onChangeText={text => setPhase(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Frequency Reading
      </Text>

      <TextInput
        value={frequency}
        onChangeText={text => setFrequency(text)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="transparent"
        keyboardType="numeric"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Static Battery Voltage Reading
      </Text>

      <TextInput
        value={btryVoltage}
        keyboardType="numeric"
        onChangeText={e => setBtryVoltage(e)}
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />
      <Text style={{color: '#222222', fontWeight: 'bold', marginVertical: 10}}>
        Generator Hours Reading
      </Text>

      <TextInput
        value={generatorHours}
        onChangeText={e => setGeneratorHours(e)}
        keyboardType="numeric"
        activeUnderlineColor="#000"
        underlineColor="tranparent" // add this
        outlineColor="transparent"
        style={{
          height: 45,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          borderWidth: 1,
          borderColor: '#0048908F',
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Button
          title={'Next'}
          width={160}
          onPress={() => technicianLogin()}
          loading={techloading}
        />
        {/* <Button
          title={'Customer Log In'}
          width={160}
          onPress={() => customerLogin()}
          loading={loading}
        /> */}
      </View>
    </Layout>
  );
};

export default AddReadings;
