import React, { useState } from 'react';
import { Input, Button, Table } from 'antd';

const { Search } = Input;

function List({ contacts, toggleFavorite, deleteContact, editContact }) {
  const [editingContact, setEditingContact] = useState(null);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredContacts = searchTerm
    ? contacts.filter(contact => contact.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : contacts;

  const handleEdit = contact => {
    setEditingContact(contact);
    setNewName(contact.name);
    setNewNumber(contact.number);
  };

  const handleSave = () => {
    if (newName.trim() === '' || newNumber.trim() === '') {
      alert('Name and number cannot be empty!');
      return;
    }
    editContact(editingContact.id, newName, newNumber);
    setEditingContact(null);
  };

  const handleCancelEdit = () => {
    setEditingContact(null);
    setNewName('');
    setNewNumber('');
  };

  const handleDelete = id => {
    deleteContact(id);
    setEditingContact(null); // Clear editing state after deleting a contact
  };

  const handleToggleFavorite = id => {
    toggleFavorite(id);
    setEditingContact(null); // Clear editing state after toggling favorite
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) =>
        editingContact && editingContact.id === record.id ? <Input value={newName} onChange={e => setNewName(e.target.value)} /> : text
    },
    {
      title: 'Number',
      dataIndex: 'number',
      key: 'number',
      render: (text, record) =>
        editingContact && editingContact.id === record.id ? <Input value={newNumber} onChange={e => setNewNumber(e.target.value)} /> : text
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) =>
        editingContact && editingContact.id === record.id ? (
          <>
            <Button onClick={handleSave}>Save</Button>
            <Button onClick={handleCancelEdit} style={{ marginLeft: 8 }}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button className="bg-[green] text-[white]" onClick={() => handleEdit(record)}>
              Edit
            </Button>
            <Button danger onClick={() => handleDelete(record.id)} style={{ marginLeft: 8 }}>
              Delete
            </Button>
            <Button
              onClick={() => handleToggleFavorite(record.id)}
              style={{
                marginLeft: 8,
                backgroundColor: record.isFavorite ? '#ffcc00' : '#f0f0f0',
                color: record.isFavorite ? '#fff' : '#000'
              }}
            >
              {record.isFavorite ? 'Unfavorite' : 'Favorite'}
            </Button>
          </>
        )
    }
  ];

  return (
    <div className="flex w-[500px] flex-col  ">
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 rounded border border-gray-300 px-3 py-2"
      />
      <Table columns={columns} dataSource={filteredContacts} bordered pagination={false} className="mt-4" />
    </div>
  );
}

export default List;
