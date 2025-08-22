import type { Contact } from "../../../types/Contact";
import type { RootState } from "../../store";

// selectors
export const selectContacts = (s: RootState) : Contact[] => s.contacts.items;
export const selectContactsLoading = (s: RootState ) : boolean => s.contacts.loading;
export const selectContactError = (s: RootState) : string | null => s.contacts.error
