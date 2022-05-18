import * as React from 'react';
import { useMemo } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
//CALENDRIER
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay';
import {fr} from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
// import CustomToolbar from './CustomToolBar';
// FIN CALENDRIER


const locales = {
    'fr': fr,
  }
  
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  })

  const events = [
    {
      title: 'Strip Tease Aleks',
      start: new Date(2022, 4, 7),
      end: new Date(2022, 4, 7),
    },
    {
      title: 'Anniversaire Tati Daniele',
      start: new Date(2022, 4, 20),
      end: new Date(2022, 4, 22),
    },
    {
      title: 'Anniversaire Tonton Gudule',
      start: new Date(2022, 4, 20),
      end: new Date(2022, 4, 21),
    },
  ];

export const CirclePage = () => {

  const MyEventWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'red',
    },
  });
  // Event Wrapper = comme son nom l'indique, 
  // concerne le contenant de l'event rajouté

  const MyEventContainerWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'coral',
      color:'green'
    },
  }); 
  // pour la vue week/day, 
  // inutile pour la vue mensuelle

  const MyDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      color:'red'
    },
  });
    // Date Cell Wrapper = case du calendrier en vue mensuelle

  const MyTimeSlotWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'red',
      color:'green'
    },
  }); 
  //Touche les cases horaires de la vue week/day

  const MyTimeGutterWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyResourceHeader = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  //Inconnu au bataillon

  const MyToolbar = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    toolbar:false,
  }); 
  // Fait planter la vue ?

  const MyAgendaEvent = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyAgendaTime = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyAgendaDate = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyDayHeader = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyDayEvent = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Inconnu au bataillon ?

  const MyWeekHeader = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyWeekEvent = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyMonthHeader = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'yellow',
      color:'green'
    },
  }); 
  // Fait planter la vue ?

  const MyMonthDateHeader = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      color:'green'
    },
  });
  // Fait planter la vue ?

  const MyMonthEvent = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
      color:'green'
    },
  });
  // Fait planter la vue ?

  const { components } = useMemo(
    () => ({
      components: {
        // event: MyEvent, // Fait planter la vue ?
        eventWrapper: MyEventWrapper,
        eventContainerWrapper: MyEventContainerWrapper,
        dateCellWrapper: MyDateCellWrapper,
        timeSlotWrapper: MyTimeSlotWrapper,
        // timeGutterHeader: MyTimeGutterWrapper, // Fait planter la vue ?
        resourceHeader: MyResourceHeader, //Inconnu au bataillon ?
        // toolbar: CustomToolbar, // Fait planter la vue ?
        // agenda: {
        //   event: MyAgendaEvent, // Fait planter la vue ?
        //   time: MyAgendaTime,// Fait planter la vue ?
          // date: MyAgendaDate, // Fait planter la vue ?
        // },
        day: {
          // header: MyDayHeader, // Fait planter la vue ?
          event: MyDayEvent, // Inconnu au bataillon ?
        },
        week: {
        //   header: MyWeekHeader, // Fait planter la vue ?
        //   event: MyWeekEvent, // Fait planter la vue ?
        },
        month: {
        //   header: MyMonthHeader, // Fait planter la vue ?
        //   dateHeader: MyMonthDateHeader, // Fait planter la vue ?
        //   event: MyMonthEvent, // Fait planter la vue ?
        }
      },
    }),
    []
  );

    return(
        <div className='container-circle'>
            <Box className='container-circle__box'
                sx={{
                display: 'flex',
                flexWrap: 'wrap',
                '& > :not(style)': {
                width: '100%',
                height: '8rem',
                },
                color:'rgba(255,255,255,0.5)',
                backgroundImage: 
                "url('https://cdn.pixabay.com/photo/2022/05/08/20/21/flowers-7182930_960_720.jpg')",
                backgroundSize:'100%',
                backgroundRepeat:'no-repeat',
                margin:'1rem',
                borderRadius:'15px',
            }}>
              <div className='container-avatar'>
                  <Avatar 
                  alt="Remy Sharp" 
                  src="https://cdn.pixabay.com/photo/2022/05/08/20/21/flowers-7182930_960_720.jpg"
                  sx={{width: '7rem', height: '7rem', 
                  position:'relative',
                  top:'calc((7rem + 2rem)/2)',
                  margin:'auto',
                  border:'1px solid white'}}
                  />

                  <Typography variant="body2" color="text.secondary" 
                  sx={{transform:'translateY(calc((7rem + 2rem)/2))', 
                  fontWeight:'bold', fontSize:'1.2rem'}}>
                    Le gras c'est la vie
                  </Typography>
              </div>
            </Box>
            <Box style={{marginTop:'5rem'}}>
              <Box sx={{ '& > :not(style)': { m: 1 } }}>
                <Fab aria-label="add" variant='extended'>
                  <AddIcon />
                  Ajouter un évènement
                </Fab>
              </Box>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height:'30rem', width: '90%', margin:'auto'}}
                culture={'fr'}
                components={components}
                 views={['month']}
                 // A retirer si on veut avoir la vue agenda
                //"Vue agenda" peut poser problème en mobile
                // /!\ view = affiche le mois, la semaine ou le jour en défaut
                // /!\ views={['month]} render uniquement le mois
              />
            </Box>
        </div>
    )
}