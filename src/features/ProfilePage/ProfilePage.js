import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Input } from '../Common/Input/Input';
import logo from './../../logo.svg';
import './style.scss';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  useGetProfilUserQuery,
  useUpdateProfilUserMutation,
  useDeleteProfilUserMutation,
} from './ProfilApi';
import { Loading } from '../Loading/Loading';
import { removeStorage } from '../../utils/helperLocalStorage';
import { handleToken } from '../auth/authSlice';

//! MUI
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';

//!------------
//! Ajouter le oldpassword pour modifier des données et/ou supprimer
function ProfilePage() {
  //! MUI
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //!--------------

  const dispatch = useDispatch();
  const inputData = useSelector((state) => state.auth);
  const { token, user_id } = inputData;
  /**
   * Query profil data when coming to the page
   */
  const { data, isLoading } = useGetProfilUserQuery({
    token,
    user_id,
  });
  const [updateProfilUser, { isLoading: isLoadingUpdate }] =
    useUpdateProfilUserMutation();
  const [deleteProfilUser] = useDeleteProfilUserMutation();

  const userPicture =
    'https://ca.slack-edge.com/T02MBC4J9K5-U02M8CJUVJR-2df2ffa3c507-512';

  if (isLoading) {
    return <Loading />;
  } else {
    return (
      <Box component="div">
        <Box component="div">
          <div className='circle-logo'>
              <img src={logo} alt='logo Circles'></img>
          </div>
          <Box className='container-page' 
          sx={{
            '@media (min-width:965px)': {
              display:'flex',
              flexDirection:'row'
            }
          }}>
            <Card 
            sx={{
              width: '50%', margin: 'auto',
              '@media (min-width:965px)': {
                width:'30%',
                padding:'2rem'
              }
              }}>
              <Box component="div">
                <img
                  src={userPicture}
                  alt='User Portrait'
                  className='leftmenu--user-picture'
                />
              </Box>
            </ Card>
          
            <Card sx={{margin:'0.8rem auto', 
            '@media (min-width:965px)': {
              overflow:'visible', width:'35%'}
            }}>
              <Typography component='h2' sx={{fontWeight: 'bold', textDecoration:'underline', fontSize:'2.5rem'}}
              >{data?.surname}</Typography>

              <Typography component='h3'  sx={{margin:'0.5rem', fontSize:'1.5rem', fontWeight: 'bold'}}> Your informations : </Typography>
              <Box component='form'
                name='register-form'
                onSubmit={(event) => {
                  event.preventDefault();
                }}
                sx={{justifyContent:'start'}}
              >
                <Input
                  helperText={'Firstname'}
                  defaultValue={data?.firstname}
                  input='firstname'
                  type={'text'}
                />
                <Input
                  defaultValue={data?.lastname}
                  input='lastname'
                  type={'text'}
                  helperText={'Lastname'}
                />
                <Input
                  defaultValue={data?.surname}
                  input='surname'
                  type={'text'}
                  helperText={'Surname'}
                />
                <Input
                  defaultValue={data?.email}
                  input='email'
                  type={'email'}
                  helperText={'Email'}

                  // error={loginIsError}
                />
                <Input
                  name='Ancien mot de passe'
                  input='oldPassword'
                  type={'password'}
                />
                <Input
                  className={'mb-5 max-w-screen-sm'}
                  name='Nouveau mot de passe'
                  input='password'
                  type={'password'}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label='Birth date'
                    name='birthdate'
                    value={data?.birthdate}
                    format='yyyy-mm-dd'
                    onChange={(event) => {
                      // Reformatage de la date pour l'envoie vers la BDD
                      // const [date] = event.toISOString().split('T');
                      //   dispatch(
                      //     handleChange({
                      //       name: 'birthdate',
                      //       payload: date,
                      //     })
                      //   );
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
              
              </LocalizationProvider>
              <Box component="div" sx={{margin:'0.8rem'}}>
                <Button sx={{
                  ':hover':{
                    color:'white',
                    backgroundColor:'#f57803'
                  }
                }}
                  variant='contained'
                  onClick={async (e) => {
                    e.preventDefault();
                    const newObj = await { ...inputData };
                    for (const key in newObj) {
                      if (newObj[key] === '') {
                        delete newObj[key];
                      }
                    }
                    await updateProfilUser(newObj);
                  }}
                >
                  Modifier
                </Button>
                <Button
                  sx={{
                    ':hover':{
                      color:'white',
                      backgroundColor:'#f50303'
                    }
                  }}
                  variant='contained'
                  onClick={handleClickOpen}
                >
                  Supprimer
                </Button>
              </Box>
              </Box>
            </Card >
          </Box>
          {/* MUI */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'Supprimer votre compte ?'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Si vous acceptez, l'entièreté de vos données seront effacées.
                Continuer?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button color='secondary' onClick={handleClose}>
                Retour
              </Button>
              <Button
                color='error'
                onClick={async (e) => {
                  e.preventDefault();
                  //! TO refactor
                  const newObj = { ...inputData };
                  for (const key in newObj) {
                    if (newObj[key] === '') {
                      delete newObj[key];
                    }
                  }
                  await deleteProfilUser(newObj);
                  dispatch(
                    handleToken({
                      token: '',
                      user_id: '',
                    })
                  );
                  removeStorage('token');
                  removeStorage('user_id');
                }}
                autoFocus
              >
                Supprimer
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Box>
    );
  }
}
export default ProfilePage;
