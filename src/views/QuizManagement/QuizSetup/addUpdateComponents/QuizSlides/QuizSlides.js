import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validate from 'validate.js';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { StyledButton, DeleteAlert } from 'components';
import SlideMedia from '../SlideMedia';
import { Results, SlideAnswers, SlideContant } from './slidesComponents';
import {
  TextField,
  Grid,
  FormControl,
  FormHelperText,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from '@material-ui/core';
import {
  hideSlideValidationError,
  slideParentListFetch,
  addQuizSlide,
  quizSlidesListFetch,
  deleteQuizSlide,
  updateQuizSlide,
  showCommonLoader,
  hideCommonLoader
} from 'actions';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from 'ckeditor5-custom-build/build/ckeditor';
import SaveIcon from '@material-ui/icons/Save';
import ClearIcon from '@material-ui/icons/Clear';
import { isEmpty, forEach, find, countBy } from 'lodash';
import { CK_CONFIGS } from 'configs';

const useStyles = makeStyles((theme) => ({
  root: {},
  projectDetails: {
    marginTop: theme.spacing(3)
  },
  formGroup: {
    marginBottom: theme.spacing(3)
  }
}));

const QuizSlides = props => {
  const { ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const quizSetupState = useSelector(state => state.quizSetupState);
  const session = useSelector(state => state.session);
  const [quizSlideId, setQuizSlideId] = useState('');
  const [openDeleteModel, setOpenDeleteModel] = React.useState(false);
  const [ParentValue, setParentValue] = useState(null);
  const [files, setFiles] = useState([]);
  const [slideList, setSlideList] = useState([]);
  const [dropZoneConfig, setDropZoneConfig] = useState({
    accept: 'image/*',
    maxFiles: 1,
    maxSize: 1000000,
  });

  const [schema, setSchema] = useState({
    name: {
      presence: { allowEmpty: false, message: '^Slide Name is required' },
    },
    slide_type: {
      presence: { allowEmpty: false, message: '^Please Select Slide Type' },
    },
    content_type: {
      presence: { allowEmpty: false, message: '^Please Select Content Type' },
    },
  });

  const [slidesFormState, setslidesFormState] = useState({
    isValid: false,
    values: {
      'object_viewed_id': session.current_page_permissions.object_id,
      'slide_type': 'Information',
      'content_type': 'Text',
      'parent_id': ''
    },
    touched: {
      'object_viewed_id': true,
      'slide_type': true,
      'content_type': true,
      'parent_id': true
    },
    errors: {}
  });

  const [correctAnsCount, setCorrectAnsCount] = useState(0);
  const [ansError, setAnsError] = useState('');
  const [slidesAns, setSlidesAns] = useState({
    answers: [
      {
        'ans_id': '',
        'answer': '',
        'is_correct_answer': '0',
        'priority': '0'
      },
      {
        'ans_id': '',
        'answer': '',
        'is_correct_answer': '0',
        'priority': '0'
      }
    ],
    removed_ans: {}
  });

  useEffect(() => {
    let quizSlide_list = [];
    forEach(quizSetupState.quizNestedSlidesList, function (value, key) {
      value['created_by_user_name'] = (value.created_by_user) ? value.created_by_user.email : ''
      value['text_content_html'] = (value.text_content) ? value.text_content.replace(/(<([^>]+)>)/gi, "").substring(0, 200) : '';
      value['updated_by_user_name'] = (value.updated_by_user) ? value.updated_by_user.email : ''
      value['parent_name'] = (value.parent_slide) ? value.parent_slide.name : ''
      if (!isEmpty(value.child_slides)) {
        value['children'] = loopOverChild(value.child_slides);
      }
      quizSlide_list[key] = value
    });
    //alert("--11--");
    setSlideList(quizSlide_list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizSetupState.quizNestedSlidesList]);

  const loopOverChild = (childs) => {
    let quizSlide_child_list = [];
    forEach(childs, function (value_c, key) {
      value_c['created_by_user_name'] = (value_c.created_by_user) ? value_c.created_by_user.email : ''
      value_c['text_content_html'] = (value_c.text_content) ? value_c.text_content.replace(/(<([^>]+)>)/gi, "").substring(0, 200) : '';
      value_c['updated_by_user_name'] = (value_c.updated_by_user) ? value_c.updated_by_user.email : ''
      value_c['parent_name'] = (value_c.parentSlide) ? value_c.parent_slide.name : ''
      quizSlide_child_list[key] = value_c
    })
    return quizSlide_child_list;
  }

  useEffect(() => {
    const errors = validate(slidesFormState.values, schema);

    setslidesFormState(slidesFormState => ({
      ...slidesFormState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [slidesFormState.values]);

  useEffect(() => {
    if (!isEmpty(quizSetupState.slide_validation_error)) {
      const errors = quizSetupState.slide_validation_error;
      setslidesFormState(slidesFormState => ({
        ...slidesFormState,
        isValid: errors ? false : true,
        errors: errors || {}
      }));
    }
  }, [quizSetupState.slide_validation_error]);

  useEffect(() => {
    if (isEmpty(quizSetupState.slidesParentsList)) {
      dispatch(slideParentListFetch(quizSetupState.quiz_id))
    }
  }, []);

  useEffect(() => {
    if (quizSetupState.slide_add_update_status === true) {
      resetForm();
      dispatch(quizSlidesListFetch(quizSetupState.quiz_id, session.current_page_permissions.object_id));
    }
  }, [quizSetupState.slide_add_update_status]);

  const deleteRecord = () => {
    dispatch(deleteQuizSlide(quizSlideId, session.current_page_permissions.object_id, quizSetupState.quiz_id))
  }

  const showDeleteModal = (id) => {
    setQuizSlideId(id)
    setOpenDeleteModel(true)
  }

  const hideDeleteModel = () => {
    setQuizSlideId('')
  }

  const updateRecord = async (id) => {
    await resetForm();
    dispatch(showCommonLoader())
    let item = find(quizSetupState.quizSlidesList, ['id', id]);
    if (!isEmpty(item)) {
      setslidesFormState(slidesFormState => ({
        ...slidesFormState,
        values: {
          ...slidesFormState.values,
          'object_viewed_id': session.current_page_permissions.object_id,
          'id': item.id,
          'slide_type': item.slide_type,
          'content_type': item.content_type,
          'name': item.name,
          'parent_id': isEmpty(item.parent_id) ? '' : item.parent_id,
          'text_content': item.text_content,
          'media_path': item.media_path,
          'slide_order': item.slide_order
        },
        touched: {
          ...slidesFormState.touched,
          'object_viewed_id': true,
          'id': true,
          'slide_type': true,
          'content_type': true,
          'name': true,
          'parent_id': true,
          'text_content': true,
          'media_path': true,
          'slide_order': true
        },
      }));

      // setting slide media config
      setSlideMediaConfig(item.content_type);

      // setting parent value
      let parent_val = find(quizSetupState.slidesParentList, ['id', item.parent_id]);
      setParentValue(parent_val);

      //setting slides answers
      if (!isEmpty(item.slide_answers)) {
        setSlidesAns(prvStateValue => ({
          ...prvStateValue,
          answers: item.slide_answers,
        }));

        var obj = countBy(item.slide_answers, function (rec) {
          return rec.is_correct_answer == 1;
        });
        setCorrectAnsCount(obj.true);

      }
    }
    dispatch(hideCommonLoader());

  }

  const setParentId = parent_id => {
    setslidesFormState(slidesFormState => ({
      ...slidesFormState,
      values: {
        ...slidesFormState.values,
        'parent_id': parent_id
      },
      touched: {
        ...slidesFormState.touched,
        'parent_id': true
      }
    }));
    dispatch(hideSlideValidationError('parent_id'))
  }

  const handleChange = event => {
    event.persist();
    setslidesFormState(slidesFormState => ({
      ...slidesFormState,
      values: {
        ...slidesFormState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...slidesFormState.touched,
        [event.target.name]: true
      }
    }));
    dispatch(hideSlideValidationError(event.target.name))
  }

  const handleContentTypeChange = event => {
    setFiles([]);
    setslidesFormState(slidesFormState => ({
      ...slidesFormState,
      values: {
        ...slidesFormState.values,
        'text_content': '',
      },
      touched: {
        ...slidesFormState.touched,
        'text_content': true,
      },
    }));

    //setting slide media config
    setSlideMediaConfig(event.target.value);

    handleChange(event);
  }

  const setSlideMediaConfig = (media_type = 'Image') => {
    //setting file types
    if (media_type === 'Image') {
      setDropZoneConfig({
        accept: 'image/*',
        maxFiles: 1,
        maxSize: 1000000
      });
    }
    else if (media_type === 'Audio') {
      setDropZoneConfig({
        accept: 'audio/*',
        maxFiles: 1,
        maxSize: 5000000
      });
    }
    else if (media_type === 'Video') {
      setDropZoneConfig({
        accept: 'video/*',
        maxFiles: 1,
        maxSize: 20000000
      });
    }
  }


  const handleSlideTypeChange = event => {
    resetValidationSchema()
    handleChange(event);
  }

  const handleSubmit = () => {

    //event.preventDefault();
    if (slidesFormState.values.slide_type === 'Interactive' && (slidesAns.answers.length > 6 || slidesAns.answers.length < 2)) {
      setAnsError('Min 2 and Max 6 answer allowed');
    }
    else if (slidesFormState.values.slide_type === 'Interactive' && (correctAnsCount < 1)) {
      setAnsError('Please select atleast one correct answer');
    }
    else {
      setAnsError('');
      if (!isEmpty(quizSetupState.quiz_id)) {
        //sspending media
        let data = new FormData();
        if (!isEmpty(files[0])) {
          data.append('media_path', files[0]);
        }

        data.append('quiz_id', quizSetupState.quiz_id);
        //appending form state to data object
        forEach(slidesFormState.values, function (value, key) {
          data.append(key, value);
        });

        //appeding slide answers
        var json_ans = JSON.stringify(slidesAns);
        data.append('slidesAns', json_ans);

        if (isEmpty(slidesFormState.values.id)) {
          dispatch(addQuizSlide(data));
        }
        else {
          dispatch(updateQuizSlide(data));
        }
      }
      else {
        alert('Please Select Course');
      }
    }
  }

  const resetForm = () => {
    dispatch(slideParentListFetch(quizSetupState.quiz_id))
    setslidesFormState(slidesFormState => ({
      isValid: false,
      values: {
        'object_viewed_id': session.current_page_permissions.object_id,
        'slide_type': 'Information',
        'content_type': 'Text',
      },
      touched: {
        'object_viewed_id': true,
        'slide_type': true,
        'content_type': true,
      },
      errors: {}
    }));

    setParentValue(null);
    setFiles([]);
    resetInteractiveSlideForm();
    resetValidationSchema();
  }

  const resetInteractiveSlideForm = () => {
    setCorrectAnsCount(0);
    setAnsError('');
    setSlidesAns({
      answers: [
        {
          'ans_id': '',
          'answer': '',
          'is_correct_answer': '0',
          'priority': '0'
        },
        {
          'ans_id': '',
          'answer': '',
          'is_correct_answer': '0',
          'priority': '0'
        },
      ],
      removed_ans: {}
    });
  }

  const resetValidationSchema = () => {
    setSchema({
      name: {
        presence: { allowEmpty: false, message: '^Slide Name is required' },
      },
      slide_type: {
        presence: { allowEmpty: false, message: '^Please Select Slide Type' },
      },
      content_type: {
        presence: { allowEmpty: false, message: '^Please Select Content Type' },
      },
    });
  }

  const setTextContent = text_content => {
    setslidesFormState(slidesFormState => ({
      ...slidesFormState,
      values: {
        ...slidesFormState.values,
        'text_content': text_content
      },
      touched: {
        ...slidesFormState.touched,
        'text_content': true
      }
    }));
    dispatch(hideSlideValidationError('text_content'))
  }

  const hasError = field =>
    slidesFormState.touched[field] && slidesFormState.errors[field] ? true : false;

  return (
    <div>
      <div className={classes.formGroup}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl component="fieldset" error={hasError('slide_type')}>
                  <FormLabel component="legend">Slide Type</FormLabel>
                  <FormHelperText component="div" id="slide-error-text">{hasError('slide_type') ? slidesFormState.errors.slide_type[0] : null}</FormHelperText>
                  <RadioGroup row aria-label="slide_type" name="slide_type" value={slidesFormState.values.slide_type} onChange={handleSlideTypeChange}>
                    <FormControlLabel
                      value="Information"
                      control={<Radio color="primary" />}
                      label="Information"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Interactive"
                      control={<Radio color="primary" />}
                      label="Interactive"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <TextField
                  error={hasError('name')}
                  helperText={hasError('name') ? slidesFormState.errors.name[0] : null}
                  fullWidth
                  label="Slide Name"
                  name="name"
                  onChange={handleChange}
                  value={slidesFormState.values.name || ''}
                  variant="outlined"
                  size="small"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                {(quizSetupState.slidesParentList) ?
                  <Autocomplete
                    id="parent_id"
                    value={ParentValue}
                    onChange={(event, newValue) => {
                      if (newValue) {
                        setParentValue(newValue)
                        setParentId(newValue.id)
                      }
                      else {
                        setParentValue(newValue)
                        setParentId('')
                      }
                    }}
                    options={quizSetupState.slidesParentList}
                    getOptionLabel={(option) => option.name}
                    size="small"
                    renderInput={(params) => <TextField {...params} size="small" label="Select Parent Slide" InputLabelProps={{ shrink: true, }} variant="outlined" error={hasError('parent_id')} helperText={hasError('parent_id') ? slidesFormState.errors.parent_id[0] : null} />}
                  />
                  : ''
                }
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <FormControl component="fieldset" error={hasError('content_type')}>
                  <FormLabel component="legend">Content Type</FormLabel>
                  <FormHelperText component="div" id="component-error-text">{hasError('content_type') ? slidesFormState.errors.content_type[0] : null}</FormHelperText>
                  <RadioGroup row aria-label="content_type" name="content_type" value={slidesFormState.values.content_type} onChange={handleContentTypeChange}>
                    <FormControlLabel
                      value="Text"
                      control={<Radio color="primary" />}
                      label="Text"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Image"
                      control={<Radio color="primary" />}
                      label="Image"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Audio"
                      control={<Radio color="primary" />}
                      label="Audio"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="Video"
                      control={<Radio color="primary" />}
                      label="Video"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
            <br />
            {(slidesFormState.values.content_type === 'Text') ?
              <div className={classes.formGroup}>
                <CKEditor
                  editor={ClassicEditor}
                  config={CK_CONFIGS(localStorage.getItem("token"))}
                  data={slidesFormState.values.text_content || ''}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setTextContent(data)
                  }}
                />
                <FormControl error={hasError('text_content')} >
                  <FormHelperText component='div' id="component-error-text">{hasError('text_content') ? slidesFormState.errors.text_content[0] : null}</FormHelperText>
                </FormControl>
              </div>
              :
              <Grid container spacing={3}>
                <Grid item xs={6} sm={6}>
                  <FormControl error={hasError('media_path')} >
                    <FormHelperText component='div' id="component-error-text">{hasError('media_path') ? slidesFormState.errors.media_path[0] : null}</FormHelperText>
                  </FormControl>
                  <SlideMedia
                    files={files}
                    setFiles={setFiles}
                    dropZoneConfig={dropZoneConfig}
                    slidesFormState={slidesFormState}
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  {((files.length < 1) && !isEmpty(slidesFormState.values.media_path)) ?
                    <SlideContant
                      style={{ minHeight: '200px', paddingLeft: '15px', paddingRight: '15px', display: 'flex' }}
                      slideData={slidesFormState.values}
                    />
                    : ''
                  }
                </Grid>
              </Grid>
            }
            {(slidesFormState.values.slide_type === 'Interactive') ?
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <SlideAnswers
                    slidesAns={slidesAns}
                    setSlidesAns={setSlidesAns}
                    correctAnsCount={correctAnsCount}
                    setCorrectAnsCount={setCorrectAnsCount}
                    ansError={ansError}
                    setAnsError={setAnsError}
                    schema={schema}
                    setSchema={setSchema}
                    resetValidationSchema={resetValidationSchema}
                    slidesFormState={slidesFormState}
                    setslidesFormState={setslidesFormState}
                    hasError={hasError}
                  />
                </Grid>
              </Grid>
              :
              ''
            }
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <div style={{ float: 'right' }} >
                  <StyledButton
                    color="bprimary"
                    disabled={!slidesFormState.isValid}
                    size="small"
                    type="button"
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={handleSubmit}
                  >
                    Save Slide
                  </StyledButton>&nbsp; &nbsp;
                  <StyledButton
                    variant="contained"
                    color="blight"
                    size="small"
                    onClick={() => { resetForm() }}
                    startIcon={<ClearIcon />}
                  >
                    RESET
                  </StyledButton>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            {slideList ?
              <Results
                className={classes.results}
                slideList={slideList}
                updateRecord={updateRecord}
                showDeleteModal={showDeleteModal}
              />
              : ''
            }

          </Grid>
        </Grid>
        <DeleteAlert
          title="Slide Delete"
          alertText="Are you sure, You want delete this Slide?"
          deleteCallback={deleteRecord}
          modalOpen={openDeleteModel}
          handleModalOpen={setOpenDeleteModel}
          onModelClose={hideDeleteModel}
        />
      </div>
    </div>
  );
};

export default QuizSlides;
