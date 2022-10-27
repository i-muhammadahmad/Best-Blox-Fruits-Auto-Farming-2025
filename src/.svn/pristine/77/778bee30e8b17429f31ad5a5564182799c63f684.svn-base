import React from 'react';
import { withStyles } from '@material-ui/styles';
import { Fab } from '@material-ui/core';
import theme  from 'theme';
// Like https://github.com/brunobertolini/styled-by
const styledBy = (property, mapping) => (props) => mapping[props[property]];


const styles = {
  root: {
    background: styledBy('color', {
      bprimary: theme.palette.bprimary.main,
      bsecondary: theme.palette.bsecondary.main,
      bsuccess: theme.palette.bsuccess.main,
      bdanger: theme.palette.bdanger.main,
      bwarning: theme.palette.bwarning.main,
      binfo: theme.palette.binfo.main,
      blight: theme.palette.blight.main,
      bdark: theme.palette.bdark.main
    }),
    color: styledBy('color', {
      bprimary: theme.palette.bprimary.contrastText,
      bsecondary: theme.palette.bsecondary.contrastText,
      bsuccess: theme.palette.bsuccess.contrastText,
      bdanger: theme.palette.bdanger.contrastText,
      bwarning: theme.palette.bwarning.contrastText,
      binfo: theme.palette.binfo.contrastText,
      blight: theme.palette.blight.contrastText,
      bdark: theme.palette.bdark.contrastText
    }),
    boxShadow: styledBy('color', {
      bprimary: theme.palette.bprimary.main,
      bsecondary: theme.palette.bsecondary.main,
      bsuccess: theme.palette.bsuccess.main,
      bdanger: theme.palette.bdanger.main,
      bwarning: theme.palette.bwarning.main,
      binfo: theme.palette.binfo.main,
      blight: theme.palette.blight.main,
      bdark: theme.palette.bdark.main
    }),
    '&:hover': {
      // Set hover color
      background: styledBy('color', {
        bprimary: theme.palette.bprimary.main,
        bsecondary: theme.palette.bsecondary.main,
        bsuccess: theme.palette.bsuccess.main,
        bdanger: theme.palette.bdanger.main,
        bwarning: theme.palette.bwarning.main,
        binfo: theme.palette.binfo.main,
        blight: theme.palette.blight.main,
        bdark: theme.palette.bdark.main
      }),
      color: styledBy('color', {
        bprimary: theme.palette.bprimary.contrastText,
        bsecondary: theme.palette.bsecondary.contrastText,
        bsuccess: theme.palette.bsuccess.contrastText,
        bdanger: theme.palette.bdanger.contrastText,
        bwarning: theme.palette.bwarning.contrastText,
        binfo: theme.palette.binfo.contrastText,
        blight: theme.palette.blight.contrastText,
        bdark: theme.palette.bdark.contrastText
      }),
    },
  },
};

const StyledFab = withStyles(styles)(({ classes, color, ...other }) => (
  <Fab className={classes.root} {...other} size="small" />
));

export default StyledFab;
