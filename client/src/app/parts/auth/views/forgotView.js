import React from 'react';
import _ from 'lodash';
import Checkit from 'checkit';
import tr from 'i18next';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import DocTitle from 'components/docTitle';


import Debug from 'debug';
let debug = new Debug("views:forgot");

export default React.createClass( {
    propTypes:{
    },
    getInitialState() {
        return {
            step: 'SendPasswordResetEmail',
            errors: {}
        };
    },

    render() {
        return (
            <div id="forgot">
                <DocTitle
                    title="Forgot password"
                />
                <Paper className='text-center view'>
                    { this.renderSendPasswordResetEmail()}
                    { this.renderCheckEmail() }
                </Paper>

            </div>
        );
    },

    renderSendPasswordResetEmail() {
        if ( this.state.step != 'SendPasswordResetEmail' ) {
            return;
        }
        let {errors} = this.state;
        return (
            <div className="">
                <h3>Forgot Password ?</h3>
                <p><strong>Enter the email address used when you registered with username and password. </strong></p>

                <p>You'll be sent a reset code to change your password.</p>

                <div className="form-inline">
                    <TextField
                        ref="email"
                        hintText={tr.t('email')}
                        errorText={errors.email && errors.email[0]}
                        />
                </div>

                <div className="btn-forgot-passord">
                    <RaisedButton onClick={ this.requestReset } label='Send Reset Email'/>
                </div>
            </div>
    );
    },
    renderCheckEmail() {
        if ( this.state.step != 'CheckEmail' ) {
            return;
        }
        return (
            <div>
                <h3>Step 2 - Check Email</h3>
                <p><strong>An email has been sent containing your reset link. Click on this link to proceed.</strong></p>

                <p>Please also check your spam folder just in case the reset email ended up there.</p>

                <p>This page can be safely closed.</p>
            </div>
        );
    },

    requestReset() {
        this.setState( {
            errors: {}
        });

        let rules = new Checkit( {
            email: [ 'email', 'required' ]
        });

        let payload = {
            email: this.email()
        }

        rules
          .run(payload)
          .then(this.props.actions.requestPasswordReset)
          .then(() => {
              this.setState( {
                  step: 'CheckEmail'
              } );
          })
          .catch(Checkit.Error, errors => {
              this.setState( {
                  errors: errors.toJSON()
              } );
          });
    },
    email() {
        return _.trim(this.refs.email.getValue());
    }
} );
