import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Tooltip
} from '@material-ui/core';
import { isEmpty, forEach } from 'lodash';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AssetAttributesList = props => {
  const { formState, setFormState, schema, setSchema, hasError, ...rest } = props;

  const classes = useStyles();

  //this will set validtion schema on asset attributes chane
  useEffect(() => {
    if (!isEmpty(formState.values.asset_attributes)) {
      let new_schema = { ...schema };
      forEach(formState.values.asset_attributes, function (attr_val, key) {

        if (attr_val.is_required == 1) {
          new_schema[attr_val.attr_id] = { presence: { allowEmpty: false, message: '^ ' + attr_val.field_name + 'is Required' } }
        }

      });
      setSchema(new_schema);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.values.asset_attributes]);

  const handleAssetAttrChange = (event, attribute, index) => {
    event.persist();

    //updating asset Attr state
    let asset_attributes_array = [...formState.values.asset_attributes]
    asset_attributes_array[index]['attr_value'] = event.target.value;

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]: event.target.value,
        asset_attributes: [
          ...asset_attributes_array
        ]
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  }

  return (
    <div
      {...rest}
      className={classes.root}
    >
      {(!isEmpty(formState.values.asset_attributes)) ?
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="Asset Attributes Tables">
            <TableHead>
              <TableRow>
                <TableCell >
                  Name
              </TableCell>
                <TableCell >
                  Value
              </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formState.values.asset_attributes.map((attr, index) => (
                <TableRow key={attr.attr_id} >
                  <TableCell >
                    {attr.field_name}
                    <span style={{color:'red'}}> {(attr.is_required == 1)? '*':''} </span>
                  </TableCell>
                  <TableCell >
                    <Tooltip title={attr.field_tip} arrow>
                      <TextField
                        error={hasError(attr.attr_id)}
                        fullWidth
                        helperText={hasError(attr.attr_id) ? formState.errors[attr.attr_id] : null}
                        placeholder={attr.field_name}
                        name={attr.attr_id}
                        onChange={(e) => handleAssetAttrChange(e, attr, index)}
                        value={formState.values[attr.attr_id] || ''}
                        variant="outlined"
                        size="small"
                      />
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        : ""}
    </div>
  );
};

export default AssetAttributesList;
