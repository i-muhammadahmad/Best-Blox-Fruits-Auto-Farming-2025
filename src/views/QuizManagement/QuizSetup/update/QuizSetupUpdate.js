import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  QuizSetupForm,
  QuizSlides,
  QuizBinding
} from '../addUpdateComponents';
import {
  quizLevelListFetch,
  redirectToQuizSetupList,
  updateQuizSetup,
  quizSlidesListFetch,
  quizSetupFailure,
  setQuizId
} from 'actions'
import {
  Card,
  CardHeader,
  CardContent,
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button
} from '@material-ui/core';
import { isEmpty, map } from 'lodash';
import useRouter from 'utils/useRouter';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Couse name is required' },
  },
  level_id: {
    presence: { allowEmpty: false, message: '^Please select course level' },
  },
  category_id: {
    presence: { allowEmpty: false, message: '^Please select course category' },
  },
  passing_percentage: {
    presence: { allowEmpty: false, message: 'is required' },
    numericality: {
      greaterThanOrEqualTo: 0,
      lessThanOrEqualTo: 100,
    }
  }
}

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const stteperStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));


const QuizSetupUpdate = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();
  const quizSetupState = useSelector(state => state.quizSetupState);
  const session = useSelector(state => state.session);
  const [steps, setSteps] = React.useState(['Update Course', 'Add Slides']);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
    },
    touched: {
      'object_viewed_id': true,
    },
    errors: {}
  });
   
  useEffect(() => {
    handleReset();
    setUpdateActiveStep(0);
  }, []);

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(quizSetupState.validation_error)) {
      const errors = quizSetupState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [quizSetupState.validation_error]);

  useEffect(() => {
    if(!isEmpty(quizSetupState.quizSetupRecord)){
      let record = quizSetupState.quizSetupRecord
      setFormState(formState => ({
        ...formState,
        values: {
          ...formState.values,
          'description': record.description,
          'level_id': record.level_id,
          'category_id': record.category_id,
          'name': record.name,
          'id': record.id,
          'certificate_emails': record.certificate_emails,
          'passing_percentage': record.passing_percentage,
        },
        touched: {
          ...formState.touched,
          'description': true,
          'level_id': true,
          'category_id': true,
          'name': true,
          'id': true,
          'certificate_emails': true,
          'passing_percentage': true,
        }
      }));
      dispatch(setQuizId(record.id));

      if(record.is_published === 'y'){
        setSteps(['Assign Course']);
      } 
    }
    else{
      router.history.push('/quiz-setup');
    }
  }, [quizSetupState.quizSetupRecord]);

  useEffect(() => {
    if (quizSetupState.redirect_to_list) {
      router.history.push('/quiz-setup');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSetupState.redirect_to_list]);

  useEffect(() => {
    dispatch(quizLevelListFetch(session.current_page_permissions.object_id))
  }, []);

  const handleSubmit = () => {
    dispatch(updateQuizSetup(formState.values));
  }

  const getStepContent = (step) => {
    if(quizSetupState.quizSetupRecord.is_published === 'n'){
      switch (step) {
        case 0:
          return <QuizSetupForm
            setFormState={setFormState}
            formState={formState}
          />
            ;
        case 1:
          return <QuizSlides />
            ;
        default:
          return 'Unknown step';
      }
    }
    else{
      switch (step) {
        case 0:
          return <QuizBinding />;
        default:
          return 'Unknown step';
      }
    }  
  }

  const stteper_classes = stteperStyles();
  const [updateActiveStep, setUpdateActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  
  //const steps = getSteps();

  useEffect(() => {
    if (quizSetupState.quiz_add_update_success) {
      moveToNextStep();
      dispatch(quizSlidesListFetch(quizSetupState.quiz_id, session.current_page_permissions.object_id));
    }
  }, [quizSetupState.quiz_add_update_success]);

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (updateActiveStep === 0) {
      if (formState.isValid) {
        handleSubmit();
        //moveToNextStep();
      }
      else {
        const errors = validate(formState.values, schema);
        setFormState(formState => ({
          ...formState,
          isValid: errors ? false : true,
          errors: errors || {}
        }));
        map(errors, (val, indx) => {
          setFormState(formState => ({
            ...formState,
            touched: {
              ...formState.touched,
              [indx]: true
            }
          }));
        });

      }
    }
    else if (updateActiveStep === 1 && isEmpty(quizSetupState.quizSlidesList)) {
      //alert('Please Add Slides Frist');
      dispatch(quizSetupFailure('Please Add Slides Frist'));
    }
    else {
      moveToNextStep();
    }

  };

  const moveToNextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(updateActiveStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(updateActiveStep);
    }

    setUpdateActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  const handleBack = () => {
    setUpdateActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(updateActiveStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setUpdateActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(updateActiveStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setUpdateActiveStep(0);
  };

  return (
    <Page
      className={classes.root}
      title="Update Course Setup"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardContent>
          <div className={stteper_classes.root}>
            <Stepper updateActiveStep={updateActiveStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                if (isStepOptional(index)) {
                  labelProps.optional = <Typography variant="caption">Optional</Typography>;
                }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div>
              {updateActiveStep === steps.length ? (
                <div>
                  <Typography className={stteper_classes.instructions}>
                    Course is published successfully.
                  </Typography>
                  <Button onClick={handleReset} className={stteper_classes.button}>
                    Assign Course
                  </Button>
                </div>
              ) : (
                  <div>
                    <Typography component="div" className={stteper_classes.instructions}>{getStepContent(updateActiveStep)}</Typography>
                    <div>
                      <Button disabled={updateActiveStep === 0} onClick={handleBack} className={stteper_classes.button}>
                        Back
                      </Button>
                      {isStepOptional(updateActiveStep) && (
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={handleSkip}
                          className={stteper_classes.button}
                        >
                          Skip
                      </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={stteper_classes.button}
                        disabled={(updateActiveStep === steps.length - 1)}
                      > 
                        Next
                      </Button>
                      
                    </div>
                  </div>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

    </Page>
  );
};

export default QuizSetupUpdate;
