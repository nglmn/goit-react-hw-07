import { configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contactsSlice";
import { filtersReducer } from "./filtersSlice";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const contactsConfig = {
    key: "contactsKeyLS",
    storage,
    whitelist: ["contacts"]
}

export const store = configureStore({
    reducer: {
        contacts: persistReducer(contactsConfig, contactsReducer),
        filters: filtersReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store);