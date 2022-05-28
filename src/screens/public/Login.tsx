import React, { useEffect, useState } from "react";


import {  ToastAndroid } from "react-native";


import * as SecureStore from 'expo-secure-store';

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { resetPassword, signin } from "../../store/thunks/userThunk";




import { FormControl, Icon, Input,
     InputGroup, InputLeftAddon,
      KeyboardAvoidingView, Stack, 
      WarningOutlineIcon,
      VStack,
      Heading,
      Divider,
      Center,
      Box,
      Link,
      Button,
      HStack,
      Text
    
    } from "native-base";

import { Ionicons, Entypo } from '@expo/vector-icons';
import { Slide, Spinner } from "native-base";

import { PublicStackScreenProps } from "../../typings/RootParamList";
import FormInput from "../../components/form-input";



type Props =  PublicStackScreenProps<'Login'>
const Login: React.FC<Props> = ({navigation}) => {

    const { loading, loggedInUser } = useAppSelector(state => state.user)

 
    const dispatch = useAppDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
        
    const [show, setShow] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);

    function goToSignup(){
        navigation.navigate('Signup');
    }
    async function sendResetPassword(){
        dispatch(await resetPassword(email));
    }

    async function retreiveStoredData () {
        const email_ = await SecureStore.getItemAsync('email');
        const pass_ = await SecureStore.getItemAsync('password');

        if(email_){
            if(pass_){
                setEmail(email_);
                setPassword(pass_);
            }
        }
    }

    useEffect(() => {
        //retreiveStoredData();
    }, [])



    async function handleLogin(){

        //conditions for email and password
        if(email.length > 0 && email.includes('@')){
            if(password.length > 0){
                console.log('before dispatch')
                dispatch(await signin({email, password}));
                console.log('after dispatch')
                await SecureStore.setItemAsync('email', email);
                await SecureStore.setItemAsync('password', password);
            }   
            else{   
                ToastAndroid.showWithGravityAndOffset('Indtast adgangskode', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0 , 200);
            }        
        }
        else{   ToastAndroid.showWithGravityAndOffset('Ugyldig email', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0 , 200);}
    }



    return(
            <Center w="100%" > 
                <Box p="2" py="8" w="90%" maxW="390">
                    <Heading size="xl" color="coolGray.800" fontWeight="semibold">Velkommen</Heading>
                    <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">Login for at få adgang!</Heading>
                    <VStack space="2" mt="5">
                        <FormInput 
                        setValue={setEmail}
                        isPassword={false}
                        placeHolder={'Indtast din email'}
                        errorText='Denne Email er ikke registeret'
                        isWrong={false}
                        iconShow={true}
                        icon={{ as: Ionicons, name: 'person'}} 
                        text={"Email*"}/>

                        <FormInput 
                        setValue={setPassword}
                        isPassword={true}
                        placeHolder={'Indtast din Adgangskode'}
                        errorText='Denne Email er ikke registeret'
                        isWrong={wrongPass}
                        text={"Agangskode*"}/>

                        <Link onPress={() => console.log('glemt adg')} _text={{
                                fontSize: "xs",
                                fontWeight: "500",
                                color: "theme.100"
                            }} alignSelf="flex-end" mt="1">
                            Glemt Adgagnskode?</Link>
            
                        <Button isLoading={loading} isLoadingText="Logger in" mt="2" colorScheme={"darkBlue"} bg="theme.100" onPress={handleLogin}>
                            Log ind
                        </Button>
                        <HStack mt="6">
                            <Text fontSize="sm" color="coolGray.600">Jeg er en ny bruger.{" "}</Text>
                            <Link _text={{
                                color: "theme.100",
                                fontWeight: "medium",
                                fontSize: "sm"
                            }} onPress={goToSignup}>
                                Opret Konto
                                </Link>
                        </HStack>
                        
                    </VStack>
                </Box>
            </Center>
    )
    
}

export default Login;

