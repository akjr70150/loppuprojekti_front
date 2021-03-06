import React from 'react';
import './index.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import SijainenNakyma from './komponentit/sijainenNakyma/SijainenNakyma';
import Etusivu from './komponentit/Etusivu';
import SijainenLogin from './komponentit/login/sijainen/SijainenLogin';
import KouluLogin from './komponentit/login/koulu/KouluLogin';
import Rekisterointi from './komponentit/login/rekisterointi/Rekisterointi';
import KaikkiToimeksiannot from './komponentit/sijainenNakyma/valikko/KaikkiToimeksiannot';
import KoulunTiedot from './komponentit/kouluNakyma/koulu/KoulunTiedot';
import SijaisenTiedot from './komponentit/sijainenNakyma/valikko/SijaisenTiedot';
import SijaisenTietojenMuokkaus from './komponentit/sijainenNakyma/valikko/SijaisenTietojenMuokkaus';
import KoulunTietojenMuokkaus from './komponentit/kouluNakyma/koulu/KoulunTietojenMuokkaus';
import KoulunToimeksiannot from './komponentit/kouluNakyma/koulu/KoulunToimeksiannot';
import SijaisenToimeksiannot from './komponentit/sijainenNakyma/valikko/SijaisenToimeksiannot';
import SivuaEiLoytynyt from './komponentit/SivuaEiLoytynyt';
import Lomake from './komponentit/kouluNakyma/koulu/Lomake';
import KouluNakyma from './komponentit/kouluNakyma/KouluNakyma';
import MuokkaaToimeksiantoa from "./komponentit/kouluNakyma/koulu/MuokkaaToimeksiantoa";
import {withAuthentication} from './komponentit/firebase/Session';
import VahvistaToimeksianto from './komponentit/kouluNakyma/koulu/VahvistaToimeksianto';
import ToimeksiannonVaraus from './komponentit/sijainenNakyma/valikko/ToimeksiannonVaraus';
// import SignInPage from './komponentit/firebase/SignIn';

const App = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={Etusivu}></Route>
            <Route exact path='/sijainenlogin' component={SijainenLogin}></Route>
            <Route path='/sijainen' component={SijainenNakyma}></Route>
            <Route exact path='/koululogin' component={KouluLogin}></Route>
            <Route exact path='/rekisterointi' component={Rekisterointi}></Route>
            
            {/* Alla olevat sivut ovat suojattuja (autentikoinnin takana) */}
            <Route exact path='/toimeksiannot' component={KaikkiToimeksiannot}></Route>
            <Route path='/koulunakyma' component={KouluNakyma}></Route>
            <Route exact path='/kouluntiedot' component={KoulunTiedot}></Route>
            <Route exact path='/koulunakyma' component={KouluNakyma}></Route>
            <Route exact path='/sijaisentiedot' component={SijaisenTiedot}></Route>
            <Route path='/sijaisenomientietojenmuokkaus/:id' component={SijaisenTietojenMuokkaus}></Route>
            <Route path='/koulunomientietojenmuokkaus/:id' component={KoulunTietojenMuokkaus}></Route>
            <Route exact path='/koulunomattoimeksiannot' component={KoulunToimeksiannot}></Route>
            <Route exact path='/sijaisenomattoimeksiannot' component={SijaisenToimeksiannot}></Route>
            <Route exact path='/lomake' component={Lomake}></Route>
            <Route path='/muokkaalomake/:id' component={MuokkaaToimeksiantoa}></Route>
            <Route path='/vahvistatoimeksianto/:id' component={VahvistaToimeksianto}></Route>
            <Route path='/toimeksiannonvaraus/:id' component={ToimeksiannonVaraus}/>
           
           {/* Not found -sivu ei ole suojattu: */}
            <Route component={SivuaEiLoytynyt} />
            {/* HUOM.!!!!!!!!!!! Kun lisäät uuden reitityksen, muista salaus kyseiseen komponenttiin. */}
        </Switch>
    </BrowserRouter>    
  );
  
  export default withAuthentication(App);

