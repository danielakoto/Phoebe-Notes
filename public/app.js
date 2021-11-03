///// User Authentication /////

const auth = firebase.auth();

const whenSignedIn = document.getElementById('whenSignedIn');
const whenSignedOut = document.getElementById('whenSignedOut');

const signInBtn = document.getElementById('signInBtn');
const signOutBtn = document.getElementById('signOutBtn');

const userDetails = document.getElementById('userDetails');

const section = document.getElementById('section');

const provider = new firebase.auth.GoogleAuthProvider();

/// Sign in event handlers

signInBtn.onclick = () => auth.signInWithPopup(provider);

signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if (user) {
        // signed in
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `<h4 class="username">${user.displayName.toUpperCase()}</h4> <p hidden="true">User ID: ${user.uid}</p>`;
        section.hidden = false;
    } else {
        // not signed in
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = '';
        section.hidden = true;
    }
});



///// Firestore /////

const db = firebase.firestore();

const storyRef = db.collection('user');

const createThing = document.getElementById('createThing');
const thingsList = document.getElementById('thingsList');


        


let thingsRef;
let unsubscribe;

auth.onAuthStateChanged(user => {
    
    if (user) {
        //show notes options
        const thenote = document.getElementById('thenote');
        const clear = document.getElementById('clear');
        
        clear.onclick = () => {
            console.log('clicked clear');
            var userquery = db.collection('user').where('uid', '==', user.uid);
            userquery.get().then(function(querySnapshot) {
                querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                })
            })
        }
        // Database Reference
        thingsRef = db.collection('user')
        createThing.onclick = () => {
            const { serverTimestamp } = firebase.firestore.FieldValue;
            let title = document.getElementById('thetitle').value;
            let note = document.getElementById('thenote').value;
            
            thingsRef.add({
                title: title,
                note: note,
                time: serverTimestamp(),
                uid: user.uid
            });
        }
        
        
        // Query
        unsubscribe = thingsRef
            .where('uid', '==', user.uid)
            .orderBy('time') // Requires a query
            .onSnapshot(querySnapshot => {
                
                // Map results to an array of li elements

                const items = querySnapshot.docs.map(doc => {

                    return `<li style="padding:10px; border-radius:5px;">
                                <p id="thetime" hidden='true'>${doc.data().time}</p>
                                <p id="vtitle">${doc.data().title}</p>
                                <p id="vvalue">${doc.data().note}</p>
                            </li>`
                        
                });
                thingsList.innerHTML = items.join('');
                let title = document.getElementById('thetitle');
                let note = document.getElementById('thenote');
                title.value = '';
                note.value = '';
            });

    } else {
        // Unsubscribe when the user signs out
        unsubscribe && unsubscribe();
    }
});