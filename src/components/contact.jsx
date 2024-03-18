import React, { useState } from 'react';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

function Contact({ addContact }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addContact({ name, number: number });
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm">
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block font-bold text-gray-700">
          Name:
        </label>
        <input
          type="text"
          id="name"
          clas
          value={name}
          onChange={e => setName(e.target.value)}
          required
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="number" className="mb-2 block font-bold text-gray-700">
          Number:
        </label>
        <PhoneInput
          defaultCountry="uz"
          inputExtraProps={{
            required: true,
            className: 'appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          }}
          countryCodeEditable={false}
          value={number}
          onChange={setNumber}
        />
      </div>
      <button
        type="submit"
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
      >
        Add Contact
      </button>
    </form>
  );
}

export default Contact;
