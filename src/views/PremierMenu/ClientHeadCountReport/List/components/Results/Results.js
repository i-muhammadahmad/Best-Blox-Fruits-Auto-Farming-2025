import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableContainer,
  Paper,
  TableCell,
  Avatar
} from '@material-ui/core';
import { GenericMoreButton, TableEditBar } from 'components';
import { isEmpty } from 'lodash';
import { API_URL } from 'configs'

const useStyles = makeStyles(theme => ({
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
    height: 50,
    width: 50,
    marginRight: theme.spacing(1)
  },
  actions: {
    padding: theme.spacing(1),
    justifyContent: 'flex-end'
  }
}));

const Results = props => {
  const { className, theaderData, headerData, rowsData, footerData, ...rest } = props;

  const classes = useStyles();

  const getTopHeaderRow = () => {
    if (!isEmpty(theaderData)) {

      return (
        <TableRow>
          {Object.values(theaderData).map((flag_image, hi) => (
            <TableCell key={hi}>
              {(flag_image) ? <Avatar alt="Avator" src={API_URL + flag_image} /> : ''}
            </TableCell>
          ))}
        </TableRow>
      );
    }
  }

  const getHeaderRow = () => {
    if (!isEmpty(headerData)) {

      return (
        <TableRow>
          {Object.values(headerData).map((hcell, hi) => (
            <TableCell key={hi} >{hcell}</TableCell>
          ))}
        </TableRow>
      );
    }
  }

  const getFooterRow = () => {
    if (!isEmpty(headerData)) {
      let hkeys = Object.keys(headerData);
      return (
        <TableRow>
          {Object.values(hkeys).map((hkey, hi) => (
            <TableCell key={hi} style={{backgroundColor:'#edebeb'}}>{footerData[hkey]}</TableCell>
          ))}
        </TableRow>
      );
    }

  }

  const getDetailRows = () => {
    return (
      <>
        {Object.values(rowsData).map((drow, dri) => (
          <TableRow key={dri}>
            {Object.values(drow).map((dcell, dci) => (
              <TableCell key={dci} style={{backgroundColor: (dci == 0 || dci == 1 || dci == 7) ? '#edebeb' : ''}}>{dcell}</TableCell>
            ))}
          </TableRow>
        ))}
      </>

    );
  }

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Typography
        color="textSecondary"
        gutterBottom
        variant="body2"
      >

      </Typography>
      <Card>
        <CardHeader
          action={<GenericMoreButton />}
          title="Client Headcount Report"
        />
        <Divider />
        <CardContent className={classes.content}>
          <PerfectScrollbar>
            <div className={classes.inner}>
              <TableContainer component={Paper} style={{margin:'15px 0px'}}>
                <Table aria-label="Client Headcount Report">
                <TableHead>
                    {getTopHeaderRow()}
                  </TableHead>
                  <TableHead>
                    {getHeaderRow()}
                  </TableHead>
                  <TableBody>
                    {getDetailRows()}
                  </TableBody>
                  <TableHead>
                    {getFooterRow()}
                  </TableHead>
                </Table>
              </TableContainer>
            </div>
          </PerfectScrollbar>
        </CardContent>
      </Card>
    </div>
  );
};

export default Results;
