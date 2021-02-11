import { IDiscipline, Discipline } from "../Discipline.model";
import { IImplementable, Implementable } from "./Implementable.model";

export interface IModule extends IImplementable{
    recommendedAge: string,
    antecedents: string,
    disciplines: IDiscipline[]
}

export class Module extends Implementable{
    constructor(
        public id: string,
        public name: string,
        public color: string,
        public imageUrl: string,
        public bannerImageUrl: string,
        public publisherId: string,
        public publisherName: string,
        public publisherLastname: string,
        public recommendedAge: string,
        public objective: string,
        public antecedents: string,
        public disciplines: Discipline[]
    ){
        super(
            id,
            name,
            color,
            imageUrl,
            bannerImageUrl,
            publisherId,
            publisherName,
            publisherLastname,
            objective
        )
    }

    public static check(object: any): object is IModule{
        const module: IModule = <IModule>object;
        return super.check(object) &&
            module.recommendedAge !== undefined &&
            module.antecedents !== undefined &&
            module.disciplines !== undefined;
    }
}