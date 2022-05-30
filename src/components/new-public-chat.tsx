import React, {  useState } from 'react'
import FormInput from './form-input'
import { Modal,  Button, TextArea } from 'native-base'


interface Props {
  isOpen: boolean,
  handleClose: () => void,
  handleCreateNewChat: (title: string, message: string) => void,
}

const NewPublicChat = ({isOpen, handleClose, handleCreateNewChat}: Props) => {
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');

    const handleCreate = () => {
        handleCreateNewChat(title, message);
    }

    

  return (
    <Modal isOpen={isOpen}  onClose={handleClose} w={'100%'}>
    <Modal.Content width="350px" >
      <Modal.CloseButton />
      <Modal.Header>Ny Offentlig Chat
      <FormInput 
                    setValue={setTitle}
                    isPassword={false}
                    placeHolder={'Tilføj en titel til gruppen'}
                    errorText=''
                    value={title}
                    isWrong={false}
                    text={''}/>
                
      </Modal.Header>
      <Modal.Body pt={0} mt={0} >
              <TextArea autoCompleteType={undefined} onChangeText={setMessage} h='100px' borderWidth={0} _focus={{bg: 'transparent'}} placeholder='Skriv din første besked' />
      </Modal.Body>
      <Modal.Footer>
        <Button.Group space={2}>
          <Button isLoading={false} isLoadingText="Sender nulstillings mail"  colorScheme={"darkBlue"} bg="theme.100" onPress={handleCreate}>
                  Opret Chat
            </Button>
        </Button.Group>
      </Modal.Footer>
    </Modal.Content>       
</Modal>
  )
}

export default NewPublicChat