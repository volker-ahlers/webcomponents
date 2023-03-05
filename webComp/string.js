export {
    ucfirst,
    htmlToElement,
    stringToBoolean
};

const ucfirst = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
};

const htmlToElement = (string) => {
    const template = document.createElement('template');
    string = string.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = string;
    return template.content.firstChild;
};

const stringToBoolean = (string) => {
    alert(string);
    return stringn.toLowerCase()=== true ? true : false;
};