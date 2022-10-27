import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
	colors,
	Grid,
	TextField,
	FormHelperText,
	Typography
} from '@material-ui/core';

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
		minHeight: '420px',
		maxHeight: '420px',
		overflowY: 'scroll',
		overflowX: 'hidden'
	}
}));

const EmailTemplateItem = props => {
	const { emailTemplate, className, ...rest } = props;

	const classes = useStyles();

	return (
		<div className={classes.carouselItemCustom}>
			<Grid container spacing={3} style={{ marginTop: '5px' }}>
				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Name"
						InputProps={{
							readOnly: true
						}}
						InputLabelProps={{
							shrink: true
						}}
						defaultValue={emailTemplate.name}
						variant="outlined"
						size="small"
					/>
				</Grid>
				<Grid item xs={6}>
					<TextField
						fullWidth
						label="Subject"
						InputProps={{
							readOnly: true
						}}
						InputLabelProps={{
							shrink: true
						}}
						defaultValue={emailTemplate.subject}
						variant="outlined"
						size="small"
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="To Emails"
						InputProps={{
							readOnly: true
						}}
						InputLabelProps={{
							shrink: true
						}}
						defaultValue={emailTemplate.to_emails}
						variant="outlined"
						size="small"
						multiline
						rowsMax={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="CC Emails"
						InputProps={{
							readOnly: true
						}}
						InputLabelProps={{
							shrink: true
						}}
						defaultValue={emailTemplate.cc_emails}
						variant="outlined"
						size="small"
						multiline
						rowsMax={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField
						fullWidth
						label="BCC Emails"
						InputProps={{
							readOnly: true
						}}
						InputLabelProps={{
							shrink: true
						}}
						defaultValue={emailTemplate.bcc_emails}
						variant="outlined"
						size="small"
						multiline
						rowsMax={4}
					/>
				</Grid>
				<Grid item xs={12}>
					<FormHelperText id="body">
						<Typography component="b"><b>Email Body</b></Typography>
					</FormHelperText>
					<div
						className="ck-content"
						style={{marginTop: '5px'}}
						dangerouslySetInnerHTML={{ __html: emailTemplate.body }}
					/>
				</Grid>
			</Grid>
		</div>
	);
};

EmailTemplateItem.propTypes = {
	className: PropTypes.string,
	emailTemplate: PropTypes.object.isRequired
};

export default EmailTemplateItem;
