import { View, StyleSheet, Text, TextInput, KeyboardTypeOptions } from 'react-native';
import { Controller } from 'react-hook-form'
import { Colors } from '../../constants/Colors'
import { FontAwesome } from '@expo/vector-icons';

interface InputProps {
  name: string;
  control: any;
  label?: string;
  placeholder?: string;
  rules?: object;
  error?: string;
  keyboardType: KeyboardTypeOptions;
  icon?: keyof typeof FontAwesome.glyphMap;
}

export function Input({ name, control, label, placeholder, rules, error, keyboardType, icon }: InputProps) {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {icon && <FontAwesome name={icon} size={18} color={Colors.blue} style={styles.icon} />}
        <Controller
          control={control}
          name={name}
          rules={rules}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, icon && { paddingLeft: 30 }]}
              placeholder={placeholder}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              keyboardType={keyboardType}
            />
          )}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 44,
    paddingHorizontal: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  label: {
    fontSize: 14,
    color: 'rgba(208, 208, 208, 0.40)',
    marginBottom: 4,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 4,
  },
});
