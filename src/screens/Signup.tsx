import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {  Text, StyleSheet, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, ToastAndroid } from "react-native";

import { useAppDispatch, useAppSelector } from "../hooks/reduxHook";
import { resetPassword, signin, signup } from "../store/thunks/userThunk";



import {
    VStack, 
    Stack,
    Center,
    Heading,
    View,
    Input,
    Box,
    FormControl,
    Button,
    WarningOutlineIcon,
    Link,
    HStack
} from "native-base";


import { Ionicons, MaterialIcons } from '@expo/vector-icons'; 
import { PublicStackScreenProps } from "../typings/RootParamList";
import { Shadow } from "react-native-shadow-2";
import { ShadowPreset } from "../utils/theme";

import FormInput from "../components/form-input";

type Props = PublicStackScreenProps<'Signup'>
const Signup:React.FC<Props> =  ({navigation}) => {


    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [match, setMatch] = useState(true)

    const [formError, setFormError] = useState(false);
    const [errorText, setErrorText] = useState('');

     
    function matchPass(value:string){
        if(password === value){
            setMatch(true);
        }
        else setMatch(false);
    }

    async function handleSignup(){
        if(email.length > 0){
            if(password.length > 0){
                if(match){
                    dispatch(await signup({email,password}));
                }
                else{
                    setFormError(true);
                    setErrorText('Adgangskoderne matcher ikke');
                }
            }
            else{ setFormError(true);
                setErrorText('Adgangskode kræves');
            }
            
        }
        else{
            setFormError(true);
            setErrorText('Email Kræves');
        }
       
       
    }
    function goToLogin(){
        navigation.navigate('Login');
    }



    return(
        <Center  w="100%">
            <Box safeAreaTop p="2" w="90%" maxW="390" py="8">
            <Heading size="xl" color="coolGray.800" fontWeight="semibold">
                Velkommen
            </Heading>
            <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">
                Opret en bruger for at få adgang!
            </Heading>
            <VStack space="5" mt="5">
                <FormInput 
                        text='Email*'
                        setValue={setEmail}
                        isPassword={false}
                        placeHolder='Indtast din Email' 
                        isWrong={false} 
                        errorText={""}  
                        iconShow={false}
                        />
                <FormInput 
                        text='Adgangskode*'
                        setValue={setPassword}
                        isPassword={true}
                        placeHolder='Indtast adganskode' 
                        isWrong={false} 
                        errorText={""}                    />
                 <FormInput 
                        text='Bekræft Adgangskode*'
                        setValue={matchPass}
                        isPassword={true}
                        placeHolder='Bekræft din adgangskode'
                        isWrong={!match}
                        errorText='Adganskoden matcher ikke'                   />
             
                <Button isLoading={false} isLoadingText="Opretter bruger" mt="2" colorScheme={"darkBlue"} bg="theme.100" onPress={handleSignup}>
                        Opret bruger
                </Button>

                <HStack alignItems={'center'}  space={1} mt={6}>
                    <Text>Har du en bruger?</Text>
                    <Link _text={{color: "theme.100",fontWeight: "medium",fontSize: "sm"}} onPress={goToLogin}>Login</Link>
                </HStack> 
            </VStack>
            </Box>
        </Center>
    )
}



export default Signup;