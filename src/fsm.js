class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined) throw Error();

        this.currentState = config.initial;
        this.states = config.states;

        this.initialState = config.initial;
        this.history = [];
        this.history.push(this.initialState);
        this.currentPosHis = 0;

    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.currentState;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state in this.states) {
            this.currentState = state;
            if (this.currentState !== this.history[this.history.length-1]) this.history.push(this.currentState);
            this.currentPosHis = this.history.length - 1;
        }
        else throw Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        let nextState = this.states[this.currentState].transitions[event];
        if (nextState === undefined) throw Error();
        this.currentState = nextState;
        if (this.currentState !== this.history[this.history.length-1]) this.history.push(this.currentState);
        this.currentPosHis = this.history.length - 1;
        
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.currentState = this.initialState;
        this.history.push(this.currentState);
        this.currentPosHis++;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (event === undefined) return Object.keys(this.states);
        let arr = [];

        for (const key in this.states) {
            if (this.states[key].transitions.hasOwnProperty(event)) arr.push(key);
        }

        return arr;
    }



    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        // let check = this.history[this.history.length - 2];
        let check = this.history[this.currentPosHis - 1];
        if (check === undefined) return false;
        this.currentState = check;
        this.currentPosHis--;
        return true;
        
     }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() { 
        if (this.history.length < 2) return false;
        let check = this.history[this.currentPosHis + 1];
        if (check === undefined) return false;
        this.currentState = check;
        this.currentPosHis++;
        return true;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
     }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
