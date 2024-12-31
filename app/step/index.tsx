import { 
  View, 
  Text,  
  StyleSheet, 
  Pressable, 
  ScrollView
 } from 'react-native'
import { Colors } from '../../constants/Colors'
import { Header } from '../../componets/header/index'
import { Input } from '../../componets/input/index'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from  'react-hook-form'
import { router } from 'expo-router'
//import { useDataStore } from '../../store/data'


const schema = z.object({
  name: z.string().min(1, { message: "Name is mandatory"}),
  weight: z.string().min(1, { message: "Weight is mandatory"}),
  age: z.string().min(1, { message: "Age is mandatory"}),
  height: z.string().min(1, { message: "Height is mandatory"}),
})

type FormData = z.infer<typeof schema>

export default function Step(){
  
  const { control, handleSubmit, formState: { errors, isValid } } = useForm<FormData>({
    resolver: zodResolver(schema)
  })

  const setPageOne = useDataStore(state => state.setPageOne)


  function handleCreate(data: FormData){
    console.log("PASSANDO DADOS DA PAGINA 1");
    
    setPageOne({
      name: data.name,
      weight: data.weight,
      age: data.age,
      height: data.height
    })

   router.push("/create")
  }

  return(
    <View style={styles.container}>
      <Header
        step='Step 1 of 2'
        title='Personal data'
      />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Nome:</Text>
        <Input
          name="name"
          control={control}
          placeholder="Enter your name..."
          error={errors.name?.message}
          keyboardType="default"
        />
        
        <Text style={styles.label}>Your current weight:</Text>
        <Input
          name="weight"
          control={control}
          placeholder="Ex: 75"
          error={errors.weight?.message}
          keyboardType="numeric"
        />     
        
        <Text style={styles.label}>Your current height:</Text>
        <Input
          name="height"
          control={control}
          placeholder="Ex: 1.90"
          error={errors.height?.message}
          keyboardType="numeric"
        />     
        
        <Text style={styles.label}>Your current age:</Text>
        <Input
          name="age"
          control={control}
          placeholder="Ex: 24"
          error={errors.age?.message}
          keyboardType="numeric"
        />

        <Pressable style={styles.button} onPress={handleSubmit(handleCreate)}>
          <Text style={styles.buttonText}>Avançar</Text>
        </Pressable>     

      </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: Colors.background
  },
  content:{
    paddingLeft: 16,
    paddingRight: 16,
  },
  label:{
   fontSize: 16,
   color: Colors.white,
   fontWeight: 'bold',
   marginBottom: 8, 
  },
  button:{
    backgroundColor: Colors.blue,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText:{
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
})

function useDataStore(arg0: (state: any) => any) {
  throw new Error('Function not implemented.')
}
