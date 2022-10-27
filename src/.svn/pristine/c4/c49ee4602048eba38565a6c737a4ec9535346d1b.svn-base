import uuid from 'uuid/v1';
import moment from 'moment';
import { colors } from '@material-ui/core';

import mock from 'utils/mock';

mock.onGet('/api/calendar').reply(200, {
  draft: [],
  events: [
    {
      id: uuid(),
      title: 'Test Holiday',
      desc: 'US Holiday',
      color: colors.blue['700'],
      start: moment('2020-10-11'),
      end: moment('2020-10-11')
    },
    {
      id: uuid(),
      title: 'Veterens Day',
      desc: 'US Holiday',
      color: colors.green['700'],
      start: moment('2020-11-11'),
      end: moment('2020-11-11')
    },
    {
      id: uuid(),
      title: 'Thanks Giving Day',
      desc: 'US Holiday',
      color: colors.blueGrey['700'],
      start: moment('2020-11-26'),
      end: moment('2020-11-26')
    },
    {
      id: uuid(),
      title: 'Day After Thanks Giving Day',
      desc: 'US Holiday',
      color: colors.orange['700'],
      start: moment('2020-11-27'),
      end: moment('2020-11-27')
    },
    {
      id: uuid(),
      title: 'Christmas Day',
      desc: 'US Holiday',
      color: colors.orange['700'],
      start: moment('2020-12-25'),
      end: moment('2020-12-25')
    },
  ]
});
