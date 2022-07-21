import { FC, useCallback, useEffect, useState } from 'react'
import { Alert, Grid, Snackbar } from '@mui/material'
import { isNotNilOrEmpty } from 'ramda-adjunct'
import axios from 'axios'

import ConversationView from '../components/conversationView'
import ConversationsList from '../components/conversationsList'
import NewConversation from '../components/newConversation'
import NewMessageTextBox from '../components/newMessageTextBox'
import { loggedUserId } from './_app'
import Head from 'next/head'

const Home: FC = () => {
  const [conversations, setConversations] = useState([])
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("");
  const [openNewConversationDialog, setOpenNewConversationDialog] = useState(false);
  const [openSnackbarError, setOpenSnackbarError] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(0)

  const handleCreateNewConversation = () => {
    setOpenNewConversationDialog(true);
    setSelectedConversation(null);
  }

  const getMessages = useCallback(() => {
    axios.get(`http://localhost:3005/messages/${selectedConversation+1}`).then(function ({data}) {
      setMessages(data)    
    })
    .catch(function () {
      setOpenSnackbarError(true)   
    });
  }, [selectedConversation])

      
  const getConversations = useCallback(() => {
    axios.get(`http://localhost:3005/conversations/${loggedUserId}`).then(function ({data}) {
    if(isNotNilOrEmpty(data)) {
        setConversations(data);
        getMessages()
      }  
    })
    .catch(function () {
      setOpenSnackbarError(true)   
    });
  }, [getMessages])

  const submitMessage = (messageToSend) => {
    axios.post(`http://localhost:3005/messages/${selectedConversation+1}`, {authorId: loggedUserId, conversationId: selectedConversation+1, body: messageToSend,timeStamp: new Date().getTime()}).then(function () {
      setNewMessage('')
      getMessages()   
    }).catch(function () {
      setOpenSnackbarError(true)   
    })
  }

  useEffect(() => {
    getConversations()
  }, [getConversations])


  return (
    <Grid container>
      <Head>
        <title>Frontend Technical test - Leboncoin</title>
        <meta name="description" content="Frontend exercise for developpers who want to join us on leboncoin.fr"></meta>
      </Head>
      <Grid item md={4} xs={12}>
        <ConversationsList handleCreateNewConversation={handleCreateNewConversation} conversations={conversations} getMessages={getMessages} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation}/>
      </Grid>
      <Grid item md={8} xs={12}>

        {
          openNewConversationDialog 
            ? <NewConversation getConversations={getConversations} setOpenSnackbarError={setOpenSnackbarError} submitMessage={submitMessage} openNewConversationDialog={openNewConversationDialog} setSelectedConversation={setSelectedConversation}  setOpenNewConversationDialog={setOpenNewConversationDialog} />
            : <ConversationView messages={messages}/>
        }
        <NewMessageTextBox newMessage={newMessage} setNewMessage={setNewMessage} submitMessage={submitMessage} />
      </Grid>
      <Snackbar open={openSnackbarError} autoHideDuration={3000} onClose={() => setOpenSnackbarError(false)}>
        <Alert onClose={() => setOpenSnackbarError(false)} severity="error" sx={{ width: '100%' }}>
          Une erreur est survenue. Veuillez réessayer dans quelques instants
        </Alert>
      </Snackbar>
    </Grid>
  )
}

export default Home