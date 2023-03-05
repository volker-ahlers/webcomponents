import Logger from './logger.js';
import Resumability from './Resumability.js';
class HFComponent extends HTMLElement {
    get TAG() {
        return 'HFComponent';
    }
    shadowRoot;
    waitForVisibility;
    setVisible;
    isVisible = false;
    static get observedAttributes() {
        return ['foo'];
    }
    debounce(func, timeoutInMs = 300) {
        Logger.trace(this.TAG, "debounce... " + func.name);
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, timeoutInMs);
        };
    }
    constructor(qualifiedName, value) {
        super();
        Logger.trace(this.TAG, 'constructor');
        this.shadowRoot = this.attachShadow({mode: 'open'});
        // initialize event handlers        
        Resumability.initialize(this.shadowRoot);
        // clone template content nodes to the shadow DOM        this.template().then(element => this.shadowRoot.innerHTML = element);
        this.render = this.debounce(this.render.bind(this), 100);
        this.waitForVisibility = new Promise((resolve) => {
            this.setVisible = () => {
                Logger.trace(this.TAG, 'isVisible is true');
                this.isVisible = true;
                resolve();
            }
        });
        this.waitForVisibility.then(() => {
            this.render(this.isVisible);
        });
    }
    IORootMargin = "0px";
    IOVisibleLimit = 0.25;
    IORemoveOnVisible = true;
    IOThresholds = [0.0, 0.25, 0.5, 0.75, 1.0];
    IODelay = 100;
    connectedCallback() {
        Logger.trace(this.TAG, 'added to DOM');
        if (!this.isVisible) {
            this.intersectionObserver = new IntersectionObserver(
                this.handleIntersectionCallback.bind(this),
                {
                    root: document.rootElement,
                    rootMargin: this.IORootMargin,
                    threshold: this.IOThresholds,
                    delay: this.IODelay                }
            );
            this.intersectionObserver.observe(this);
        }
    }
    handleIntersectionCallback(entries) {
        for (let entry of entries) {
            let ratio = Number(entry.intersectionRatio).toFixed(2);
            // ensure ratio is higher than our limit before trigger visibility            
            if (ratio >= this.IOVisibleLimit) {
                this.setVisible();
                // remove the observer if we've reached our target of being visible                
                if (this.IORemoveOnVisible) {
                    this.intersectionObserver.disconnect();
                }
            }
        }
    }
    disconnectedCallback() {
        Logger.trace(this.TAG, 'removed from DOM');
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
        }
    }
    async attributeChangedCallback(name, oldVal, newVal) {
        Logger.debug(this.TAG, 'attribute "%s" changed from "%s" to "%s"', name, oldVal, newVal);
    }
    async render() {
        Logger.trace(this.TAG, 'render');
    }
    async template() {
        // language=HTML        return `<div>HFComponent</div>`;
    }
}
window.customElements.define('hf-component', HFComponent);
export default HFComponent;