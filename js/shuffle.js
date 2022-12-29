function shuffleArray(array) {
    let ret = array.slice()
    for (let i = ret.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [ret[i], ret[j]] = [ret[j], ret[i]];
    }
    return ret;
}