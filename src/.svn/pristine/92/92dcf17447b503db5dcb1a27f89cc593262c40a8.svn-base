import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import { Page, StyledButton } from 'components';
import {
  Header
} from './components';
import {
  AssetTypesForm,
  AssetAttributes
} from '../addUpdateComponents';
import {
  addAssetTypes,
  redirectToAssetTypesList,
  updateAssetTypes,
  assetTypesFailure,
  officesListFetch
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
import { isEmpty, map, forEach } from 'lodash';
import useRouter from 'utils/useRouter';

const schema = {
  name: {
    presence: { allowEmpty: false, message: '^Asset Type name is required' },
  },
  binder_with: {
    length: {
      minimum: 1,
      tooShort: "Please select atleast one binding",
    }
  },
  approval_profile_type: {
    presence: { allowEmpty: false, message: '^Approval Profile Type is required' },
  },
  /*approval_profile_id_all: {
    presence: { allowEmpty: false, message: '^Please select approval profile' },
  }*/
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

function getSteps() {
  return ['Create Asset Type', 'Add Attributes'];
}

const AssetTypeAdd = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const router = useRouter();

  const assetTypesState = useSelector(state => state.assetTypesState);
  const session = useSelector(state => state.session);
  const [files, setFiles] = useState([]);
  const [approvalProfilesValue, setApprovalProfilesValue] = useState({
    'all': null,
  });

  const [schema, setSchema] = useState({
    name: {
      presence: { allowEmpty: false, message: '^Asset Type name is required' },
    },
    binder_with: {
      length: {
        minimum: 1,
        tooShort: "Please select atleast one binding",
      }
    },
    approval_profile_type: {
      presence: { allowEmpty: false, message: '^Approval Profile Type is required' },
    },
    /*approval_profile_id_all: {
      presence: { allowEmpty: false, message: '^Please select approval profile' },
    }*/
  });

  useEffect(() => {
    dispatch(officesListFetch(session.current_page_permissions.object_id));
  }, []);

  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'is_binded_with_employee': 0,
      'is_binded_with_workstation': 0,
      'is_binded_with_office': 1,
      'binder_with': ['is_binded_with_office'],
      'approval_profile_type': 'global'
    },
    touched: {
      'is_binded_with_employee': true,
      'is_binded_with_workstation': true,
      'is_binded_with_office': true,
      'approval_profile_type': true
    },
    errors: {}
  }); 

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  useEffect(() => {
    if (!isEmpty(assetTypesState.validation_error)) {
      const errors = assetTypesState.validation_error;
      setFormState(formState => ({
        ...formState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [assetTypesState.validation_error]);

  useEffect(() => {
    if (assetTypesState.redirect_to_list) {
      router.history.push('/asset-types');
    }
  }, [assetTypesState.redirect_to_list, router.history]);

  const handleSubmit = () => { 
    //event.preventDefault();

    //apending media
    let data = new FormData();
    if (!isEmpty(files[0])) {
      data.append('assets_type_image', files[0]);
    }

    //appending form state to data object
    forEach(formState.values, function (value, key) {
      data.append(key, value);
    });

    //appending approvalProfile values
    let approval_profiles = {};
    /* forEach(approvalProfilesValue, function (value, key) {
      approval_profiles[key] = {
        'office_id': key,
        'approval_profile_id': value.id
      }
    }); */
    data.append('approval_profiles', JSON.stringify(approval_profiles));
    

    if (isEmpty(assetTypesState.asset_type_id)) {
      dispatch(addAssetTypes(data));
    }
    else {
      data.append('id', assetTypesState.asset_type_id);    //appending form state to data object
      dispatch(updateAssetTypes(data));
    }
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AssetTypesForm
          setFormState={setFormState}
          formState={formState}
          schema={schema}
          setSchema={setSchema}
          files={files}
          setFiles={setFiles}
          approvalProfilesValue={approvalProfilesValue}
          setApprovalProfilesValue={setApprovalProfilesValue}
        />
          ;
      case 1:
        return <AssetAttributes />
          ;
      default:
        return 'Unknown step';
    }
  }

  const stteper_classes = stteperStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  useEffect(() => {
    if (assetTypesState.asset_type_add_update_success) {
      moveToNextStep();
      //dispatch(assetTypeAttrListFetch(assetTypesState.asset_type_id));
    }
  }, [assetTypesState.asset_type_add_update_success]);

  const isStepOptional = (step) => {
    return false;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (activeStep === 0) {
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
    else {
      moveToNextStep();
    }

  };

  const moveToNextStep = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

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
      title="Add Asset Type"
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
                  <Typography className={classes.instructions}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Button onClick={handleReset} className={stteper_classes.button}>
                    Reset
                  </Button>
                </div>
              ) : (
                  <div>
                    <Typography component="div" className={stteper_classes.instructions}>{getStepContent(activeStep)}</Typography>
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
};

export default AssetTypeAdd;
