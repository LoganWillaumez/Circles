import {
  Avatar,
  Divider,
  Fab,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import io from 'socket.io-client';
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import UserAnswer from './UserAnswer';
import OtherAnswer from './OtherAnswer';
import BotMessage from './BotMessage';

const Chat = ({
  CircleIsSuccess,
  circleData,
  profilData,
  user_id,
  circle_id,
}) => {
  const client = useRef();
  const chat = useRef();
  const [allowMessage, setAllowMessage] = useState(false);
  const [ioData, setIoData] = useState('');
  // Champ contrôlé pour récupérer les messages
  const [messagesWrite, setMessagesWrite] = useState('');
  // Les messages sur lesquels on map, on alloue les donnée des messages en premier state
  const [messageToMap, setMessageToMap] = useState(circleData?.messages);

  // Get messages from de BDD
  useEffect(() => {
    if (circleData && !allowMessage) {
      const messages = circleData.messages;
      setMessageToMap(messages);
      setAllowMessage(true);
    }
  }, [circle_id, circleData]);
  /**
   * Use for join the socket.io room + get all messages dynamically
   */
  useEffect(() => {
    if (circleData && allowMessage) {
      const socket = io.connect('http://localhost:5555');
      socket.emit('joinRoom', {
        surname: profilData?.surname,
        user_id,
        room: circleData?.unique_code,
      });
      socket.on('message', (data) => {
        setIoData(data);
      });
      client.current = socket;
      setAllowMessage(false);
    }
  }, [circle_id, circleData, allowMessage]);

  useEffect(() => {
    // if (messageToMap) {
    if (messageToMap) {
      setMessageToMap([...messageToMap, ioData]);
    } else {
      setMessageToMap([ioData && ioData]);
    }
    // } else {
    // setMessageToMap([ioData && ioData]);
    // }
  }, [ioData]);

  return (
    <Box
      className=' bg-darkysubg mb-3  w-full rounded-lg custom-bk:ml-[15vh] p-5 custom-bk:p-10 flex column shadow-2xl darkMode:shadow-none max-w-[2000px] sm:h-[60vh] lg:h-[83vh]'
      sx={{
        height: { xs: '70vh', lg: '83vh' },
      }}
    >
      <Grid container className='w-full  flex row'>
        <Grid
          item
          xs={0}
          sm={3}
          md={2}
          className='border-r w-full flex column hidden small:block'
        >
          <List>
            <ListItem button key='RemySharp'>
              <ListItemIcon>
                <Avatar
                  alt='Remy Sharp'
                  src='https://material-ui.com/static/images/avatar/1.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Remy Sharp'>Remy Sharp</ListItemText>
              <ListItemText secondary='online' align='right'></ListItemText>
            </ListItem>
            <ListItem button key='Alice'>
              <ListItemIcon>
                <Avatar
                  alt='Alice'
                  src='https://material-ui.com/static/images/avatar/3.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Alice'>Alice</ListItemText>
            </ListItem>
            <ListItem button key='CindyBaker'>
              <ListItemIcon>
                <Avatar
                  alt='Cindy Baker'
                  src='https://material-ui.com/static/images/avatar/2.jpg'
                />
              </ListItemIcon>
              <ListItemText primary='Cindy Baker'>Cindy Baker</ListItemText>
            </ListItem>
          </List>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9}
          md={10}
          className='w-full relative right-0 h-[100%] '
        >
          <List
            className='overflow-scroll '
            sx={{
              '&::-webkit-scrollbar': { display: 'none' },
              height: { xs: '80%', lg: '90%' },
            }}
          >
            {/* Demander a Mathieu de mettre l'user_id pour filtrer les messages
             reçus et envoyés + l'img url + si le bot, on reçois une réponse du bot (id unique pour le bot? )  */}
            {messageToMap !== null &&
              messageToMap?.map((message, i) => {
                // Si on envoie
                if (message.surname === profilData.surname) {
                  {
                    /* Si c'est nous */
                  }
                  return (
                    <UserAnswer
                      key={message + i}
                      surname={message.surname}
                      time={message.time}
                      text={message.text}
                      img_url=''
                    />
                  );
                } else if (message.surname === 'Aleks') {
                  {
                    /* Pour le bot */
                    return (
                      <BotMessage
                        key={message + i}
                        text={message.text}
                        time={message.time}
                      />
                    );
                  }
                } else {
                  {
                    /*  Si autre personne */
                    return (
                      <OtherAnswer
                        key={message + i}
                        surname={message.surname}
                        time={message.time}
                        text={message.text}
                        img_url=''
                      />
                    );
                  }
                }
              })}
          </List>
          <Divider />
          <Grid container className='absolute w-full bottom-0'>
            <Grid item xs={11}>
              <TextField
                className='ml-4'
                id='outlined-basic-email'
                label='Type Something'
                fullWidth
                value={messagesWrite}
                onChange={(event) => {
                  // Champ contrôlé
                  setMessagesWrite(event.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        type='submit'
                        aria-label='search'
                        onClick={() => {
                          client.current.emit('chatMessage', messagesWrite);
                          setMessagesWrite('');
                        }}
                      >
                        <SendIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Chat;