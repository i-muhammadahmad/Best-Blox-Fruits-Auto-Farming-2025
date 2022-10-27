import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from 'utils/mock';

mock.onGet('/api/calendar').reply(200, {
  draft: [],
  events: [
    {
      id: uuid(),
      title: 'Veterens Day',
      desc: 'US Holiday',
      color: colors.green['700'],
      start: moment('2029-11-11 00:00:00'),
      end: moment('2020-11-11 23:59:59')
    },

  ]
});
