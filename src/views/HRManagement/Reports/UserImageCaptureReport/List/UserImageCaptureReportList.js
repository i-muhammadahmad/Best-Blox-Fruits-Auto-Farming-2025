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
import { forEach } from 'lodash'
import VisibilityIcon from '@material-ui/icons/Visibility'
import moment from 'moment';
import AccessRights from 'utils/AccessRights';

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

const UserImageCaptureReportList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [refershDataTable, setRefershDataTable] = useState(false);
  const [extraFiltersState, setExtraFiltersState] = useState({
    date_column: 'date_created',
    date_value: moment(moment().toDate()).format('YYYY-MM-DD')
  });
  const [openImageViewModel, setOpenImageViewModel] = React.useState(false);
  const [imageRecord, setImageRecord] = React.useState([]);

  const session = useSelector(state => state.session);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
    }
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const imageViewOnClick = (image_record) => {
    setImageRecord(image_record);
    setOpenImageViewModel(true);
  }

  const getActions = value => {
    return (
      <div className={'actionClass'} style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
        {(AccessRights(session.current_page_permissions, 'view', value.user_id)) ?
          <StyledFab
            color="bwarning"
            aria-label="View Image"
            size="small"
            onClick={() => imageViewOnClick(value)}
          >
            <VisibilityIcon />
          </StyledFab>
          : ''
        }
      </div>
    )
  }

  const filterRecords = () => {
    setRefershDataTable(true);
  }

  return (
    <Page
      className={classes.root}
      title="User Image-Capture Report"
    >
      <Header />
      <ExtraFilters
        className={classes.extraFeilds}
        extraFiltersState={extraFiltersState}
        setExtraFiltersState={setExtraFiltersState}
        filterRecords={filterRecords}
      />
      <Results
        className={classes.results}
        refershDataTable={refershDataTable}
        setRefershDataTable={setRefershDataTable}
        actionsCol={getActions}
        extraFiltersState={extraFiltersState}
      />
      <ClockInImageViewModel
        modalOpen={openImageViewModel}
        handleModalOpen={setOpenImageViewModel}
        imageRecord={imageRecord}
        setImageRecord={setImageRecord}
      />

    </Page>
  );
};

export default UserImageCaptureReportList;
