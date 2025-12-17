import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// IMPORTANT: Replace this URL with your mockapi.io endpoint
// After signing up at mockapi.io and creating a 'contacts' resource,
// you'll get an endpoint like: 'https://YOUR_USERNAME.mockapi.io/api/v1/contacts'
// or: 'https://YOUR_USERNAME.mockapi.io/contacts'
// Update the API_URL below with your actual endpoint
const API_URL = 'https://6942443f686bc3ca816913a0.mockapi.io/api/qeym/contacts';

// Fetch all contacts
export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Add a new contact
export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (contact, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, contact);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Delete a contact
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (contactId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${contactId}`);
      return contactId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
