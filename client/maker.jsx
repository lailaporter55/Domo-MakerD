//will contain all of our code for the application that shows up once the user
//has logged in
const helper = require('./helper.js');
const React = require('react'); 
const { useState, useEffect } = React; 
const { createRoot } = require('react-dom/client'); 

const handleDomo = (e, onDomoAdded) => {
    e.preventDefault(); 
    helper.hideError(); 

    const name = e.target.querySelector('#domoName').value; 
    const age = e.target.querySelector('#domoAge').value; 

    if(!name || !age){
        helper.handleError('All fields are required'); 
        return false; 
    }

    //determine level based on age
    let level;
    if (age < 5) {
        level = 1;
    } else if (age < 10) {
        level = 2;
    } else {
        level = 3;
    }

    helper.sendPost(e.target.action, { name, age, level }, onDomoAdded); 
    return false; 
}

const DomoForm = (props) => {
    return (
        <form id="domoForm"
            onSubmit={(e) => handleDomo(e, props.triggerReload)}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input id="domoAge" type="number" min="0" name="age" />
            <label htmlFor="level">Level: </label>
            <input id="domoLevel" type="number" min="1" name="level" />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />

        </form>
    );
};

//create a component to display list of Domos
//storing domos array using useState, have an effect that loads domos from server and dependecy list 
//useEffect hook has props.reloadDomos as a dependency in it’s dependency list
const DomoList = (props) => {
    const [domos, setDomos] = useState(props.domos); 

    useEffect(() => {
        const loadDomosFromServer = async () => {
            const response = await fetch('/getDomos');
            const data = await response.json(); 
            setDomos(data.domos);
        };
        loadDomosFromServer(); 
    }, [props.reloadDomos]);

    if(domos.length === 0){
        return (
            <div className="domoList">
                <h3 className="emptyDomo">No Domos Yet!</h3>
            </div>

        );
    }
    const domoNodes = domos.map(domo => {
        return (
            <div key={domo.id} className="domo">
                <img src="/assets/img/domoface.jpeg" alt="domo face" class="domoFace"/>
                <h3 className="domoName">Name: </h3>
                <h3 className="domoAge">Age: </h3>
                <h3 className="domoLevel">Level: </h3>
            </div>
        );
    });

    return (
        <div className="domoList">
            {domoNodes}
        </div>
    )
}

const App = () => {
    const [reloadDomos, setReloadDomos] = useState(false); 

    return (
        <div>
            <div id="makeDomo">
                <DomoForm triggerReload={() => setReloadDomos(!reloadDomos)} />
            </div>
            <div id="domos">
                <DomoList domos={[]} reloadDomos={reloadDomos} />
            </div>
        </div>
    );
};

const init = () => {
    const root = createRoot(document.getElementById('app'));
    root.render( <App /> );
};

window.onload = init;
