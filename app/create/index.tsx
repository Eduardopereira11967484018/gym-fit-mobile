import { 
  View, 
  Text,  
  StyleSheet, 
  Pressable, 
  ScrollView 
} from 'react-native';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Colors } from '../../constants/Colors';
import { Header } from '../../componets/header/index';
import { Select } from '../../componets/input/select';
import { useDataStore } from '../../store/data';
import { router } from 'expo-router';

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione seu nível" }),
  objectiveFrequency: z.string().min(1, { message: "A frequência do objetivo é obrigatória" }),
});

type FormData = z.infer<typeof schema>;

export default function Create() {
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo as (data: FormData) => void);

  const genderOptions = [
    { label: "Masculino", value: "masculine" },
    { label: "Feminino", value: "feminine" },
  ];

  const levelOptions = [
    { label: 'Sedentário (pouca ou nenhuma atividade física)', value: 'Sedentary' },
    { label: 'Levemente ativo (1 a 3 vezes por semana)', value: 'Mildly active' },
    { label: 'Moderadamente ativo (3 a 5 vezes por semana)', value: 'Moderately active' },
    { label: 'Altamente ativo (5 a 7 vezes por semana)', value: 'Highly active' },
  ];

  const objectiveOptions = [
    { label: 'Perder peso', value: 'to lose weight' },
    { label: 'Hipertrofia', value: 'Hypertrophy' },
    { label: 'Hipertrofia + Definição', value: 'Hypertrophy + Definition' },
    { label: 'Definição', value: 'definition' },
  ];

  const objectiveFrequencyOptions = [
    { label: '1 dia por semana', value: '1' },
    { label: '2 dias por semana', value: '2' },
    { label: '3 dias por semana', value: '3' },
    { label: '4 dias por semana', value: '4' },
    { label: '5 dias por semana', value: '5' },
    { label: '6 dias por semana', value: '6' },
    { label: '7 dias por semana', value: '7' },
  ];

  function handleCreate(data: FormData) {
    setPageTwo({
      level: data.level,
      objective: data.objective,
      objectiveFrequency: data.objectiveFrequency,
      gender: data.gender,
    });

    router.push('/nutrition');
  }

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Criando treino" />
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />

        <Text style={styles.label}>Nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o nível de atividade física"
          error={errors.level?.message}
          options={levelOptions}
        />

        <Text style={styles.label}>Objetivo:</Text>
        <Select
          control={control}
          name="objective"
          placeholder="Selecione o objetivo"
          error={errors.objective?.message}
          options={objectiveOptions}
        />

        <Text style={styles.label}>Frequência do objetivo:</Text>
        <Select
          control={control}
          name="objectiveFrequency"
          placeholder="Selecione a frequência"
          error={errors.objectiveFrequency?.message}
          options={objectiveFrequencyOptions}
        />

        <Pressable 
          style={[styles.button, !isValid && styles.buttonDisabled]} 
          onPress={handleSubmit(handleCreate)} 
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  button: {
    backgroundColor: Colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 16,
  },
  buttonDisabled: {
    backgroundColor: Colors.blue,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
