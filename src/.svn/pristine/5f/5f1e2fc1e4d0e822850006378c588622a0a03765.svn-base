import React from 'react';
import { forEach, isEmpty } from 'lodash';
import LineItemsList from './LineItemsList';

const LineItems = props => {
	const {
		lineItemsList,
		setLineItemsList,
		formState,
		setFormState,
		schema,
		setSchema,
		hasError
	} = props;

	return (
		<>
			{!isEmpty(lineItemsList)
				? Object.values(lineItemsList).map((data, index) => (
						<LineItemsList
							key={index}
							lineItem={data}
							lineItemsList={lineItemsList}
							setLineItemsList={setLineItemsList}
							formState={formState}
							setFormState={setFormState}
							schema={schema}
							setSchema={setSchema}
							hasError={hasError}
						/>
				  ))
				: ''}
		</>
	);
};

export default LineItems;
