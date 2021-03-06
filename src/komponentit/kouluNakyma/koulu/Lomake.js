import React, {Component} from 'react';
import {lahetaToimeksianto} from "../../../restpalvelu";
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import withAuthorization from "../../firebase/Session/withAuthorization";
import './Lomake.css';
import MDspinner from "react-md-spinner";
import Substidudes2 from "../../substidudes2.png";

//Täällä koulu pystyy lisäämään uuden toimeksiannon. Tällä hetkellä kovakoodattu kouluID 1.
class Lomake extends Component {
    state = {
        toimeksiantoId: '',
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1,
        vahvistus: false,
        showME: true,
        toimeksiantoLuotu: false
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 0)
    }

    lahetaLomake = () => {

        lahetaToimeksianto(this.state);
        this.setState({toimeksiantoLuotu: true});
        this.props.history.push('/koulunakyma/');
    };
    peruuta = (e) => {
        this.props.history.push('/koulunakyma/' + e.target.value);
    };

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner singleColor="#e42226"/></div>
                :

                <div>
                    <br/>
                    <div className="logo">
                        <a href='/'>
                            <img src={Substidudes2} alt="Substidudes-logo"/></a><br/><br/><br/><br/><br/><br/>
                    </div>
                    <Col id="lomakeCol">
                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Toimeksiannon alkuaika:
                            </Col>
                            <Col sm={3}>
                                <FormControl
                                    type="datetime-local"
                                    placeholder=""
                                    value={this.state.toimeksiantoAlkuaika}
                                    onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>

                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Toimeksiannon loppuaika:
                            </Col>
                            <Col sm={3}>
                                <FormControl
                                    type="datetime-local"
                                    placeholder=""
                                    value={this.state.toimeksiantoLoppuaika}
                                    onChange={this.handlaatoimeksiantoLoppuaika}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Oppiaine:
                            </Col>
                            <Col sm={3}>
                                <FormControl
                                    type="text" placeholder=""
                                    value={this.state.oppiaine}
                                    onChange={this.handlaaoppiaine}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>
                    </Col>
                    <br/>
                    <Button id="submit-btn" onClick={this.lahetaLomake}>Luo</Button>
                    <Button onClick={this.peruuta}>Peruuta</Button>
                </div>
            }
            </div>
        );
    }

    handlaaKouluNimi = (e) => {
        this.setState({kouluNimi: e.target.value});
    };
    handlaaKouluOsoite = (e) => {
        this.setState({kouluOsoite: e.target.value});
    };
    handlaaKouluYhteyshenkilo = (e) => {
        this.setState({kouluYhteyshenkilo: e.target.value});
    };
    handlaatoimeksiantoAlkuaika = (e) => {
        this.setState({toimeksiantoAlkuaika: e.target.value});
    };
    handlaatoimeksiantoLoppuaika = (e) => {
        this.setState({toimeksiantoLoppuaika: e.target.value});
    };
    handlaaoppiaine = (e) => {
        this.setState({oppiaine: e.target.value});
    };
    handlaaPoistoByToimeksiantoId = (e) => {
        this.setState({toimeksiantoId: e.target.value})
    };
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Lomake);