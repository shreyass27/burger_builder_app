import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.scss';
import { connect } from 'react-redux';
import { auth } from '../../store/actions/auth';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email address*'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter you password*'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignUp: false
    }

    loginHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    handleSignInSwitch = () => {
        this.setState( prevstate => ({
            isSignUp: !prevstate.isSignUp
        }));
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedAuthForm = {
            ...this.state.controls
        };
        const updatedFormElement = { 
            ...updatedAuthForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedAuthForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedAuthForm) {
            formIsValid = updatedAuthForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedAuthForm, formIsValid: formIsValid});
    }


    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        
        let form = formElementsArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ));
        return (
            <div className={classes.Auth} >
                <h2>SIGN {this.state.isSignUp ? 'UP' : 'IN'}</h2>
                <form onSubmit={this.loginHandler}>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                    <Button btnType="Danger" clicked={this.handleSignInSwitch} >SWITCH TO SIGN {
                        this.state.isSignUp ? 'IN' : 'UP'
                    }</Button>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => ({
    onAuth: (email, passowrd, isSignUp) => dispatch(auth(email, passowrd, isSignUp)),
});

export default connect(undefined, mapDispatchToProps)(Auth);