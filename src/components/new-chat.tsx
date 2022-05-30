import React, { useEffect, useState } from 'react'
import FormInput from './form-input'
import { Modal, HStack, Text, Pressable, Box, ScrollView, Button, Icon } from 'native-base'
import { Entypo } from '@expo/vector-icons'


interface Member {
  id: string,
  email: string
}

interface Props {
  isOpen: boolean,
  handleClose: () => void,
  handleCreateNewChat: () => void,
  members: [],

}

const NewChat = ({isOpen, handleClose, members, handleCreateNewChat}: Props) => {
  const [ list, setList ] = useState(members as Member[]);
  const [toList, setToList] = useState([]);


    useEffect(() => {
        if(toList.length > 0){
            setList(mainL => {
              
                const newList =  mainL.filter(i => !toList.includes(i))
                return newList;
            })
        }else setList(members);
    }, [toList])

    const handleAddToMember = (item: Member) => {
      setToList(prevList => {
          if(!prevList.includes(item)){return [...prevList, item]}
          return prevList;
      })
    }
    
    const handleRemoveToMember = (item: Member ) => {
      setToList(prevList => {
          return prevList.filter(i => i !== item);
      })
    }

    const handleFindMember = (email: string) => {
      setList(members)
      if(email.length > 0){
          setList((prevList) => {
              return prevList.filter(i =>  String(i.email).toLowerCase().startsWith(email.toLowerCase()));
          })
      }
    }



  return (
    <Modal isOpen={isOpen}  onClose={handleClose} w={'100%'} h={'100%'}>
    <Modal.Content width="350px" h={'100%'}>
      <Modal.CloseButton />
      <Modal.Header>Ny Chat
      <FormInput 
                    setValue={(value) => handleFindMember(value)}
                    isPassword={false}
                    placeHolder={'Til:      Indtast en e-mail'}
                    errorText=''
                    isWrong={false}
                    text={''}/>
                {toList && (
                    <HStack mt={3} >
                        { toList.map(item => (
                            <HStack space={1} key={item.id} borderWidth={1} py={1} px={2} rounded='2xl' borderColor='muted.400' bg={'success.300'} alignItems='center'>
                                 <Text>{item.email}</Text>
                                 <Pressable mt={1} onPress={() => handleRemoveToMember(item)}>
                                    <Icon as={Entypo} name='cross' size={4} color='red.500'/>
                                 </Pressable>
                            </HStack>
                        ))}
                    </HStack>
                )}
      </Modal.Header>
      <Modal.Body pt={0} mt={0}>

   
    <ScrollView>
        {list.map((item: any) => (
            <Pressable  key={item.id} onPress={() => handleAddToMember(item)}>
                <Box borderBottomWidth={1} py={5} px={5} borderColor={'primary.50'}>
                    <Text>{item.email}</Text>
                </Box>
            </Pressable>
        ))}
    </ScrollView>
     
            
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button isLoading={false} isLoadingText="Sender nulstillings mail"  colorScheme={"darkBlue"} bg="theme.100" onPress={handleCreateNewChat}>
                  Opret Chat
            </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>       
</Modal>
  )
}

export default NewChat