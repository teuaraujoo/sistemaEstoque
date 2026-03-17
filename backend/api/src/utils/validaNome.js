exports.validaNome = function(nome) {
    if (typeof nome !== 'string') {
        return false;
    }

    return true;
}