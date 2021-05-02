const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

const SECRET = "aNAThRETheSiDevER";

exports.helloWorld = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  functions.logger.info("Hello logs!", { structuredData: true });

  const response = await admin.firestore().collection("chats").limit(10).get();
  res.json(response.docs.map(doc => doc.data()));
});

exports.addChat = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");

  const { secret } = req.body;

  if (secret !== SECRET) {
    res.status(401).json({ message: "Bad Authorization" });
    return;
  }

  const { participants } = req.body;

  if (!participants) {
    res.status(400).json({ message: "Missing arguments" });
    return;
  }

  const [p1, p2] = participants;

  if (!p1 || !p2 || p1 === "" || p2 === "") {
    res.status(400).json({ message: "Missing arguments" });
    return;
  }

  const prom1 = admin
    .firestore()
    .collection("users")
    .doc(p1)
    .get()
    .then(r => {
      !r.exists &&
        res
          .status(400)
          .json({ message: "One or more of the users does not exist" });
      return;
    });
  const prom2 = admin
    .firestore()
    .collection("users")
    .doc(p2)
    .get()
    .then(r => {
      !r.exists &&
        res
          .status(400)
          .json({ message: "One or more of the users does not exist" });
      return;
    });
  const prom3 = admin
    .firestore()
    .collection("chats")
    .doc(p1 + p2)
    .get()
    .then(r => {
      r.exists &&
        res
          .status(400)
          .json({ message: "These users already have a chat together" });
      return;
    });

  await Promise.all([prom1, prom2, prom3]);

  const chat = await admin
    .firestore()
    .collection("chats")
    .doc(p1 + p2)
    .set({
      participants: [p1, p2],
      lastMessage: "New Chat",
      lastMessageTimestamp: Date.now(),
      id: p1 + p2,
    });

  res.status(201).json({ message: "Created chat", chat });
});

exports.find = functions.https.onCall(async (data, context) => {
  context.rawRequest.header("Access-Control-Allow-Origin", "*");
  if (!context || !context.auth) return;
  const { uid } = context.auth;
  if (!uid) return;

  const currentTime = Date.now();

  const user = await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then(user => user.data())
    .then(user => ({
      id: uid,
      bio: user.bio !== "" ? user.bio : "No bio included.",
    }));

  if (!user) return;

  const allUsers = await admin
    .firestore()
    .collection("users")
    .get()
    .then(users => users.docs.map(doc => doc.data()))
    .then(users =>
      users.filter(user =>
        user.lastMatched ? currentTime - user.lastMatched <= 86400000 : true
      )
    )
    .then(users =>
      users.map(user => ({
        id: user.id,
        bio: user.bio !== "" ? user.bio : "No bio included.",
      }))
    )
    .then(users => users.filter(user => user.id !== uid));

  return { user, allUsers };
});
