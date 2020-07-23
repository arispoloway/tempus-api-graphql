
function parseClassToEnum(c) {
    if (['soldier', 's', 'solly'].indexOf(c.toLowerCase()) > -1) {
        return 'SOLDIER'
    }
     if (['demoman', 'd', 'demo'].indexOf(c.toLowerCase()) > -1) {
        return 'DEMOMAN'
    }
}

export {
    parseClassToEnum
};
