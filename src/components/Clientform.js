import React, { useEffect, useState } from 'react';
import { apiRequest } from '../utils/apirequest';
function ClientForm({popupclient}) {
  
    const [client, setClient] = useState({
        name: '',
        lastName: '',
        email: '',
        mobile: '',
        project: ''
    });


    useEffect(() => {
        if(popupclient){
            setClient(popupclient)
        }
    },[popupclient])

  
    const saveClient = async () => {
        await apiRequest('post',"clients",client)
        window.location.reload()
    }

    const editClient = async() => {
        await apiRequest('put', `clients/${popupclient._id}`, client)
        window.location.reload();
    }

    return (
        <div className='form-wrapper'>
            <input className='inputText' type="text" placeholder="Name" value={client.name} onChange={(e) => setClient({...client, name: e.target.value})} />

            <input className='inputText' type="text" placeholder="Last Name" value={client.lastName} onChange={(e) => setClient({...client, lastName: e.target.value})} />

            <input className='inputText' type="email" placeholder="Email" value={client.email} onChange={(e) => setClient({...client, email: e.target.value})} />

            <input className='inputText' type="number" placeholder="Mobile" value={client.mobile} onChange={(e) => setClient({...client, mobile: e.target.value})} />

            <input className='inputText' type="text" placeholder="Project" value={client.project} onChange={(e) => setClient({...client, project: e.target.value})} />
            
            <button onClick={popupclient ? editClient: saveClient}>{popupclient ? "Edit" : "Save"}</button>
        </div>
    );
}

export default ClientForm;