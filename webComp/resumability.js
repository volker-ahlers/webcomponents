import {ucfirst} from "./string.js";
import Logger from "./logger.js";
class Resumability {
    #TAG;
    constructor() {
        this.#TAG = "Resumabilty";
        // Logger.trace(this.#TAG, "constructor");
        if (Resumability._instance) {
            return Resumability._instance;
        }
        Resumability._instance = this;
        this.initialize();
    }
    get eventNames() {
        const events = [
            'click',
            'focus',
            'input',
            'change',
            'submit',
        ];
        Logger.debug(this.#TAG, "get eventNames (%s)", events.join(', '));
        return events;
    }
    initialize(rootElement = document) {
        // Logger.trace(this.#TAG, "init");
        for (const eventName of this.eventNames) {
            rootElement.addEventListener(eventName.toString(), e => {
                if(typeof e.target.closest !== "function"){
                    return;
                }
                const target = e.target?.closest('[data-event-' + eventName + ']');
                if (target) {
                    const jsPath = target.dataset['event' + ucfirst(eventName)];
                    e.preventDefault();
                    e.stopImmediatePropagation();
                    const resumabilityEvent = {target: e.target};
                    import(jsPath).then(mod => mod.default(resumabilityEvent, e));
                }
            });
        }
    }
}
export default new Resumability();