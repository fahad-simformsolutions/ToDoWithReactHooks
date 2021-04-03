import React, {useState} from 'react';
import {TextInput, View, Text} from 'react-native';
import styles from './Styles/CustomInputStyles';
import {Colors} from '../theme';

const CustomInput = ({label, error, ...props}) => {
  const [inputFocus, setInputFocus] = useState(false);
  return (
    <>
      <View style={styles.inputBox}>
        {inputFocus === true && props?.value !== '' && (
          <Text style={styles.label}>{label}</Text>
        )}
        <TextInput
          autoFocus={true}
          style={styles.inputText}
          placeholderTextColor={Colors.placeholder}
          onFocus={() => setInputFocus(true)}
          {...props}
        />
      </View>
      {error !== 'No Error' && <Text style={styles.errorText}>{error}</Text>}
    </>
  );
};

export default CustomInput;
