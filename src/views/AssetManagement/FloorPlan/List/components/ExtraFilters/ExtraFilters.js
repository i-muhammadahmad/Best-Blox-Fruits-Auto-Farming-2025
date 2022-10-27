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
  Collapse,
  IconButton
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import {
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete
} from '@material-ui/lab';
import { StyledButton } from 'components';
import { OfficesDropdown } from 'commonDropdowns';
import SearchIcon from '@material-ui/icons/Search';
import { map, isEmpty } from 'lodash';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  content: {
    padding: theme.spacing(3)
  },
  inner: {
    minWidth: 700
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  }
}));

const ExtraFilters = props => {
  const {
    className,
    extraFiltersState,
    setExtraFiltersState,
    filterRecords,
    ...rest
  } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [OfficeValue, setOfficeValue] = useState('');
  const [expanded, setExpanded] = useState(true);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
      <Card>
        <CardHeader
          title="Filters"
          action={
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more">
              <ExpandMoreIcon />
            </IconButton>
          }
        />
        <Divider />
        <Collapse in={expanded} timeout="auto">
          <CardContent className={classes.content}>
            <div className={classes.inner}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <OfficesDropdown
                    OfficeValue={OfficeValue}
                    setOfficeValue={setOfficeValue}
                    id="office_id"
                    name="office_id"
                    // selectedId={extraFiltersState.values.office_id}
                    officeOnChange={officeOnChange}
                    renderInput={params => (
                      <TextField
                        {...params}
                        label="Select Office"
                        variant="outlined"
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
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
                      Search
                    </StyledButton>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

ExtraFilters.propTypes = {
  className: PropTypes.string
};

export default ExtraFilters;
