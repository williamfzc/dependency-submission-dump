function dsdHandler(snapshot) {
    console.log("rece: " + JSON.stringify(snapshot))
}

module.exports = {
    dsdHandler: dsdHandler
};