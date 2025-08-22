import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../../../types/Contact";
import { getContacts } from "../../../services/ContactService";
import { type RootState } from '../../store';

export const fetchContacts = createAsyncThunk<Contact[]> (
    "contacts/fetchAll",
    async () => {
        return getContacts();
    }
);

type ContactState = {
    items: Contact[],
    loading: boolean,
    error: string | null;
}

const initialState: ContactState = {
    items: [],
    loading: false,
    error: null
}



const contactSlice = createSlice ({
    name: "contacts",
    initialState,
    reducers: {
        addContact(state, action: PayloadAction<Contact>) {
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchContacts.pending, state => {
                return {
                ...state,
                loading: true,
                error: null
                }
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                }
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                return {
                    ...state,
                    loading: false,
                    error: action.error.message ?? 'I could not load the contact list...'
                }
            })
    }
});


export const { addContact } = contactSlice.actions;

// selectors
export const selectContacts = (s: RootState) => s.contacts;
export const selectContactsLoading = (s: RootState ) => s.contacts.items;
export const selectContactError = (s: RootState) => s.contacts.error

export default contactSlice.reducer;

