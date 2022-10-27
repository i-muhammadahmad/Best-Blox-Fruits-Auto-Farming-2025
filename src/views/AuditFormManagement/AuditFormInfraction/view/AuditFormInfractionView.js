import React, { useEffect } from 'react';
import { Page } from 'components';
import useRouter from 'utils/useRouter';
import { Header } from './components';
import {
	makeStyles,
	Paper,
	Backdrop,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Card,
	CardHeader,
	CardContent
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty, join } from 'lodash';

const useStyles = makeStyles(theme => ({
	root: {
		width: theme.breakpoints.values.lg,
		maxWidth: '100%',
		margin: '0 auto',
		padding: theme.spacing(3, 3, 6, 3)
	},
	projectDetails: {
		marginTop: theme.spacing(3)
	},
	formGroup: {
		marginBottom: theme.spacing(3)
	}
}));

const AuditFormInfractionView = () => {
	const classes = useStyles();
	const router = useRouter();
	const auditFormInfractionState = useSelector(
		state => state.auditFormInfractionState
	);
	const dispatch = useDispatch();

	useEffect(() => {
		if (auditFormInfractionState.redirect_to_list) {
			router.history.push('/audit-form-infraction');
		}
	}, [auditFormInfractionState.redirect_to_list, router.history]);

	useEffect(() => {
		if (
			!auditFormInfractionState.showViewPage &&
			!auditFormInfractionState.showUpdateForm
		) {
			router.history.push('/audit-form-infraction');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [
		auditFormInfractionState.showViewPage,
		auditFormInfractionState.showUpdateForm
	]);

	const getInfractionClients = () => {
		let clientsArr = [];

		if (!isEmpty(auditFormInfractionState.auditFormInfractionRecord.infraction_clients) && auditFormInfractionState.auditFormInfractionRecord.is_all == 0) {
			Object.values(auditFormInfractionState.auditFormInfractionRecord.infraction_clients).map(camp => {
				clientsArr.push(camp['client'].client_name);
			});
			return <span>{join(clientsArr, [', '])}</span>;
		}
    else{
      return <span>All</span>
    }
	};

	return (
		<Page className={classes.root} title="Audit Form Infraction View">
			<Header />
			<Card className={classes.projectDetails}>
				<CardHeader title="Audit Form Infraction" />
				<CardContent>
					<TableContainer component={Paper}>
						<Table className={classes.table} aria-label="simple table">
							<TableBody>
								<TableRow>
									<TableCell variant="head">
										{' '}
										Audit Form Infraction Name{' '}
									</TableCell>
									<TableCell>
										{
											auditFormInfractionState.auditFormInfractionRecord
												.name
										}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head">
										{' '}
										Audit Form Infraction Category{' '}
									</TableCell>
									<TableCell>
										{!isEmpty(
											auditFormInfractionState.auditFormInfractionRecord
												.category
										)
											? auditFormInfractionState.auditFormInfractionRecord
													.category.opt_display
											: ''}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head"> Client </TableCell>
									<TableCell>{getInfractionClients()}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head">
										{' '}
										Score Deduction Percentage (%){' '}
									</TableCell>
									<TableCell>
										{
											auditFormInfractionState.auditFormInfractionRecord
												.deduction_percentage
										}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head"> Created By </TableCell>
									<TableCell>
										{!isEmpty(
											auditFormInfractionState.auditFormInfractionRecord
												.created_by_user
										)
											? auditFormInfractionState.auditFormInfractionRecord
													.created_by_user.email
											: ''}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head"> Created At </TableCell>
									<TableCell>
										{
											auditFormInfractionState.auditFormInfractionRecord
												.date_created
										}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head"> Last Updated By </TableCell>
									<TableCell>
										{!isEmpty(
											auditFormInfractionState.auditFormInfractionRecord
												.created_by_user
										)
											? auditFormInfractionState.auditFormInfractionRecord
													.updated_by_user.email
											: ''}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell variant="head"> Last Updated At </TableCell>
									<TableCell>
										{
											auditFormInfractionState.auditFormInfractionRecord
												.date_last_modified
										}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
			<Card className={classes.projectDetails}>
				<CardHeader title="Audit Form Infraction Description" />
				<CardContent>
					<div
						className="ck-content"
						dangerouslySetInnerHTML={{
							__html:
								auditFormInfractionState.auditFormInfractionRecord.description
						}}
					/>
				</CardContent>
			</Card>
		</Page>
	);
};

export default AuditFormInfractionView;
