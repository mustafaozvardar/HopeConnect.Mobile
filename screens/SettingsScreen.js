import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, TouchableOpacity ,Text, View, Image, BackHandler } from 'react-native';
import {Provider as PaperProvider, Card, } from 'react-native-paper';
import React, {useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { Avatar, Button } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LeftContent1 = props => <Image source={require("../assets/images/meal.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent1 = props => <Text style={styles.txt}>Food</Text>


const LeftContent2 = props => <Image source={require("../assets/images/clothing.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent2 = props => <Text style={styles.txt}>Clothes</Text>


const LeftContent3 = props => <Image source={require("../assets/images/education.png")} style={{marginTop:50,width:80,height:80}}  />
const RightContent3 = props => <Text style={styles.txt}>Education</Text>

const LeftContent4 = props => <Image source={require("../assets/images/accomodation.png")} style={{marginTop:50,width:90,height:90}}  />
const RightContent4 = props => <Text style={styles.txt}>Accomodation</Text>

/*const handleCardPress = () => {
  // Kart basıldığında yapılacak işlemler buraya gelecek
  console.log("Karta basıldı!");
  // İstenirse başka bir sayfaya geçiş yapılabilir
 

};
*/

const LeftContent = props => <Image source={require("../assets/images/user.png")} style={{marginTop:15,width:60,height:60}}  />

export default function App() {
  const navigation = useNavigation();
  const [donationArchive, setDonationArchive] = React.useState([{}]);
  const getDonationArchive = async () => {
    var userToken = await AsyncStorage.getItem('userToken');
    const response = await axios.get('http://hopeconnect.somee.com/api/UserActivitiy/GetUserDonationArchive', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + userToken,
      },
    });
    if (response.data.responseCode === 200) {
      setDonationArchive(response.data.data);
    }
    else
    {
      console.log(response.data.message);
    }
  };
  useEffect(() => {
    getDonationArchive();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDonationArchive();
    });
    return unsubscribe;
}, []);

  return (
    <PaperProvider>
      <ScrollView style={styles.container}>
        <SafeAreaView style={{ flex: 0}}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: '#ff8d20', padding: 10, borderRadius: 50, marginLeft: 10 }}>
              <ArrowLeftIcon size={23}  color="white" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Text style={styles.txttop}>Archive</Text>
        {donationArchive && donationArchive.map((donationArchiveItem, index) => (
          <Card style={styles.cardBox} key={index}>
            <Card.Title  left={LeftContent} />
            <Card.Content>
              <Text variant="titleLarge" style={styles.txt}>
                {donationArchiveItem.title}       __________________________________
              </Text>
            </Card.Content>
            <Text variant="bodyMedium" style={styles.txtdetail} >Name: {donationArchiveItem.name}</Text>
            <Text variant="bodyMedium" style={styles.txtdetail} >Location: {donationArchiveItem.location}</Text>
            <Text variant="bodyMedium" style={styles.txtdetail} >Recipient Type: {donationArchiveItem.recipientType}</Text>
            <Text variant="bodyMedium" style={styles.txtdetail} >Date: {donationArchiveItem.donationDate}</Text>
            <Text style={styles.details}>
              {donationArchiveItem.description}
            </Text>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  cardBox:{
    margin:10,
    backgroundColor:'white',     
  },

  txt:{
    marginTop:-50,
    textAlign:'center',
    fontSize:18,
    color:'black',
    fontWeight: 'bold',
    marginLeft:50
     
  },


  txttop:{
    marginLeft:20,
    fontSize:40,
    color:'black',
    marginBottom:20,
    fontWeight: 'bold',
    textAlign:'center'
  },


  txtdetail:{
    fontSize:18,
    marginTop:15,
    marginLeft:10,
    fontWeight:'bold',
    color:'#ff8d20',
  },

  txtdetail2:{
    fontSize:15,
    fontWeight:'bold',
    textAlign:'right',
    marginRight:100
  },

  details:{
    marginTop:11,
    textAlign:'center',
    padding:12
  }
});
