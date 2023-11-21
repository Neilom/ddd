import Address from "./value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active = false;
    private _rewardPoints = 0;

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    set Address(address: Address) {
        this._address = address;
    }

    get Address() {
        return this._address
    }

    validate() {
        if (!this._id) {
            throw new Error('Id is required')
        }

        if (!this._name) {
            throw new Error('Name is required')
        }
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive() {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

}