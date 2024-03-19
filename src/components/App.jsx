// App.js
import React, { useState, useEffect } from 'react';
import Contact from './contact';
import List from './list';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      setContacts(storedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    const id = uuidv4();
    const createdAt = new Date();
    setContacts([...contacts, { ...newContact, id, createdAt }]);
    setShowForm(false);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const toggleFavorite = id => {
    const updatedContacts = contacts.map(contact => (contact.id === id ? { ...contact, isFavorite: !contact.isFavorite } : contact));
    setContacts(updatedContacts);
  };

  const editContact = (id, newName, newNumber) => {
    const updatedContacts = contacts.map(contact => {
      if (contact.id === id) {
        return { ...contact, name: newName, number: newNumber };
      }
      return contact;
    });
    setContacts(updatedContacts);
  };

  return (
    <div className=" grid h-[100vh] place-items-center">
      <div className="scroll flex h-[650px] w-[650px] snap-y items-center  justify-center rounded-[12px] bg-white">
        <div className="container mx-auto flex flex-col items-center  justify-center py-4">
          <h1 className="mb-4 text-2xl font-bold">Telephone Book</h1>
          {showForm ? (
            <Contact addContact={addContact} setShowForm={setShowForm} />
          ) : (
            <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={() => setShowForm(true)}>
              Add New Contact
            </button>
          )}
          <div className="mt-8">
            <h1 className="mb-2 text-xl font-semibold">Contacts</h1>
            <List contacts={contacts} deleteContact={deleteContact} toggleFavorite={toggleFavorite} editContact={editContact} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
