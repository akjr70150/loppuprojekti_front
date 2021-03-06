import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {compose} from 'recompose';
// import { SignUpLink } from '../SignUp';
// import { PasswordForgetLink } from '../PasswordForget';
import {withFirebase} from '../Firebase';
import {Button} from "react-bootstrap";
import MDspinner from "react-md-spinner";

const SignInPage = () => (
    <div>
        <h1><strong>Kirjaudu sisään</strong></h1>
        <br/>
        <SignInForm/>
        {/* Alla olevat lisätään kun ehtii */}
        {/* <PasswordForgetLink />
    <SignUpLink /> */}
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    showME: true
};


class SignInFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({...INITIAL_STATE});
                // Kun kirjautuminen ok, siirrytään alla olevaan osoitteeseen
                this.props.history.push('/sijainen');
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 0)
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    render() {
        const {email, password, error} = this.state;

        const isInvalid = password === '' || email === '';

        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner singleColor="#e42226"/></div>
                :
                <form onSubmit={this.onSubmit}>
                    <input
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Sähköposti"
                    />
                    &nbsp;
                    <input
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="Salasana"
                    /><br/><br/>
                    &nbsp;
                    <Button disabled={isInvalid} type="submit">
                        Kirjaudu sisään
                    </Button>

                    {error && <p>{error.message}</p>}
                </form>
            }
            </div>
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm};