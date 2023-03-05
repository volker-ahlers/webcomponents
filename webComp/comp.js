import Logger from './logger.js';
import Resumability from './resumability.js'

const template = document.createElement('template');
template.innerHTML = `
  <style>
    div {
      margin-top: 20px;
      color: green;
    }
  </style>
  <div>
    <p>The Google search result of your name is <a target="_blank" rel="noopener">here</a></p>
  </div>
`;

class AppComp extends HTMLElement {
    constructor() {
        super();
    
        this.attachShadow({ mode: 'open' });
    
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    
        this.shadowRoot.querySelector('a').href = '';
      }
}
window.customElements.define('app-comp', AppComp);


