import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { 
    Field, 
    Form, 
    getIn,
    withFormik 
} from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import Avater from './../../../assets/images/avatar.png';
import axios from './../../../shared/eaxios';
import LoadingSpinner from './../../../Components/LoadingSpinner/LoadingSpinner';



const ProfileSchema = Yup.object().shape({
	firstName:Yup
			.string()
			.trim('Please remove whitespace')
			.strict()
            .required('Please enter'),

    lastName:Yup
        .string()
        .trim('Please remove whitespace')
        .strict()
        .required('Please enter'),        
		
});

const getErrorStyles = (errors, touched, fieldName) => {
    if (getIn(errors, fieldName) && getIn(touched, fieldName)) {
        return {
            border: '1px solid red'
        };
    }
};

class Profile extends Component {
	state = {
		errorMsg: '',
        user_type_id:null,
        enableEdit:false
    }
    
    
    enableEdit=()=>{
        
        this.setState({
            enableEdit:true
        });
    }    

	
	componentDidMount() {
        const {setStatus} = this.props;
        setStatus({loader: false});
        
    }


    
    componentDidUpdate(prevProps) {

        const { 
            success: wasSuccess = false, 
            error: wasError = false 
        } = prevProps.status || {};
    
        const {
            success: isSuccess = false,
            error: isError = false,
            errorMessage: message = '',
            
        } = this.props.status || {};
        
       
    
        // Show success message
        if (isSuccess && !wasSuccess) {
            //this.showSuccesSubmitModal();
            // this.setState({
            //     loader: false,
            // });
        }
        // Show error message
        if (isError && !wasError) {
            //this.showInvoiceWarningModal(message);
            console.log('message', message);
            // this.setState({
            //     loader: false,
            // });
        }
    }


	render() {

        const {
            values,
            errors,
            touched,
            formLoading,
            status
        } = this.props;

       

		return (
            <div className="position-relative">
                {status && status.loader  && <LoadingSpinner />}
               {formLoading == true ? (
                    <LoadingSpinner />
                ) : (
                <Container>
                        <Row className="show-grid">
                            <Col md={12}>
                                {this.state.errorMsg && (<p className="alert alert-danger text-center" role="alert"> {this.state.errorMsg} </p>)}
                                <Form className='text-dark'>
                                    <div className="position-relative">
                                    <div className="text-center mb-4">
                                        <img src={Avater} className="img-fluid img-thumbnail" width={100} height={100} alt="..."/>
                                    </div>
                                        <div className='row'>
                                            <div className={'col-sm-6'}>
                                                
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold text-white">First Name <span className="text-danger">*</span></label>
                                            <Field
                                                style={getErrorStyles(
                                                    errors,
                                                    touched,
                                                    'firstName'
                                                )}
                                                type="input"
                                                name="firstName"
                                                placeholder="First Name"
                                                value={values.firstName}
                                                className="form-control"
                                            />
                                            {errors.firstName && touched.firstName ? <span className="errorMsg text-danger">{errors.firstName}</span> : null}
                                        </div>
                                        
                                            </div>
                                            <div className={'col-sm-6'}>
                                                    
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold text-white">Last Name <span className="text-danger">*</span></label>
                                            <Field
                                                style={getErrorStyles(
                                                    errors,
                                                    touched,
                                                    'lastName'
                                                )}
                                                type="input"
                                                name="lastName"
                                                placeholder="First Name"
                                                value={values.lastName}
                                                className="form-control"
                                            />
                                            {errors.lastName && touched.lastName ? <span className="errorMsg text-danger">{errors.lastName}</span> : null}
                                        </div>
                                        
                                            </div>
                                        </div>
                                        <div className='row mt-2 text-center'>
                                            <div className='col-sm-12'>
                                                <Button variant="primary mr-3" type="submit" className="mt-3">
                                                    <span className="font-weight-normal">Submit</span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </Col>
                        </Row>
                </Container>
                )}
            </div>
        );
	}
}

Profile.propTypes = {
    userType: PropTypes.string,
    user: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object,
    formLoading: PropTypes.bool,
    setStatus: PropTypes.func,
    status: PropTypes.object,
    
};

const mapStateToProps = (state) => {
	return {
		userType:state.user.user_type_name,
        user:state.user,
	};
};

const withFormikConfig = {
    validationSchema: ProfileSchema,
    mapPropsToValues: () => {
        return {
            firstName: '',
            lastName: '',
        };
    },
    
    handleSubmit(
        values,
        { setStatus }
    ) {
        setStatus({loader: true});
        try {
            axios.post('billing/billingconfig',
                
            )
                .then(function (response=true) {
                    console.log('Add Billing Product Config +++++++++', response);
                    setStatus({
                        success: true,
                        loader: false
                    });                    
                })
                .catch((err) => {
                    let errorMessage = '';
                    try {
                        errorMessage = err.data.message
                            ? err.data.message
                            : err.data.error_description;
                    } catch (err) {
                        errorMessage = 'Custome error massage';
                    }
                    setStatus({
                        error: true,
                        errorMessage: errorMessage,
                        loader: false
                    });
                });

            
        } catch (err) {
            let errorMessage = '';
            try {
                errorMessage = err.data.message
                    ? err.data.message
                    : err.data.error_description;
            } catch (err) {
                errorMessage = 'Billing product not added.';
            }
            setStatus({
                error: true,
                errorMessage: errorMessage,
            });
        }
    },
};

export default connect(mapStateToProps)(withFormik(withFormikConfig)(Profile)); 
