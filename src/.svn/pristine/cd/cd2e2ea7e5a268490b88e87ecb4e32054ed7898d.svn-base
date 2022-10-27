import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Label, GenericMoreButton } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL, APP_URL } from 'configs'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 900,
    
  },
  author: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(1)
  },
  tags: {
    '& > * + *': {
      marginLeft: theme.spacing(1)
    }
  },
  actions: {
    justifyContent: 'flex-end'
  },
  arrowForwardIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const CompliantDepartments = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const dispatch = useDispatch();
  const complianceState = useSelector(state => state.complianceState);
  const [complienceData, setComplienceData] = useState([]);

  useEffect(() => {
      
    setComplienceData(complianceState.departmentComplienceSummary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [complianceState.departmentComplienceSummary]);


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader
        action={<GenericMoreButton />}
        title="Compliant % per Office Department "
      />
      <Divider />
      <CardContent className={classes.content}>
        <PerfectScrollbar options={{ suppressScrollY: true }} >
          <div className={classes.inner} style={{maxHeight: 400, overflowY: 'scroll'}}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Office
                  </TableCell>
                  <TableCell>Department </TableCell>
                  <TableCell>Department Head </TableCell>
                  <TableCell>Compliant % </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complienceData.map(row_d => (
                  <TableRow
                    hover
                    key={row_d.department_id}
                  >
                    <TableCell>{row_d.office_name}</TableCell>
                    <TableCell>
                      {row_d.department_name}
                    </TableCell>
                    <TableCell>
                      <div className={classes.author}>
                        <Avatar
                          alt="Author"
                          className={classes.avatar}
                          src={API_URL + row_d.head_profile_pic}
                        >
                          
                        </Avatar>
                        {row_d.headname}
                      </div>
                    </TableCell>
                    <TableCell>
                      {row_d.compliance_per === 'N/A' ? row_d.compliance_per : <a style={{textDecoration:'underline'}} target='_blank' href={APP_URL+'course-report?office_id='+row_d.office_id+'&department_id='+row_d.department_id+'&is_complience=true'}>{row_d.compliance_per}</a>}
                      
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button
          color="primary"
          component={RouterLink}
          size="small"
          to="/management/projects"
          variant="text"
        >
          See all
          <ArrowForwardIcon className={classes.arrowForwardIcon} />
        </Button>
      </CardActions>
    </Card>
  );
};

CompliantDepartments.propTypes = {
  className: PropTypes.string
};

export default CompliantDepartments;
