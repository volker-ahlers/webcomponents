export class Logger {
    constructor(){
        
    }
    debug(text) {
        console.log(text);
    }
    trace(tag, text) {}
}
export default new Logger();