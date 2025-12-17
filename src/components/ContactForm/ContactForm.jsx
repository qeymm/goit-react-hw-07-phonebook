import { useState } from 'react';
import style from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handleNumberChange = e => {
    setNumber(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (name.trim() === '' || number.trim() === '') {
      return;
    }

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    dispatch(addContact(name, number));

    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={style.form_container} onSubmit={handleSubmit}>
        <label>
          <p>Name</p>
          <input
            className={style.input}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan."
            required
            value={name}
            onChange={handleNameChange}
          />
        </label>

        <label>
          <p>Number</p>
          <input
            className={style.input}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleNumberChange}
          />
        </label>

        <button className={style.submitBtn} type="submit">
          ADD CONTACT
        </button>
      </form>
    </>
  );
};
