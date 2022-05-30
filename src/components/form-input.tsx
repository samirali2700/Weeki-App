import React from 'react'
import { FormControl, Icon, WarningOutlineIcon, Input } from 'native-base'
import { Shadow } from 'react-native-shadow-2'
import { ShadowPreset } from '../utils/theme'
import { Entypo } from '@expo/vector-icons'


interface Props {
    text: string,
    isWrong?: boolean,
    errorText?: string,
    isPassword?: boolean,
    placeHolder?: string,
    iconShow?: boolean,
    icon?: {
        as: React.ReactNode,
        name: string,
    },
    value?: string,
    setValue: (value: string) => void
};

const defaultProps = {
  text: 'Input',
  isWrong: false,
  errorText: '',
  isPassword: false,
  placeHolder: 'Det her er en input component',
}
const FormInput:React.FC<Props & typeof defaultProps> = ({isWrong, text, errorText, isPassword, setValue, placeHolder, icon, iconShow, value}) => {
  const [show, setShow] = React.useState(false);
  
  return (
    <FormControl isInvalid={isWrong}>
    <FormControl.Label _text={{bold: true}}>{text}</FormControl.Label>
    <Shadow viewStyle={{alignSelf:'stretch', marginBottom: 5}} {...ShadowPreset.primary}>
        {isPassword ? (
          <Input value={value} _focus={{borderColor: "theme.100", bg: 'warmGray.100'}} 
          type={show ? 'text' : 'password'}
          InputRightElement={<Icon as={<Entypo name={show ? 'eye' : 'eye-with-line'}/>}
          mr="2" size={6} color="muted.400" onPress={() => setShow(!show)}/>}  
          placeholder={placeHolder}  h="45" onChangeText={value => setValue(value)}/>
        ) : (
          <Input value={value} InputLeftElement={iconShow? <Icon as={icon.as} name={icon.name} ml={2} /> :<></>}  _focus={{borderColor: "theme.100", bg: 'warmGray.100'}}  placeholder={placeHolder} onChangeText={setValue} /> 
        )}
        
    </Shadow>
    <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
        {errorText}
    </FormControl.ErrorMessage>
    </FormControl>
  )
}

export default FormInput