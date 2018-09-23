import React from 'react';

export class GitHub {
    count;
    constructor() {
        count = 0;
    }
    up(){
        console.log("before: "+this.count);
        this.count=1;
        console.log("after: "+this.count);
    }
    static upCounter() {
        this.setState({
            count: this.state.count + 1
        });
        console.log("upped count");
        return this.state.count;
    }

}

export const printHelp = () => {
    console.log("HELPS");
}

