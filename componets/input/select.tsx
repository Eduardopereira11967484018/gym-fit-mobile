import React, { useState } from 'react';
import { 
  View, 
  StyleSheet, 
  Text, 
  TouchableOpacity,
  FlatList,
  Modal 
} from 'react-native';
import { Controller } from 'react-hook-form';
import { Feather } from '@expo/vector-icons';

interface OptionsProps {
  label: string;
  value: string | number;
}

interface SelectProps {
  name: string;
  control: any;
  placeholder?: string;
  error?: string;
  options: OptionsProps[];
}

export function Select({ name, control, placeholder, error, options }: SelectProps) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity style={styles.select} onPress={() => setVisible(true)}>
              <Text style={value ? styles.selectedText : styles.placeholderText}>
                {value ? options.find(option => option.value === value)?.label : placeholder}
              </Text>
              <Feather name="arrow-down" size={16} color={Colors.blue} />
            </TouchableOpacity>

            <Modal
              visible={visible}
              animationType="fade"
              transparent={true}
              onRequestClose={() => setVisible(false)}
            >
              <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPress={() => setVisible(false)}
              >
                <TouchableOpacity style={styles.modalContent} activeOpacity={1}>
                  <TouchableOpacity
                    onPress={() => setVisible(false)}
                    style={styles.closeButton}
                  >
                    <Feather name="x" size={20} color={Colors.blue} />
                  </TouchableOpacity>

                  <FlatList
                    contentContainerStyle={{ gap: 4 }}
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => {
                          onChange(item.value);
                          setVisible(false);
                        }}
                      >
                        <Text style={styles.optionText}>{item.label}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </TouchableOpacity>
              </TouchableOpacity>
            </Modal>
          </>
        )}
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const Colors = {
  background: '#1C2833',
  white: '#F8F9F9',
  green: '#20C997',
  orange: '#FFA500',
  blue: '#005F73',
  black: '#2F4F4F',
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  select: {
    flexDirection: 'row',
    height: 44,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.blue,
    shadowColor: Colors.black,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedText: {
    color: Colors.black,
  },
  placeholderText: {
    color: 'gray',
    fontStyle: 'italic',
  },
  modalContainer: {
    backgroundColor: 'rgba(0,0,0, 0.6)',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  closeButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  option: {
    paddingVertical: 14,
    backgroundColor: Colors.green,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  optionText: {
    color: Colors.white,
  },
  errorText: {
    color: Colors.orange,
    marginTop: 4,
    fontSize: 12,
  },
});
