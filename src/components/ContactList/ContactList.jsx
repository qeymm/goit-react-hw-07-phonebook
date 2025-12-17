import { useEffect } from 'react';
import { ContactListItem } from 'components/ContactListItem/ContactListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts, getFilter, getIsLoading, getError } from '../../redux/selectors';
import { fetchContacts } from '../../redux/operations';

const getFilteredContacts = (contacts, filter) => {
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );
};

export const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const filter = useSelector(getFilter);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContacts = getFilteredContacts(contacts, filter);

  return (
    <>
      {isLoading && <p>Loading contacts...</p>}
      {error && <p>Error: {error}</p>}
      {!isLoading && !error && (
        <ul>
          {filteredContacts.map(filteredContact => (
            <ContactListItem
              key={filteredContact.id}
              filteredContact={filteredContact}
            />
          ))}
        </ul>
      )}
    </>
  );
};

// ContactList.propTypes = {
//   filterContact: PropTypes.func.isRequired,
//   deleteContact: PropTypes.func.isRequired,
// };
