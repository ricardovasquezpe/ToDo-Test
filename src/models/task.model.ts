export class Task {
    public id: string;
    public name: string;
    public description: string;
    public date: number;
    public isCompleted: boolean

    constructor(id: string, name: string, description: string, date: number, isCompleted: boolean){
        this.id = id;
        this.name = name;
        this.description = description;
        this.date = date;
        this.isCompleted = isCompleted;
    }
}