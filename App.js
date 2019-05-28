import React from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    KeyboardAvoidingView,
    View,
    ImageBackground,
    ActivityIndicator,
    StatusBar
} from 'react-native';

import { fetchLocationId, fetchWeather } from './utils/api';
import getImageforWeather from './utils/getImageForWeather';

import SearchInput from './components/SearchInput';

export default class App extends React.Component {
    state = {
        loading: false,
        error: false,
        temperature: 0,
        location: '',
        weather: ''
    };

    componentDidMount() {
        this.handleUpdateLocation('San Francisco');
    }

    handleUpdateLocation = async city => {
        if (!city) return;

        this.setState({ loading: true }, async () => {
            try {
                const locationId = await fetchLocationId(city);
                const { location, weather, temperature } = await fetchWeather(
                    locationId
                );

                this.setState({
                    loading: false,
                    error: false,
                    location,
                    weather,
                    temperature
                });
            } catch (e) {
                this.setState({
                    loading: false,
                    error: true
                });
            }
        });
    };

    render() {
        const { loading, error, location, weather, temperature } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <StatusBar barStyle='light-content' />
                <ImageBackground
                    source={getImageforWeather(weather)}
                    style={styles.imageContainer}
                    imageStyle={styles.image}
                >
                    <View style={styles.detailsContainer}>
                        <ActivityIndicator
                            animating={loading}
                            color='white'
                            size='large'
                        />

                        {!loading && (
                            <View>
                                {error && (
                                    <Text
                                        style={[
                                            styles.largeText,
                                            styles.textStyle
                                        ]}
                                    >
                                        Could not load weather, please try a
                                        different city.
                                    </Text>
                                )}

                                {!error && (
                                    <View>
                                        <Text
                                            style={[
                                                styles.largeText,
                                                styles.textStyle
                                            ]}
                                        >
                                            {location}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.smallText,
                                                styles.textStyle
                                            ]}
                                        >
                                            {weather}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.largeText,
                                                styles.textStyle
                                            ]}
                                        >
                                            {`${Math.round(temperature)}˚`}
                                        </Text>
                                    </View>
                                )}
                                <SearchInput
                                    placeholder='Search any city'
                                    onSubmit={this.handleUpdateLocation}
                                />
                            </View>
                        )}
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#34495E'
    },
    imageContainer: {
        flex: 1
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    },
    textStyle: {
        textAlign: 'center',
        fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
        color: 'white'
    },
    largeText: {
        fontSize: 44
    },
    smallText: {
        fontSize: 18
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)',
        paddingHorizontal: 20
    }
});
