import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header,
  AssetTypeDisplay,
  AssetAttributeView
} from './components';
import {
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Button
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';

const useStyles = makeStyles(theme => ({
  root: {
    width: theme.breakpoints.values.lg,
    maxWidth: '100%',
    margin: '0 auto',
    padding: theme.spacing(3, 3, 6, 3)
  },
  projectDetails: {
    marginTop: theme.spacing(3)
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
  }
}));

const AssetTypeView = () => {
  const classes = useStyles();
  const router = useRouter();
  const assetTypesState = useSelector(state => state.assetTypesState);
  const dispatch = useDispatch();
  const [steps, setSteps] = React.useState(['Asset Type Details', 'Asset Attributes']);

  useEffect(() => {
    if (assetTypesState.redirect_to_list) {
      router.history.push('/asset-types');
    }
  }, [assetTypesState.redirect_to_list, router.history]);

  useEffect(() => {
    if (!assetTypesState.showUpdateForm && !assetTypesState.showViewPage) {
      router.history.push('/asset-types');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assetTypesState.showViewPage, assetTypesState.showUpdateForm]);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AssetTypeDisplay />; 
      case 1:
        return <AssetAttributeView />;
      default:
        return 'Unknown step';
    }
  }

  const stteper_classes = stteperStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Page
      className={classes.root}
      title="Asset Type View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardContent>
          <div className={stteper_classes.root}>
            <Stepper activeStep={activeStep}>
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
              {activeStep === steps.length ? (
                <div>
                  <Typography className={stteper_classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={stteper_classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                  <div>
                    <Typography className={stteper_classes.instructions}>{getStepContent(activeStep)}</Typography>
                    <div>
                      <Button disabled={activeStep === 0} onClick={handleBack} className={stteper_classes.button}>
                        Back
                      </Button>
                      {isStepOptional(activeStep) && (
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
                        disabled={(activeStep === steps.length - 1)}
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
}

export default AssetTypeView;