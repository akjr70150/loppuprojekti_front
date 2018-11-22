import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto} from '../../../../restpalvelu';


//Täällä haetaan yksittäiseen kouluun liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu koulunID 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen koulun ID:tä Firebasen kautta.
class KoulunToimeksiannot extends Component {
    constructor(props) {
        super(props);
        this.state = {toimeksiantodata: []};
    }

    componentDidMount() {
        this.haekaikki();
    }

    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});

        }
    }
    poistaToimeksiantoById = (e) => {
        e.preventDefault();
        poistaToimeksianto(e.target.value)
    };


//Alla olevaan mappaukseen on kovakoodattu kouluID 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn koulun ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                return <li key={toimeksiantomappi.toimeksiantoId}>
                    {toimeksiantomappi.koulu &&
                    <li>Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)} Loppuu: {aikamuutos.toLocaleTimeString("fi", optiot)}
                    </li>}
                    <button type="button"
                            value={toimeksiantomappi.toimeksiantoId}
                            onClick={this.poistaToimeksiantoById}>Poista toimeksianto ID:llä
                    </button>
                </li>
            }

        })

        return (
            <ul>
                {toimeksiantooliot}
            </ul>
        );

    }
}

export default KoulunToimeksiannot;