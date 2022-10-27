import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import {
  Header
} from './components';
import {
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Card,
  CardHeader,
  CardContent,
  Grid,
  ButtonBase
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs';

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
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const SetupFloorPlanView = () => {
  const classes = useStyles();
  const router = useRouter();
  const setupFloorPlanState = useSelector(state => state.setupFloorPlanState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!setupFloorPlanState.showUpdateForm && !setupFloorPlanState.showViewPage) {
      router.history.push('/setup-floor-plan');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupFloorPlanState.showViewPage, setupFloorPlanState.showUpdateForm]);

  useEffect(() => {
    if (setupFloorPlanState.redirect_to_list) {
      router.history.push('/setup-floor-plan');
    }
  }, [setupFloorPlanState.redirect_to_list, router.history]);


  return (
    <Page
      className={classes.root}
      title="Setup Floor Plan View"
    >
      <Header />
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Setup Floor Plan View" />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <TableContainer component={Paper}>
                <Table size='small' className={classes.table} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell variant="head" > Name </TableCell>
                      <TableCell>{setupFloorPlanState.setupFloorPlansRecord.name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Office </TableCell>
                      <TableCell>{
                        !isEmpty(setupFloorPlanState.setupFloorPlansRecord.office) ?
                      setupFloorPlanState.setupFloorPlansRecord.office.name : ''
                      }
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created By </TableCell>
                      <TableCell>{
                        !isEmpty(setupFloorPlanState.setupFloorPlansRecord.created_by_user) ?
                          setupFloorPlanState.setupFloorPlansRecord.created_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Created At </TableCell>
                      <TableCell>{setupFloorPlanState.setupFloorPlansRecord.date_created}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated By </TableCell>
                      <TableCell>{
                        !isEmpty(setupFloorPlanState.setupFloorPlansRecord.created_by_user) ?
                          setupFloorPlanState.setupFloorPlansRecord.updated_by_user.email : ''
                      }</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell variant="head" > Last Updated At </TableCell>
                      <TableCell>{setupFloorPlanState.setupFloorPlansRecord.date_last_modified}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>    
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Floor Plan SVG" />
        <CardContent>
          <Grid container>
            <Grid item xs={12} sm={12}>
              <ButtonBase className={classes.image}>
                <img className={classes.img} alt="complex" src={API_URL+'storage/media/FloorPlans/'+setupFloorPlanState.setupFloorPlansRecord.floor_plan_image} />
              </ButtonBase>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card
        className={classes.projectDetails}
      >
        <CardHeader title="Description" />
        <CardContent>
          <div
            className="ck-content" dangerouslySetInnerHTML={{ __html: setupFloorPlanState.setupFloorPlansRecord.description }}
          />
        </CardContent>
      </Card>
    </Page>
  );
}

export default SetupFloorPlanView;