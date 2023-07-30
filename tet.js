import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from 'axios';


export default function App() {

  const [data, setData] = useState(null);


  const callAPI = async () => {
    

    // Construct the API URL with query parameters
    const apiUrl = `https://trouverunlogement.lescrous.fr/api/fr/search/31`;

    data_rouen = {
        idTool: 31,
        need_aggregation: true,
        page: 1,
        pageSize: 24,
        sector: null,
        occupationModes: [],
        location: [
           
        ],
        residence: null,
        precision: 6,
        equipment: [],
        price: {
            min: 0,
            max: 10000000
        }
    }


    data_76800 ={
        idTool: 31,
        need_aggregation: true,
        page: 1,
        pageSize: 24,
        sector: null,
        occupationModes: [],
        location: [
            {
                lon: 1.0580101,
                lat: 49.4097835
            },
            {
                lon: 1.1237186,
                lat: 49.3567681
            }
        ],
        residence: null,
        precision: 6,
        equipment: [],
        price: {
            min: 0,
            max: 10000000
        }
    }
    try {
      // Make the GET request to the API with Axios
      console.log(data_rouen);
      const response = await axios.post(apiUrl,data_rouen);

      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  };

  callAPI();

  return (
    <View style={styles.container}>

      {data ? (
        <Text>{(data.results.total )}</Text>
      ) : (
        <Text style={styles.container}>Loading data...</Text>
      )}
        <StatusBar style="auto" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});










const { google } = require('googleapis');

// Set up OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
  'YOUR_CLIENT_ID',
  'YOUR_CLIENT_SECRET',
  'YOUR_REDIRECT_URI'
);

// Set the access token obtained after the OAuth2 flow
oauth2Client.setCredentials({
  access_token: 'USER_ACCESS_TOKEN',
  refresh_token: 'USER_REFRESH_TOKEN',
});

// Create a Gmail API client
const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

// Function to send an email
async function sendEmail(to, subject, message) {
  const rawMessage = `From: YOUR_EMAIL_ADDRESS\r\nTo: ${to}\r\nSubject: ${subject}\r\n\r\n${message}`;

  try {
    await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: Buffer.from(rawMessage).toString('base64'),
      },
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
