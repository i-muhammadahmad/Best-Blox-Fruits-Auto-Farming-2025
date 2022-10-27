import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  IconButton,
  Tooltip,
  colors
} from '@material-ui/core';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import { StackAvatars } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
  critical: {
    '& $indicator': {
      borderColor: colors.red[600]
    }
  },
  indicator: {
    height: 12,
    width: 12,
    borderWidth: 4,
    borderStyle: 'solid',
    borderColor: colors.grey[100],
    borderRadius: '50%'
  },
  viewButton: {
    marginLeft: theme.spacing(2)
  },
  carouselItemCustom: {
    maxHeight: '420px',
    overflowY: 'scroll'
  }
}));

const AdvisoryBoardItem = props => {
  const { advisoryBoard, className, ...rest } = props;

  const classes = useStyles();

  return (
    <div className={classes.carouselItemCustom}>
      <div
        className="ck-content" style={{display: 'inline-block'}} dangerouslySetInnerHTML={{ __html: advisoryBoard.description }}
      />
    </div>
  );
};

AdvisoryBoardItem.propTypes = {
  className: PropTypes.string,
  advisoryBoard: PropTypes.object.isRequired
};

export default AdvisoryBoardItem;
