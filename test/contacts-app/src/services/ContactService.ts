import httpClient from '../api/HttpClient';
import type { Contact } from '../types/Contact';

export const getContacts = async (): Promise<Contact[]> => {
    const response = await httpClient.get<Contact[]>("/Contact");
    return response.data;
}

