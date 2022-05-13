import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useCreateCircleMutation } from '../Circle/CircleApi';
import SimpleBottomNavigation from '../Common/BottomNavigation/SimpleBottomNavigation';
import { useGetUserDashBoardQuery } from '../Dashboard_old/DashboardApi';
import ModaleCreateCircle from './ModaleCreateCircle';
import Card from './Card';
import CustomizedSnackbars from '../Common/Snackbar/Snackbar';
import DashbordLoader from './DashbordLoader';
import ModaleJoinCircle from './ModaleJoinCircle';

export const Dashboard = () => {
  const { token, user_id } = useSelector((state) => state.auth);
  const { name, description, color, img_url } = useSelector(
    (state) => state.dashboard
  );
  const userPicture =
    'https://ca.slack-edge.com/T02MBC4J9K5-U02M8CJUVJR-2df2ffa3c507-512';
  const {
    refetch,
    data: DashData,
    isLoading: dashboardIsLoading,
    isError: loginIsError,
  } = useGetUserDashBoardQuery({
    token,
    user_id,
  });
  const [openCreate, setOpenCreate] = useState(false);
  const [openJoin, setOpenJoin] = useState(false);


  const [
    createCircle,
    {
      data: dataCreateCircle,
      isError: createCircleError,
      isSuccess: createCircleSuccess,
    },
  ] = useCreateCircleMutation();

  const toggleCreate = () => {
    setOpenCreate(!openCreate);
  };
  const toggleJoin = () => {
    setOpenJoin(!openJoin);
  };

  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    createCircleSuccess && setOpenSnack(true);
  }, [createCircleSuccess]);
  
  if (dashboardIsLoading) {
    return <DashbordLoader />;
  } else {
    return (
      <>
        <Box className=' relative flex flex-col items-center p-5 h-full custom-bk:pr-[10vh] pt-20 custom-bk:pt-40 overflow-hidden'>
        <img
          className=' absolute left-1/2 transform -translate-x-1/2 w-24 h-24 custom-bk:w-52 custom-bk:h-52 rounded-full z-10 top-5 custom-bk:top-14 custom-bk:left-1/4'
          src={userPicture}
          alt=''
        />
        <Box className='card__container bg-darkysubg mb-3 h-full w-full rounded-lg custom-bk:ml-[15vh] p-5 custom-bk:p-10 flex flex-wrap items-start gap-10 justify-center overflow-scroll shadow-2xl darkMode:shadow-none'>
          <Typography
            className='text-xl custom-bk:text-3xl font-bold block w-full mt-5 '
            component='h5'
          >
            Vos Cercles :
          </Typography>

          {DashData?.map((card) => {
            return(
              <Card
                key={card.circle_id}
                name={card.name}
                desc={card.description}
                circle_id={card.circle_id}
                img_url={card.img_url}
                nb_number={card.users_count}
                nb_online={card.nb_online}
                nb_events={card.futur_events}
                admin_picture={card.admin[0].img_url}
                admin_surname={card.admin[0].surname}
                usersList={card.users}
                eventsList={card.events}
            />)
           })}
        </Box>
          <SimpleBottomNavigation handleClickOpenCreate={toggleCreate} handleClickOpenJoin={toggleJoin} />
        </Box>
        <ModaleCreateCircle
          refetch={refetch}
          createCircle={createCircle}
          createCircleSuccess={createCircleSuccess}
          open={openCreate}
          toggleCreate={toggleCreate}
          createCircleError={createCircleError}
        />
        <ModaleJoinCircle open={openJoin} handleClose={toggleJoin} />
        <CustomizedSnackbars
          dataCreateCircle={dataCreateCircle}
          openSnack={openSnack}
          setOpenSnack={setOpenSnack}
          severity='success'
          isSuccess={createCircleSuccess}
          message={''}
        />
      </>
    );
  }
}