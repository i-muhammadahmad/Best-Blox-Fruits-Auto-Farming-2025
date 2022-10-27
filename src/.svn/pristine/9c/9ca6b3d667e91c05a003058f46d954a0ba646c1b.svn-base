import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Page, StyledFab } from 'components';
import {
  Header,
  Results,
  ExtraFilters,
  ClockInImageViewModel
} from './components';
import {
  getUserClockInImagesList,
} from 'actions';
import { forEach } from 'lodash'
import VisibilityIcon from '@material-ui/icons/Visibility'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  results: {
    marginTop: theme.spacing(3)
  },
  extraFeilds: {
    marginTop: theme.spacing(3)
  }
}));


const UserClockInImagesReportList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [userClockInImagesReportRecords, setUserClockInImagesReportRecords] = useState([]);
  const [extraFiltersState, setExtraFiltersState] = useState({
    date_column: 'date_created'
  });
  const [openImageViewModel, setOpenImageViewModel] = React.useState(false);
  const [imagePath, setImagePath] = React.useState('');

  const userReportState = useSelector(state => state.userReportState);
  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      //dispatch(getUserClockInImagesList(extraFiltersState))
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let activity_list = [];
    forEach(userReportState.userClockInImagesReportList, function (value, key) {
      let actions = getActions(value);
      value['Actions'] = actions
      value['user_name'] = (value.user_record) ? value.user_record.email : ''
      activity_list[key] = value;
    });
    setUserClockInImagesReportRecords(activity_list);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userReportState.userClockInImagesReportList]);

  const imageViewOnClick = (image_path) => {
    setImagePath(image_path);
    setOpenImageViewModel(true);
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(session.current_page_permissions.rights_view == '1') ?
          <StyledFab
            color="bwarning"
            aria-label="View Image"
            size="small"
            onClick={() => imageViewOnClick(value.image_path)}
          >
            <VisibilityIcon />
          </StyledFab>
          : ''
        }
      </div>
    )
  }

  const filterRecords = () => {
    dispatch(getUserClockInImagesList(extraFiltersState))
  }

  return (
    <Page
      className={classes.root}
      title="User Clock In Report"
    >
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />
      {userClockInImagesReportRecords && (
        <Results
          className={classes.results}
          userClockInImagesReportRecords={userClockInImagesReportRecords}
        />
      )}

      <ClockInImageViewModel
        modalOpen={openImageViewModel}
        handleModalOpen={setOpenImageViewModel}
        imagePath={imagePath}
        setImagePath={setImagePath}
      />

    </Page>
  );
};

export default UserClockInImagesReportList;
