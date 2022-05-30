import React, { useEffect, useState } from "react";


import {  ToastAndroid } from "react-native";
import * as SecureStore from 'expo-secure-store';

import { useAppDispatch, useAppSelector } from "../../hooks/reduxHook";
import { resetPassword, signin } from "../../store/thunks/userThunk";

import { 
      VStack,
      Heading,
      Center,
      Box,
      Link,
      Button,
      HStack,
      Text,
      Modal,
      Input
    } from "native-base";

import { Ionicons } from '@expo/vector-icons';
import { Slide, Spinner } from "native-base";

import { PublicStackScreenProps } from "../../typings/RootParamList";
import FormInput from "../../components/form-input";



type Props =  PublicStackScreenProps<'Login'>
const Login: React.FC<Props> = ({navigation}) => {

    const { loading,error, notification } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch();

    const [ emailIsWrong, setEmailIsWrong ] = useState(false);
    const [wrongPass, setWrongPass] = useState(false);
    const [resetPass, setResetPass] = useState(false);


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        retreiveStoredData();
    }, [])

    useEffect(() => {
        setEmailIsWrong(false);
        setWrongPass(false);
        if(error === 'EMAIL_NOT_FOUND') {setEmailIsWrong(true)}
        else if (error === 'INVALID_PASSWORD') {setWrongPass(true)}
    }, [error])

    function goToSignup(){
        navigation.navigate('Signup');
    }
    async function sendResetPassword(){
        dispatch(await resetPassword(email));
        setResetPass(false)
        setTimeout(() => {dispatch({type: 'user/errorReset'})}, 3500);
    }

    async function handleLogin(){
        //conditions for email and password
        if(email.length > 0 && email.includes('@')){
            if(password.length > 0){
                dispatch(signin({email, password}));
                SecureStore.setItemAsync('email', email);
                SecureStore.setItemAsync('password', password);
            }   
            else{   
                ToastAndroid.showWithGravityAndOffset('Indtast adgangskode', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0 , 200);
            }        
        }
        else{   ToastAndroid.showWithGravityAndOffset('Ugyldig email', ToastAndroid.SHORT, ToastAndroid.BOTTOM, 0 , 200);}
    }

    async function retreiveStoredData () {
        const email = await SecureStore.getItemAsync('email');
        const password = await SecureStore.getItemAsync('password');
        if(email){
            if(password){
                setEmail(email);
                setPassword(password);
                dispatch(signin({email, password}))
            }
        }
    }
    return(
        <Center w="100%" > 
        <Slide in={notification !== undefined} placement='top'>
            <Box pt={8} pb={4} _text={{color: "white"}} bg="success.600" alignItems={'center'}>
                <Text fontSize={'md'} color='white'>{notification}</Text>
            </Box>
        </Slide>
        <Modal isOpen={resetPass}  onClose={() => setResetPass(false)} w={'100%'}>
        <Modal.Content width="350px">
          <Modal.CloseButton />
          <Modal.Header>Nulstil adganskode</Modal.Header>
          <Modal.Body>

                    <Text>Indstast din email, for at nulstille din adganskode.
                        Du vil modtage en mail med vejledning til hvordan du nulstiller din adganskode</Text>
                    <FormInput 
                        setValue={setEmail}
                        isPassword={false}
                        placeHolder={'Indtast din Email'}
                        errorText=''
                        isWrong={false}
                        text={''}/>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button isLoading={loading} isLoadingText="Sender nulstillings mail"  colorScheme={"darkBlue"} bg="theme.100" onPress={sendResetPassword}>
                            Nulstil Adgangskode
                    </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
                
                   
                </Modal>

                <Box p="2" py="8" w="90%" maxW="390">
                    <Heading size="xl" color="coolGray.800" fontWeight="semibold">Velkommen</Heading>
                    <Heading mt="1" color="coolGray.600" fontWeight="medium" size="xs">Login for at få adgang!</Heading>
                    <VStack space="2" mt="5">
                        <FormInput 
                        value={email}
                        setValue={setEmail}
                        isPassword={false}
                        placeHolder={'Indtast din email'}
                        errorText='Email ikke fundet'
                        isWrong={emailIsWrong}
                        iconShow={true}
                        icon={{ as: Ionicons, name: 'person'}} 
                        text={"Email*"}/>

                        <FormInput 
                        value={password}
                        setValue={setPassword}
                        isPassword={true}
                        placeHolder={'Indtast din Adgangskode'}
                        errorText='Adganskoden er forkert'
                        isWrong={wrongPass}
                        text={"Agangskode*"}/>

                        <Link onPress={() => setResetPass(true)} _text={{
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

