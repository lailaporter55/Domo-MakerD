const helper = require('./helper.js'); 
const React = require('react'); 
const { useState, useEffect } = React; 
const {createRoot} = require('react-dom/client'); 

const PartyForm = (props) => {
    return (
        <form id="partyForm"
            onSubmit={(e) => handleParty(e, props.triggerReload)}
            name="partyForm"
            action="/createParty"
            method="POST"
            className="partyForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="partyName" type="text" name="name" placeholder="Party Name" />
            <label htmlFor="time">Time: </label>
            <input id="partyTime" type="text" name="time" placeholder="Party Time" />
            <label htmlFor="attendees">Attendees: </label>
            <input id="partyAttendees" type="number" min="1" name="attendees" />
            <input className="makePartySubmit" type="submit" value="Create Party" />

        </form>
    ); 
}; 

const handleParty = (e, onPartyAdded) => {
    e.preventDefault(); 
    helper.hideError(); 

    const name = e.target.querySelector('#partyName').value; 
    const time = e.target.querySelector('#partyTime').value; 
    const attendees = e.target.querySelector('#partyAttendees').value; 

    if(!name || !time || !attendees){
        helper.handleError('All fields are required'); 
        return false; 
    }

    helper.sendPost(e.target.action, { name, time, attendees }, onPartyAdded); 
    return false; 
}; 

const PartyList = (props) => {
    const [domos, createParty] = useState(props.parties); 

    useEffect(() => {
        const loadPartiesFromServer = async () => {
            const response = await fetch('/getParties');
            const data = await response.json(); 
            createParty(data.domos);
        };
        loadPartiesFromServer(); 
    }, [props.reloadParty]);

    if(domos.length === 0){
        return (
            <div className="partyList">
                <h3 className="emptyParty">No Party Yet!</h3>
            </div>

        );
    }
    const partyNodes = parties.map(party => {
        return (
            <div key={party.id} className="party">
                <img src="/assets/img/mahjongParty.jpg" alt="mahjong party" class="mahjongParty"/>
                <h3 className="partyName">Name: </h3>
                <h3 className="partyTime">Time: </h3>
                <h3 className="partyAttendees">Attendees: </h3>
                <h3 className="partyPrice">Price: </h3>
            </div>
        );
    });

    return (
        <div className="partyList">
            {partyNodes}
        </div>
    )
}; 

const App = () => {
    const [reloadParty, setReloadParty] = useState(false); 

    return (
        <div>
        <div id="createParty">
            <PartyForm triggerReload={() => setReloadParty(!reloadParty)} />
        </div>
        <div id="parties">
            <PartyList parties={[]} reloadParty={reloadParty} />
        </div>
    </div>
);
}; 

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App /> );
}; 

window.onload = init;