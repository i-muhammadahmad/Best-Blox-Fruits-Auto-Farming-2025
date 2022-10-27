import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  Box,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Paper,
  Typography
} from '@material-ui/core';
import { StyledButton } from 'components';
import { OfficesDropdown } from 'commonDropdowns';
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty } from 'lodash';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { StyledChip } from 'components';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    // minWidth: 700
  },
  table_inner: {
    // margin: '10px',
  }
}));

const ExtraFilters = props => {
  const {
    className,
    extraFiltersState,
    setExtraFiltersState,
    filterRecords,
    officeDataList,
    totalSeats,
    ...rest
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [OfficeValue, setOfficeValue] = useState('');

  const handleChange = event => {
    event.persist();
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...extraFiltersState.touched,
        [event.target.name]: true
      }
    }));
  };

  const officeOnChange = (event, newValue) => {
    if (newValue) {
      setOfficeValue(newValue);
      setOfficeId(newValue.id);
    } else {
      setOfficeValue(newValue);
      setOfficeId('');
    }
  };

  const setOfficeId = office_id => {
    setExtraFiltersState(extraFiltersState => ({
      ...extraFiltersState,
      values: {
        ...extraFiltersState.values,
        office_id: office_id
      },
      touched: {
        ...extraFiltersState.touched,
        office_id: true
      }
    }));
  };

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
          <Card>
            <CardHeader title="Seats Details" />
            <Divider />
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item xs={12}>
                  <PerfectScrollbar>
                    <TableContainer component={Paper}>
                      <Table size="small">
                        <TableHead>
                          <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Location</TableCell>
                            <TableCell>Total Seats</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Object.values(officeDataList).map(
                            (odata, oindex) => (
                              <TableRow>
                                <TableCell>{odata['name']}</TableCell>
                                <TableCell>
                                  <StyledChip
                                    size="small"
                                    color="bprimary"
                                    label={odata['total_seats']}
                                  />
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                        <TableHead>
                          <TableRow style={{ backgroundColor: '#f5f5f5' }}>
                            <TableCell>Overall Total Seats</TableCell>
                            <TableCell>
                              <StyledChip
                                size="small"
                                color="bprimary"
                                label={totalSeats}></StyledChip>
                            </TableCell>
                          </TableRow>
                        </TableHead>
                      </Table>
                    </TableContainer>
                  </PerfectScrollbar>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardHeader title="Filters" />
            <Divider />
            <CardContent className={classes.content}>
              <Grid container>
                <Grid item xs={12}>
                  <OfficesDropdown
                    OfficeValue={OfficeValue}
                    setOfficeValue={setOfficeValue}
                    id="office_id"
                    name="office_id"
                    officeOnChange={officeOnChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        size="small"
                        label="Select Office"
                        variant="outlined"
                      />
                    )}
                  />
                  <br />
                  <Box display="flex" flexDirection="row-reverse">
                    <StyledButton
                      color="bsuccess"
                      size="small"
                      type="button"
                      variant="contained"
                      startIcon={<SearchIcon />}
                      onClick={() => {
                        filterRecords();
                      }}>
                      Filter Result
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

ExtraFilters.propTypes = {
  className: PropTypes.string
};

export default ExtraFilters;
