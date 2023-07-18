const { doc, setDoc, getDoc } = require( "firebase/firestore")
const {db} = require("../config/firebase");


const signUp = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;
    const user = doc(db, 'users', email);
    if ((await getDoc(user)).data()) {
      return res.status(400).json({ error: "User already exists" });
    }
    await setDoc(user,req.body);
    return res.status(200).json({ email: email, fullName: fullName});
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userRef = doc(db, "users", email)
    const user = (await getDoc(userRef)).data()
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    return res.status(200).json({email: user.email, fullName: user.fullName})

  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // const { email, password } = req.body;
    // const user = await signInWithEmailAndPassword(auth, email, password)
    // const token = await user.user.getIdToken()
    // return res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Error Changing password" });
  }
};

const deleteAccount = (req, res) => {
  try {

  } catch (error) {
    res.status(500).json({ error: "Error canceling appointment" });
  }
};

module.exports = {
  signIn,
  signUp,
  changePassword,
  deleteAccount,
};
