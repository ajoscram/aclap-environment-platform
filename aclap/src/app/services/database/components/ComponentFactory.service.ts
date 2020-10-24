import { Injectable } from '@angular/core';
import { IComponent, Component, IActivityComponent, ActivityComponent, IImageComponent, ImageComponent, IParagraphComponent, ITitleComponent, YoutubeVideoComponent, TitleComponent, ParagraphComponent } from '@src/app/models';
import { IYoutubeVideoComponent } from '@src/app/models/components/YoutubeVideoComponent.model';
import ControlModule from '@src/app/modules/control.module';

@Injectable({
    providedIn: ControlModule
})
export class ComponentFactory{
    public getComponent(iComponent: IComponent): Component{
        //THE ORDER OF THESE IF STATEMENTS MATTERS
        //SINCE THE CHECKS COULD RETURN FALSE POSITIVES
        if(iComponent == null)
            throw new Error(ComponentFactoryError.NULL_ICOMPONENT);
        if(iComponent == undefined)
            throw new Error(ComponentFactoryError.UNDEFINED_ICOMPONENT);
        if(this.checkActivity(iComponent))
            return new ActivityComponent(
                null,
                iComponent.index,
                iComponent.description,
                iComponent.estimatedMinutes,
                iComponent.tools,
                iComponent.questions
            );
        if(this.checkImage(iComponent))
            return new ImageComponent(
                null,
                iComponent.index,
                iComponent.footing,
                iComponent.reference,
                iComponent.url
            );
        if(this.checkTitle(iComponent))
            return new TitleComponent(
                null,
                iComponent.index,
                iComponent.size,
                iComponent.text
            );
        if(this.checkParagraph(iComponent))
            return new ParagraphComponent(
                null,
                iComponent.index,
                iComponent.text
            );
        if(this.checkYoutubeVideoComponent(iComponent))
            return new YoutubeVideoComponent(
                null,
                iComponent.index,
                iComponent.url
            );
        throw new Error(ComponentFactoryError.UNKNOWN_ICOMPONENT);
    }

    private checkActivity(component: IComponent): component is IActivityComponent{
        return (component as IActivityComponent).description !== undefined &&
            (component as IActivityComponent).estimatedMinutes !== undefined &&
            (component as IActivityComponent).questions !== undefined &&
            (component as IActivityComponent).tools !== undefined;
    }

    private checkImage(component: any): component is IImageComponent{
        return (component as IImageComponent).footing !== undefined &&
            (component as IImageComponent).reference !== undefined &&
            (component as IImageComponent).url !== undefined;
    }

    private checkTitle(component: IComponent): component is ITitleComponent{
        return (component as ITitleComponent).size !== undefined &&
            (component as ITitleComponent).text !== undefined;
    }

    private checkParagraph(component: IComponent): component is IParagraphComponent{
        return (component as IParagraphComponent).text !== undefined;
    }

    private checkYoutubeVideoComponent(component: IComponent): component is IYoutubeVideoComponent{
        return (component as IYoutubeVideoComponent).url !== undefined;
    }
}

export enum ComponentFactoryError{
    NULL_ICOMPONENT = "ComponentFactoryError.NULL_ICOMPONENT",
    UNDEFINED_ICOMPONENT = "ComponentFactoryError.UNDEFINED_ICOMPONENT",
    UNKNOWN_ICOMPONENT = "ComponentFactoryError.UNKNOWN_ICOMPONENT"
}