/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import * as Yup from 'yup';
import axios from 'axios';
import LoadingSpinner from './LoaderSpinner';
import { Formik, Field, Form, getIn } from 'formik';

const initialValues = {
	email: '',
	password: ''
};

const LoginSchema = Yup.object().shape({
	email:
		Yup
			.string()
			.trim('Please remove whitespace')
			.email('Email must be valid')
			.strict()
			.required('Please enter email address'),
	password:
		Yup
			.string()
			.trim('Please remove whitespace')
			.strict()
			.required('Please enter password'),
		
});

const getErrorStyles = (errors, touched, fieldName) => {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
        return {
            border: '1px solid red'
        };
    }
};

class Login extends Component {
	state = {
		errorMsg: '',
		loader: false,
	}

	handleSubmit = (values) => {
		this.setState({ loader: true }, () => {
			axios.post('https://reqres.in/api/login',values)
				.then(res => {
					
					this.props.history.push(`/dashboard`);
				})
				.catch(err => {
					let errorMessage = '';
					try {
						errorMessage = err.data.message ? err.data.message : err.data.error_description;
					} catch (err) {
						errorMessage = 'No records found.';
					}
					this.setState({
						loader: false,
						errorMsg: errorMessage
					});
					setTimeout(() => {
						this.setState({ errorMsg: null });
					}, 2500);
				});
 });
	
	
	}


	render() {
		
			return (
				<div className="position-relative">
					{this.state.loader ?
						<span className='loaderStyle'><LoadingSpinner /></span>
						: null
					}
					<div className="welcomeOuter">
						<div className="regWhiteOuter">
							<Container>
								<div className="welcomePage">
									<div className="row">
										<div className="col-sm-12">
											{
												this.props.authlogoutMsg && this.props.authlogoutMsg !== null ?
													<div className="alert alert-warning alert-dismissible fade show" role="alert">
														{this.props.authlogoutMsg}
													</div>
	
													:
													null
											}
										</div>
									</div>
									<Row className="show-grid">
										<Col md={12}>
											<div className="welcomeIntro">
												<div className="login position-relative">
													<h4 className='text-orange-primary mb-3'>Login</h4>
													{this.state.errorMsg ?
														<p className="alert alert-danger text-center" role="alert"> {this.state.errorMsg} </p>
														: null
													}
													<Formik 
														initialValues={initialValues}
														validationSchema={LoginSchema}
														onSubmit={this.handleSubmit}
														
													>
														{({ 
															errors, 
															touched,
															
															handleChange }) => {
															return (<Form className='text-dark'>
																<div className="position-relative">
																	<div className="form-group">
																		<label className="form-label font-weight-bold">Email Address <span className="text-danger">*</span></label>
																		<Field
																			style={getErrorStyles(
																				errors,
																				touched,
																				'email'
																			)}
																			type="email"
																			name="email"
																			placeholder="Enter email"
																			className="form-control"
																		/>
																		{errors.email && touched.email ? <span className="errorMsg text-danger">{errors.email}</span> : null}
																	</div>
																	<div className="form-group">
																		<label className="form-label font-weight-bold">Password <span className="text-danger">*</span></label>
																		<Field
																			style={getErrorStyles(
																				errors,
																				touched,
																				'password'
																			)}
																			type="password"
																			name="password"
																			placeholder="Password"
																			className="form-control"
																		/>
																		{errors.password && touched.password ? <span className="errorMsg text-danger">{errors.password}</span> : null}
																	</div>
																	<div className='row mt-2 text-center'>
																		<div className='col-sm-12'>
																			<Button variant="primary mr-3" type="submit" className="btnStylePrimary mt-3">
																				<span className="font-weight-normal">Login</span>
																			</Button>
																		</div>
																	</div>
	
																</div>
															</Form>);
														}}
													</Formik>
	
												</div>{/* end: login */}
											</div>
										</Col>
									</Row>
								</div>{/* end: welcomePage*/}
							</Container>
						</div>{/* end: regWhiteOuter*/}

					</div>
				</div>
			);
		}
	}



export default Login;
