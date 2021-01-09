import React, { Component } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { 
    Field, 
    Form, 
    getIn,
    withFormik 
} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';



const ProfileSchema = Yup.object().shape({
	email:Yup
			.string()
			.email('Please enter proper email-id')
			.strict()
            .required('Please enter'),

    password:Yup
        .string()
        .min(8, 'Password should be more than 8 char')
        .strict()
        .required('Please enter')
		
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
                {status && status.loader  && <span>Loading..</span>}
               {formLoading == true ? (
                    <span>Loading..</span>
                ) : (
                <Container>
                        <Row className="show-grid">
                            <Col md={12}>
                                {this.state.errorMsg && (<p className="alert alert-danger text-center" role="alert"> {this.state.errorMsg} </p>)}
                                <Form className='text-dark'>
                                    <div className="position-relative">
                                    <div className="text-center mb-4">
                                       
                                    </div>
                                        <div className='row'>
                                            <div className={'col-sm-6'}>
                                                
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold text-white">E-mail <span className="text-danger">*</span></label>
                                            <Field
                                                style={getErrorStyles(
                                                    errors,
                                                    touched,
                                                    'email'
                                                )}
                                                type="input"
                                                name="email"
                                                placeholder="email@mail.com"
                                                value={values.email}
                                                className="form-control"
                                            />
                                            {errors.email && touched.email ? <span className="errorMsg text-danger">{errors.email}</span> : null}
                                        </div>
                                        
                                            </div>
                                            <div className={'col-sm-6'}>
                                                    
                                        <div className="form-group">
                                            <label className="form-label font-weight-bold text-white">Password <span className="text-danger">*</span></label>
                                            <Field
                                                style={getErrorStyles(
                                                    errors,
                                                    touched,
                                                    'password'
                                                )}
                                                type="input"
                                                name="password"
                                                placeholder="password"
                                                value={values.password}
                                                className="form-control"
                                            />
                                            {errors.password && touched.password ? <span className="errorMsg text-danger">{errors.password}</span> : null}
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
            email: "eve.holt@reqres.in",
            password: "cityslicka"
        }
    },
    
    handleSubmit(
        values,
        { setStatus }
    ) {
        console.log(values);
        setStatus({loader: true});
        try {
            axios.post('https://reqres.in/api/login',values)
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

export default withFormik(withFormikConfig)(Profile); 
