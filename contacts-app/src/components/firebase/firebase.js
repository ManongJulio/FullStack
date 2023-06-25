import react, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    addDoc,
    deleteDoc, doc,
    query, where, updateDoc, orderBy, limit, startAfter, startAt, limitToLast,getCountFromServer, endAt
} from 'firebase/firestore';
import { Field } from 'formik';

//didnt put this in .env since this is not for production.
const firebaseConfig = {
    apiKey: "AIzaSyAjD9u3UD_ZJdgYmkpUopgpSKDrQJrAx9Q",
    authDomain: "deltek-7cfbb.firebaseapp.com",
    projectId: "deltek-7cfbb",
    storageBucket: "deltek-7cfbb.appspot.com",
    messagingSenderId: "772436245687",
    appId: "1:772436245687:web:e2d37465bb2736ec49a132",
    measurementId: "G-4DW4JVM2JZ"
};
initializeApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, 'contact');
//didnt put this in .env.dev since this is not for production.


//fetchData function not used, for future
export const fetchData = (filter) => {
    const q = query(colRef, orderBy("name"), limit(filter.page));
    return getDocs(q).then((snapshot) => {
        let contacts = [];
        snapshot.docs.forEach((doc) => {
            contacts.push({
                ...doc.data(),
                id: doc.id
            });
        });
        return contacts;
    }).catch(err => { console.log(err) })
}
export const addData = (values) => {
    return addDoc(colRef, {
        email: values.email,
        contact: values.contact,
        name: values.name,
        address: values.address,
        starred: 0
    }).then((response) => {
        return true;
    }).catch(err => {
        return false;
    })
}
export const deleteData = (docId) => {
    const docRef = doc(db, 'contact', docId);
    return deleteDoc(docRef)
        .then((response) => {
            return true;
        })
        .catch(err => {
            console.log(err);
            return false
        })
}
export const updateData = (values) => {
    return updateDoc(doc(db, 'contact', values.id), {
        email: values.email,
        contact: values.contact,
        name: values.name,
        address: values.address,
        starred: values.starred
    }).then((res) => {
        return true;
    }).catch(err => {
        console.log(err)
        return false
    })
}
export const filterData = (filter) => {
    if (filter.starred == 2) {
        const q = query(colRef, orderBy(filter.field, filter.sortDirection), limit(filter.page));
        return getDocs(q).then((snapshot) => {
            let contacts = [];
            snapshot.docs.forEach((doc) => {
                contacts.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            return contacts;
        }).catch(err => { console.log(err) })
    } else {
        const q = query(colRef, orderBy(filter.field, filter.sortDirection), limit(filter.page), where("starred", "==", filter.starred));
        return getDocs(q).then((snapshot) => {
            let contacts = [];
            snapshot.docs.forEach((doc) => {
                contacts.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            return contacts;
        }).catch(err => { console.log(err) })
    }
}
export const filterDataByName = (filter) => {
    const q = query(colRef, orderBy(filter.field, filter.sortDirection), startAt(filter.query), endAt(filter.query + '\uf8ff'));
    return getDocs(q).then((snapshot) => {
        let contacts = [];
        snapshot.docs.forEach((doc) => {
            contacts.push({
                ...doc.data(),
                id: doc.id
            });
        });
        return contacts;
    }).catch(err => { console.log(err) })
}
export const paginate = (filter) => {
    
    if (filter.currentPage == 1) {
        const q = query(colRef, orderBy(filter.field, filter.sortDirection), limit(filter.page));
        return getDocs(q).then((snapshot) => {
            let contacts = [];
            snapshot.docs.forEach((doc) => {
                contacts.push({
                    ...doc.data(),
                    id: doc.id
                });
            });
            return contacts;
        }).catch(err => { console.log(err) })
    } else {
        const q = query(colRef, orderBy(filter.field, filter.sortDirection), limit(filter.page));
        var first = query(colRef, orderBy(filter.field, filter.sortDirection), limit(filter.page))
        return getDocs(first).then((documentSnapshots) => {
            // Get the last visible document
            var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];

            // Construct a new query starting at this document,
            // get the next 25 cities.
            var next = query(colRef, orderBy(filter.field, filter.sortDirection), startAfter(lastVisible), limit(filter.page));
            return getDocs(next).then((documentSnapshots) => {
                let contacts = [];
                documentSnapshots.docs.forEach((doc) => {
                    contacts.push({
                        ...doc.data(),
                        id: doc.id
                    });
                });
                return contacts
            })
        });
    }
}
export const countRows = () => {
    const q = query(colRef);
    const snapshot = getCountFromServer(q);
    return snapshot;
}