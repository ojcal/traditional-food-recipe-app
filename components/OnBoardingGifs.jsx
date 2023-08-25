import React from 'react';
import { View, Dimensions } from 'react-native';
import { Image } from 'expo-image';

const SCR_WIDTH = Dimensions.get('window').width;
const SCR_HEIGHT = Dimensions.get('window').height;
const HEIGHT = SCR_HEIGHT * 0.5;

const CarouselGif = () => {
    return (

        <View style={{ width: SCR_WIDTH, height: HEIGHT }}>
          <Image
            source={require('../assets/gifs/carousel.gif')}
            contentFit='contain'
            style={{ flex: 1 }}
          />
        </View>

    );
  }

  const RemoveFavGif = () => {
    return (
        <View style={{ width: SCR_WIDTH, height: HEIGHT }}>
          <Image
            source={require('../assets/gifs/removefav.gif')}
            contentFit='contain'
            style={{ flex: 1 }}
          />
        </View>
    );
  } 

  export { CarouselGif, RemoveFavGif };