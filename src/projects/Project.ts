export class Project {
    id: number | undefined;
    name: string = '';
    description: string = '';
    imageUrl: string = '';
    contractTypeId: number | undefined;
    contractSignedOn: Date = new Date();
    budget: number = 0;
    isActive: boolean = false;
    get isNew(): boolean {
        return this.id === undefined;
    }

    constructor(init?: any) {
        if (!init) return;
        if (init.id) this.id = init.id;
        if (init.name) this.name = init.name;
        if (init.description) this.description = init.description;
        if (init.imageUrl) this.imageUrl = init.imageUrl;
        if (init.contractTypeId) this.contractTypeId = init.contractTypeId;
        if (init.contractSignedOn) this.contractSignedOn = new Date(init.contractSignedOn);
        if (init.budget) this.budget = init.budget;
        if (init.isActive) this.isActive = init.isActive;
    }
}

