import React, { useState, useEffect } from 'react'
import { apiRequest } from '../utils/apirequest';
import ClientForm from './Clientform';

const ClientList = () => {
  const [clients, setClients] = useState([])
  const [popOpenId, setPopOpenId] = useState(false);

  useEffect(() => {
    getClients();
  }, []);

  const getClients = async () => {
    const response = await apiRequest("get", "clients");

    setClients(response.data)
  }
  function handleEdit(id) {
    setPopOpenId(id);
  }

  async function handleDelete(id) {
    await apiRequest("delete", `clients/${id}`);
    await getClients();
  }

  return (
    <div>
      <h1>Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Project</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map(client => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.lastName}</td>
                <td>{client.email}</td>
                <td>{client.mobile}</td>
                <td>{client.project}</td>
                <td><button onClick={() => handleEdit(client._id)}>Edit</button></td>
                <td><button onClick={() => handleDelete(client._id)}>Delete</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7">No data found</td>
            </tr>
          )}
        </tbody>
      </table>
      {popOpenId && (<>
        <div className='popup'>
          <div>
            <span className='close' onClick={() => setPopOpenId("")}>&times; </span>
            <ClientForm popupclient={clients.filter(client => client._id === popOpenId)?.[0]} />
          </div>
        </div>
      </>)}
    </div>
  )
}

export default ClientList