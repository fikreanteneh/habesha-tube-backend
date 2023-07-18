const { Timestamp, deleteDoc, doc, collection, addDoc, getDocs, query, orderBy, where, updateDoc } = require("firebase/firestore");
const {db} = require("../config/firebase");



const getSongsData = async (req, res) => {
    try {
      const docRef = collection(db, "songs")
      const fullQuery = query(docRef, orderBy("createdAt", "desc"))
      let currData = []
      const response = await getDocs(fullQuery)
      response.forEach(async (doc) => {
        currData.push({
          ...doc.data(), 
          id: doc.id, 
        })
      })
      return res.status(200).json({ currData });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };

const getSongsDataById = async (req, res) => {
  try {
    const id = req.params.id;
    const docRef = collection(db, "songs")
    const fullQuery = query(docRef, orderBy("createdAt", "desc"), where("createdBy", "==", id))
    let currData = []
    const response = await getDocs(fullQuery)
    response.forEach(async (doc) => {
      currData.push({
        ...doc.data(), 
        id: doc.id, 
      })
    })
    return res.status(200).json({ currData });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
  


const createSongs = async (req, res) => {
    try{
        const {createdBy, title, fileLocation, description, author} = req.body;
        const { email, password, fullName } = req.body;
        const songRef = collection(db, 'songs');
        const song = {
          createdBy: createdBy,
          title: title,
          fileLocation: fileLocation,
          description: description,
          author: author,
          createdAt: Timestamp.now(),
      }

        await addDoc(songRef, song);
        return res.status(200).json({ ...song });

  }catch(e){
    return res.status(500).json({ error: e.message });
  }
}


const updateSongs = async (req, res) => {
  try{
    const id = req.params.id;
    const song = doc(db, 'songs', id);
    await updateDoc(song, {title: req.body.title, description: req.body.description});
    return res.status(200).json({ message: "Song Updated successfully" });
  }catch(e){
    return res.status(500).json({ error: e.message });
  }
}


const deleteSongs = async (req, res) => {
  try {
    const id = req.params.id;
    const song = doc(db, 'songs', id);
    await deleteDoc(song);
    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (e) {
    return res.status(400).json({ error: "data not found" });
  }
};


module.exports = {createSongs, updateSongs, getSongsData, deleteSongs, getSongsDataById};