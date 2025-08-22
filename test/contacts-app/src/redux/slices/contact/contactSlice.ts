import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Contact } from "../../../types/Contact";

import httpClient from '../../../api/HttpClient';

export const fetchContacts = createAsyncThunk<Contact[]> (
    "contacts/fetchAll",
    async () => {
        const response = await httpClient.get<Contact[]>("/contact");
        return response.data;
    }
);

export const createContact = createAsyncThunk<Contact, Partial<Contact>>(
    "contacts/create",
    async (contactData) => {
        const response = await httpClient.post<Contact>("/contact", contactData);
        return response.data;
    }
);

export const deleteContact = createAsyncThunk<number, number>(
    "contacts/delete",
    async (id) => {
        await httpClient.delete(`/contact/${id}`);
        return id;
    }
);


type ContactState = {
    items: Contact[],
    loading: boolean,
    error: string | null,
    creating: boolean,
    createError: string | null
}

const initialState: ContactState = {
    items: [],
    loading: false,
    error: null,
    creating: false,
    createError: null
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
                console.log("Fetching contacts...");
                return {
                ...state,
                loading: true,
                error: null
                }
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                console.log("Fetched contacts successfully.");
                return {
                    ...state,
                    loading: false,
                    items: action.payload
                }
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                console.log("Failed to fetch contacts.");
                return {
                    ...state,
                    loading: false,
                    error: action.error.message ?? 'I could not load the contact list...'
                }
            });

        builder
            .addCase(createContact.pending, (state) => {
                state.creating = true;
                state.createError = null;
            })
            .addCase(createContact.fulfilled, (state, action) => {
                state.creating = false;
                // agrega el nuevo contacto al final
                state.items.push(action.payload);
            })
            .addCase(createContact.rejected, (state, action) => {
                state.creating = false;
                state.createError = action.error.message ?? "No se pudo crear el contacto";
            });

        builder.addCase(deleteContact.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.loading = false;
            // Eliminar el contacto de la lista
            state.items = state.items.filter(contact => contact.id !== action.meta.arg);
        })
        .addCase(deleteContact.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? "No se pudo eliminar el contacto";
        });
    }
});


export const { addContact } = contactSlice.actions;
export default contactSlice.reducer;

