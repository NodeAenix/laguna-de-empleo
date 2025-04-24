const removeEmptyFields = (obj) => {
    return Object.fromEntries(
        Object.entries(obj).filter(([_, v]) => {
            if (v === null || v === undefined) return false;
            if (typeof v === 'string' && v.trim() === '') return false;
            return true;
        })
    );
}

module.exports = {
    removeEmptyFields
}
