'use strict';

class Menu {
    constructor(screenElement) {
        this.screenElement = screenElement;
        this.menuDiv = new ElementCreator('div', { 'class': 'menu-screen show' });
        this.menuForm = new ElementCreator('form', { 'id': 'menu' });
        this.menuMessage = new ElementCreator('div', { 'class': 'menu-msg' }, ['Options'])
        this.menuDiv.createdElement.appendChild(this.menuMessage.createdElement)
        this.menuDiv.createdElement.appendChild(this.menuForm.createdElement);
        this.screenElement.appendChild(this.menuDiv.createdElement);
    }

    buildSelect(selectName, labelText, arrOfOptions, defaultValue = arrOfOptions[0]) {
        this.selectLabel = new ElementCreator('label', { 'for': selectName }, [labelText])
        this.selectEle = new ElementCreator('select', { 'id': selectName});
        for (let i = 0; i < arrOfOptions.length; i++) {
            this.selectEle.createChild('option', { 'value': arrOfOptions[i] }, arrOfOptions[i]);
        }
        this.menuForm.createdElement.appendChild(this.selectLabel.createdElement);
        this.menuForm.createdElement.appendChild(this.selectEle.createdElement);
    }

    buildButton(objOfButtonAttributes, buttonText) {
        this.buttonEle = new ElementCreator('button', objOfButtonAttributes, buttonText)
        this.menuForm.createdElement.appendChild(this.buttonEle.createdElement)
    }

    get createdElement() {
        return this.menuDiv.createdElement
    }
}

// takes element name, an object it uses to create attributes, and an array of inner text
class ElementCreator {
    constructor(newEle, objOfEleAttributes, eleText) {
        this.newEle = document.createElement(newEle)
        this.attributeSettor(this.newEle, objOfEleAttributes, eleText)

    }

    createChild(newChild, objOfChildAttributes, childText) {
        this.newChild = document.createElement(newChild)
        this.attributeSettor(this.newChild, objOfChildAttributes, childText)
        this.newEle.appendChild(this.newChild);
    }

    attributeSettor(targetElement, objOfAttributes, setText) {
        for (let keys in objOfAttributes) {
            targetElement.setAttribute(keys, objOfAttributes[keys])
        }
        if (setText) {
            targetElement.innerText = setText
        }
    }

    get createdElement() {
        return this.newEle
    }
}

