const { Timestamp, deleteDoc, doc, setDoc } = require("firebase/firestore");


const getSongsData = async (req, response) => {
    try {
      const songs = doc(db, 'songs');
      const songsSnap = await songs.get();
      const songsData = songsSnap.data();
      return response.status(200).json({ songsData });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  };
  


const createSongs = async (req, res) => {
    try{
        const {createdBy, title, fileLocation, description, author} = req.body;
        const { email, password, fullName } = req.body;
        const song = doc(db, 'songs');
        await setDoc(song, {
            createdBy: createdBy,
            title: title,
            fileLocation: fileLocation,
            description: description,
            author: author,
            createdAt: Timestamp.now(),
        });
        return res.status(200).json({ message: "User created successfully" });

  }catch(e){
    return res.status(500).json({ error: e.message });
  }
}


const updateSongs = async (req, res) => {
  try{
    const id = req.params.id;
    const song = doc(db, 'songs', id);
    await setDoc(song, req.body);
    return res.status(200).json({ message: "Song created successfully" });
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


module.exports = {createSongs, updateSongs, getSongsData, deleteSongs};