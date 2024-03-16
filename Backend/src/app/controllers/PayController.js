
const payController = {
  addAdress: async (req, res) => {
    const {idUser} = req.body
    console.log(idUser);
  },
};

module.exports = payController;
