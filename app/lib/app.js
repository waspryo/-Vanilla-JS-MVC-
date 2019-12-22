class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector);
        this.componentsByName = {};
    }
    addComponent(component) {
        this.componentsByName[component.name] = component;
        component.model = this.proxify(component.model)
    }
    showComponent(name) {
        this.currentComponent = this.componentsByName[name];
        
        if (this.currentComponent) {
            this.currentComponent.controller(this.currentComponent.model)
        }
        this.updateView();
    }
    updateView() {
        this.appElement.innerHTML = this.currentComponent.view(this.currentComponent.model)
    }
    proxify(model) {
        const self = this;
        return new Proxy(model, {
            set(target, property, value) {
                target[property] = value;
                self.updateView();
                return true;
            }
        })
    }
}