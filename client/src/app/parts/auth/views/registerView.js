import React from 'react';
import Paper from 'material-ui/lib/paper';
import DocTitle from 'components/docTitle';
import MediaSigninButtons from '../components/mediaSigninButtons';
import RegisterForm from '../components/registerForm';

export default React.createClass( {
    propTypes:{
    },

    render() {

        return (
            <div id="signup">
                <DocTitle
                    title="Register"
                />
            { this.props.register.data.success && this.renderRegisterComplete() }
                { !this.props.register.data.success && this.renderRegisterForm() }

            </div>
        );
    },
    renderRegisterComplete(){
        return(
            <div className="alert alert-info text-center" role="alert">
                A confirmation email has been sent. Click on the link to verify your email address and activate your account.
            </div>
        );
    },
    renderRegisterForm(){
        return (
            <Paper className="text-center view">
                <h2>Register An Account</h2>

                <p >Create a free account</p>

                <div>
                    <RegisterForm {...this.props}/>

                    <div className="strike"><span className="or"></span></div>
                    <div>
                        <MediaSigninButtons />
                    </div>
                </div>
            </Paper>
        );
    }
} );
