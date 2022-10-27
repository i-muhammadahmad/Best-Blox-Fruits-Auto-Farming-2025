import React, { useEffect } from 'react';
import { API_URL } from 'configs'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import {
  Paper,
  Grid,
  Typography,
  MobileStepper,
  Card,
  CardHeader,
  CardContent,
  List,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Avatar,
  Slide,
  AppBar,
  Toolbar
} from '@material-ui/core';
import { StyledButton } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import AudioPlayer from 'material-ui-audio-player';
import Nestable from 'react-nestable';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { isEmpty, findKey } from 'lodash';
import { quizSlidesListFetch } from 'actions';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
}));

const QuizSlidesView = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [quizSlides, SetQuizSlides] = React.useState([]);
  const [activeSlideId, setActiveSlideId] = React.useState('');
  const [activeSlide, setActiveSlide] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [maxSteps, setMaxSteps] = React.useState(0);
  const [showSlideMenu, setShowSlideMenu] = React.useState(true);
  const quizSetupState = useSelector(state => state.quizSetupState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    if (!isEmpty(quizSetupState.quizSetupRecord)) {
      dispatch(quizSlidesListFetch(quizSetupState.quizSetupRecord.id, session.current_page_permissions.object_id));
    }
  }, [quizSetupState.quizRecord]);

  useEffect(() => {
    if (!isEmpty(quizSetupState.quizSlidesList)) {
      SetQuizSlides(quizSetupState.quizSlidesList);
      setMaxSteps(Object.values(quizSetupState.quizSlidesList).length);
      //setActiveStep(0);
      setActiveSlideId(quizSetupState.quizSlidesList[activeStep].id);
      setActiveSlide(quizSetupState.quizSlidesList[activeStep]);
    }
  }, [quizSetupState.quizSlidesList])

  useEffect(() => {
    if (!isEmpty(quizSetupState.quizSlidesList)) {
      setActiveSlideId(quizSetupState.quizSlidesList[activeStep].id);
      setActiveSlide(quizSetupState.quizSlidesList[activeStep]);
    }
  }, [activeStep]);

  const showHideSlidesMenu = () => {
    setShowSlideMenu((prev) => !prev);
  }

  const handleNext = () => {
    setActiveSlide([]);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveSlide([]);
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <div className={classes.root}>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Course Slide" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={(showSlideMenu) ? '4' : '1'}>
              {quizSetupState.quizNestedSlidesList ?
                <SlidesList
                  className={classes.results}
                  nestedSlideList={quizSetupState.quizNestedSlidesList}
                  activeSlideId={activeSlideId}
                  showSlideMenu={showSlideMenu}
                  showHideSlidesMenu={showHideSlidesMenu}
                  activeSlide={activeSlide}
                  setActiveSlide={setActiveSlide}
                  activeStep={activeStep}
                  setActiveStep={setActiveStep}
                  quizSetupState={quizSetupState}
                />
                : ''
              }

            </Grid>
            {(!isEmpty(quizSlides)) ?
              <Grid item xs={12} sm={(showSlideMenu) ? '8' : '11'}>
                <Paper elevation={3}  >
                  <Paper square elevation={0} className={classes.header}>
                    <Typography>{quizSlides[activeStep].name}</Typography>
                  </Paper>
                  <div style={{ minHeight: '200px', paddingLeft: '15px', paddingRight: '15px' }}>
                    <br />
                    <SlideContant style={{ display: 'flex' }}
                      slideData={activeSlide}
                    />
                    <br />
                    {(quizSlides[activeStep].slide_type === 'Interactive') ?
                      <>
                        <Grid container spacing={3}>
                          <SlideAnswer
                            choices={quizSlides[activeStep].slide_answers}
                          />
                        </Grid>
                        <br />
                      </>
                      : ''}
                  </div>
                  <MobileStepper
                    steps={maxSteps}
                    position="static"
                    variant="text"
                    activeStep={activeStep}
                    nextButton={
                      <StyledButton
                        size="small"
                        onClick={handleNext}
                        disabled={(activeStep === (maxSteps - 1))}
                        color={(activeStep === (maxSteps - 1)) ? "bprimary" : ""}
                      >
                        Next
                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                      </StyledButton>
                    }
                    backButton={
                      <StyledButton size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                      </StyledButton>
                    }
                  />
                </Paper>
              </Grid>
              : ''
            }
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

//slide ans
const SlideAnswer = (props) => {
  const { choices, ...rest } = props;
  let answers_arr = Object.values(choices);

  return (
    <>
      {answers_arr.map((choice, index) => (
        <Grid item xs={12} sm={12} key={choice.ans_id}>
          <StyledButton
            color={"blight"}
            size="small"
            type="submit"
            variant="contained"
          >
            {choice.answer}
          </StyledButton>
        </Grid>
      ))}
    </>
  )
}

//slide content
const SlideContant = props => {
  let useStylesAudioPlayer = makeStyles((theme) => {
    return {
      root: {
        [theme.breakpoints.down('sm')]: {
          width: '100%',
        },
      },
      loopIcon: {
        color: '#3f51b5',
        '&.selected': {
          color: '#0921a9',
        },
        '&:hover': {
          color: '#7986cb',
        },
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        },
      },
      playIcon: {
        color: '#f50057',
        '&:hover': {
          color: '#ff4081',
        },
      },
      replayIcon: {
        color: '#e6e600',
      },
      pauseIcon: {
        color: '#0099ff',
      },
      volumeIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      volumeSlider: {
        color: 'black',
      },
      progressTime: {
        color: 'rgba(0, 0, 0, 0.54)',
      },
      mainSlider: {
        color: '#3f51b5',
        '& .MuiSlider-rail': {
          color: '#7986cb',
        },
        '& .MuiSlider-track': {
          color: '#3f51b5',
        },
        '& .MuiSlider-thumb': {
          color: '#303f9f',
        },
      },
    };
  });
  let useStyles = makeStyles(() => ({
    media_style: {
      height: '100%',
      overflow: 'hidden',
      display: 'block',
      width: '100%',
    },
  }));

  const { slideData, ...rest } = props;
  const classes = useStyles();
  if (slideData.content_type === 'Text') {
    return (
      <div
        {...rest}
      >

        <div className="ck-content" dangerouslySetInnerHTML={{ __html: slideData.text_content }} />
      </div>
    );
  }
  else if (slideData.content_type === 'Image') {
    return (
      <div
        {...rest}
      >
        <img
          className={classes.media_style}
          src={API_URL + slideData.media_path}
          alt={slideData.name}
        />
      </div>
    );
  }
  else if (slideData.content_type === 'Audio') {
    return (
      <div
        {...rest}
        style={{ width: '500px', paddingLeft: '19px' }}
      >
        <AudioPlayer
          className={classes.media_style}
          src={API_URL + slideData.media_path}
          useStyles={useStylesAudioPlayer}
        />
      </div>
    );
  }
  else if (slideData.content_type === 'Video') {
    return (
      <div
        {...rest}
      >
        <video className={classes.media_style} controls>
          <source src={API_URL + slideData.media_path} />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  else {
    return (
      <div
        {...rest}
      >
      </div>
    );
  }

};


//slides nested list
const SlidesList = props => {
  const { className, nestedSlideList, activeSlideId, showSlideMenu, showHideSlidesMenu, activeSlide, setActiveSlide, activeStep, setActiveStep, quizSetupState, ...rest } = props;

  let useStyles = makeStyles(theme => ({
    root: {},
    content: {
      padding: 0
    },
    inner: {
      minWidth: 700
    },
    nameCell: {
      display: 'flex',
      alignItems: 'center'
    },
    avatar: {
      height: 42,
      width: 42,
      marginRight: theme.spacing(1)
    },
    actions: {
      padding: theme.spacing(1),
      justifyContent: 'flex-end'
    },
    large: {
      width: theme.spacing(6),
      height: theme.spacing(6),
    },
    listItemTextSelected: {
      color: 'white',
    },
    listItemText: {

    }
  }));

  const classes = useStyles();
  const session = useSelector(state => state.session);
  const dispatch = useDispatch();

  const handleClick = (allSlidesList, slideId) => {
    let index = findKey(allSlidesList, {id: slideId});
    setActiveSlide([]);
    setActiveStep(parseInt(index));
  };

  const ListItemRenderer = ({ item, collapseIcon, index }) => {
    const slide = item;
    let allSlidesList = quizSetupState.quizSlidesList;
    return (
      <React.Fragment key={slide.id}>
        <List>
          <ListItem
            key={slide.id}
            style={{ backgroundColor: (slide.id === activeSlideId) ? '#3f51b5' : 'unset' , cursor:'pointer'}}
            onClick={() => {handleClick(allSlidesList, slide.id)}}
          >
            <ListItemAvatar>
              <Avatar
                alt="Avator"
                src={
                  (slide.slide_type === 'Information') ? "/images/logos/informational_logo.png" : "/images/logos/interactive_logo.png"
                }
                className={classes.large}
              />
            </ListItemAvatar>
            <ListItemText
              primary={slide.name}
              secondary={''}
              classes={{ primary: (slide.id === activeSlideId) ? classes.listItemTextSelected : classes.listItemText }}
            />
            <ListItemSecondaryAction >

            </ListItemSecondaryAction>
          </ListItem>
        </List>
        <Divider />
      </React.Fragment>
    );
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Paper elevation={3}  >
        <AppBar position="static" color="default" style={{ marginBottom: '-8px' }}>
          <Toolbar>
            <IconButton onClick={showHideSlidesMenu} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Slide direction="right" in={showSlideMenu} mountOnEnter unmountOnExit>
          <Nestable
            items={nestedSlideList}
            renderItem={ListItemRenderer}
            maxDepth={2}
            childrenProp={'child_slides'}
            confirmChange={() => false}
          />
        </Slide>
      </Paper>
    </div>
  );
};


export default QuizSlidesView;