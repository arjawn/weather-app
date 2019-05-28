import React from 'react';
import { TextInput, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

export default class SearchInput extends React.Component {
    state = {
        text: ''
    };

    static PropTypes = {
        placeholder: PropTypes.string,
        onSubmit: PropTypes.func.isRequired
    };

    static defaultProps = {
        placeholder: ''
    };

    handleChangeText = text => {
        this.setState({ text: text });
    };

    handleSubmitEditing = () => {
        const { onSubmit } = this.props;
        const { text } = this.state;

        if (!text) return;

        onSubmit(text);
        this.setState({ text: '' });
    };

    render() {
        const { placeholder } = this.props;
        const { text } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    autoCorrect={false}
                    value={text}
                    placeholder={placeholder}
                    placeholderTextColor='white'
                    underlineColorAndroid='transparent'
                    style={styles.textInput}
                    clearButtonMode='always'
                    onChangeText={this.handleChangeText}
                    onSubmitEditing={this.handleSubmitEditing}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 40,
        width: 300,
        marginTop: 20,
        backgroundColor: '#666',
        marginHorizontal: 20,
        paddingHorizontal: 10,
        borderRadius: 5
    },
    textInput: {
        flex: 1,
        color: 'white'
    }
});
