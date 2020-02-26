module.exports = function (str) {
    let arr = str.split("#");
    let tags = [];
    for(let i = 0; i < arr.length; i++) {
        if(arr[i].trim() !== '') {
            tags.push(arr[i].trim());
        }
    }
    return tags;
}