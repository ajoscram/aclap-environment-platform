import { ActivitySection, Administrator, DisciplineMetadata, Educator, IActivitySection, IAdministrator, IDisciplineMetadata, IEducator, IImageSection, ImageSection, IModule, IParagraphSection, ISection, ITitleSection, IUser, IYoutubeVideoSection, Module, ParagraphSection, TitleSection, TitleSectionSize, YoutubeVideoSection, File, IFile, Event, IEvent, IEducatorRequest, Implementation, IImplementation, Score, EducatorRequest, EducatorRequestState, IQuestion, IAnswer, Answer, Question, IAlly, Ally } from "../../../models";
import { Factory, FactoryError } from './Factory.service';

interface IUnknownUser extends IUser{}
interface IUnknownSection extends ISection{}

describe('Factory', () => {
    const STUB_ID: string = 'id';
    const STUB_DATE: Date = new Date();

    const STUB_DISCIPLINE_METADATA: IDisciplineMetadata = {
        subjects: [
            { name: 'subject1', color: 'color1'},
            { name: 'subject2', color: 'color2'},
            { name: 'subject3', color: 'color3'}
        ],
        years: ['1', '2', '3']
    };

    const STUB_EDUCATOR_REQUEST: IEducatorRequest = {
        name: 'STUB_EDUCATOR_REQUEST.name',
        lastname: 'STUB_EDUCATOR_REQUEST.lastname',
        email: 'STUB_EDUCATOR_REQUEST.email',
        phone: 'STUB_EDUCATOR_REQUEST.phone',
        birthday: new Date(),
        organization: 'STUB_EDUCATOR_REQUEST.organization',
        address: {
            name: 'STUB_EDUCATOR_REQUEST.address.name',
            latitude: 0,
            longitude: 0
        }
    }

    const STUB_EDUCATOR: IEducator = {
        imageUrl: 'STUB_EDUCATOR.imageUrl',
        name: 'STUB_EDUCATOR.name',
        lastname: 'STUB_EDUCATOR.lastname',
        email: 'STUB_EDUCATOR.email',
        phone: 'STUB_EDUCATOR.phone',
        birthday: new Date(),
        organization: 'STUB_EDUCATOR.organization',
        address: {
            name: 'STUB_EDUCATOR.address.name',
            latitude: 0,
            longitude: 0
        },
        joined: new Date()
    };

    const STUB_ADMINISTRATOR: IAdministrator = {
        imageUrl: 'STUB_ADMINISTRATOR.imageUrl',
        name: 'STUB_ADMINISTRATOR.name',
        lastname: 'STUB_ADMINISTRATOR.lastname',
        email: 'STUB_ADMINISTRATOR.email'
    };

    const STUB_MODULE: IModule = {
        name: 'STUB_MODULE.name',
        color: 'STUB_MODULE.#Ef6423',
        imageUrl: 'STUB_MODULE.imageUrl',
        bannerImageUrl: 'STUB_MODULE.bannerImageUrl',
        publisherId: 'STUB_MODULE.publisherId',
        publisherName: 'STUB_MODULE.publisherName',
        publisherLastname: 'STUB_MODULE.publisherLastname',
        recommendedAge: '7',
        objective: 'STUB_MODULE.objective',
        antecedents: 'STUB_MODULE.antecedents',
        disciplines: [
            {
                year: 'year',
                theme: 'theme',
                subject: {
                    name: 'subject',
                    color: 'color'
                },
            }
        ]
    };

    const STUB_EVENT: IEvent = {
        name: 'STUB_EVENT.name',
        color: 'STUB_EVENT.#Ef6423',
        imageUrl: 'STUB_EVENT.imageUrl',
        bannerImageUrl: 'STUB_EVENT.bannerImageUrl',
        publisherId: 'STUB_EVENT.publisherId',
        publisherName: 'STUB_EVENT.publisherName',
        publisherLastname: 'STUB_EVENT.publisherLastname',
        objective: 'STUB_EVENT.objective',
        date: new Date()
    };

    const STUB_ACTIVITY: IActivitySection = {
        index: 0,
        description: "STUB_ACTIVITY.description",
        estimatedMinutes: 2,
        tools: "STUB_ACTIVITY.tools"
    };
    
    const STUB_PARAGRAPH: IParagraphSection = {
        index: 1,
        text: "STUB_PARAGRAPH.text"
    };

    const STUB_IMAGE: IImageSection = {
        index: 2,
        footing: "STUB_IMAGE.footing",
        url: "STUB_IMAGE.url",
        reference: "STUB_IMAGE.reference"
    };

    const STUB_TITLE: ITitleSection = {
        index: 3,
        size: TitleSectionSize.H1,
        text: "STUB_TITLE.text"
    };

    const STUB_YOUTUBE_VIDEO: IYoutubeVideoSection = {
        index: 4,
        url: "STUB_YOUTUBE_VIDEO.url"
    };

    const STUB_FILE: IFile = {
        url: 'url',
        name: 'name',
        uploaded: new Date(),
        bytes: 1
    };

    const STUB_QUESTION: IQuestion = {
        question: "is this a question?",
        options: new Map<Score, string>()
    };

    STUB_QUESTION.options.set(Score.VERY_LOW, "Very Low option");
    STUB_QUESTION.options.set(Score.LOW, "Low option");
    STUB_QUESTION.options.set(Score.AVERAGE, "Average option");
    STUB_QUESTION.options.set(Score.HIGH, "High option");
    STUB_QUESTION.options.set(Score.VERY_HIGH, "Very High option");

    const STUB_IMPLEMENTATION: IImplementation = {
        date: new Date(),
        maleParticipants: 1,
        femaleParticipants: 1,
        otherParticipants: 1,
        location: {
            name: 'STUB_IMPLEMENTATION.name',
            latitude: 0,
            longitude: 2
        },
        educatorId: 'STUB_IMPLEMENTATION.educatorId',
        educatorName: 'STUB_IMPLEMENTATION.educatorName',
        educatorLastname: 'STUB_IMPLEMENTATION.educatorLastname',
        implementableId: 'STUB_IMPLEMENTATION.implementableId',
        implementableName: 'STUB_IMPLEMENTATION.implementableName'
    };
    
    const STUB_ANSWER: IAnswer = {
        questionId: 'STUB_ANSWER.questionId',
        question: 'STUB_ANSWER.question',
        option: 'STUB_ANSWER.option',
        score: Score.LOW
    };

    const STUB_ALLY: IAlly = {
        name: 'STUB_ALLY.name',
        imageUrl: 'STUB_ALLY.imageUrl',
        link: 'STUB_ALLY.link'
    }

    const factory: Factory = new Factory();

    it('getDisciplineMetadata(): returns DisciplineMetadata correctly', async () => {
        const metadata: DisciplineMetadata = factory.getDisciplineMetadata(STUB_DISCIPLINE_METADATA);
        expect(metadata.subjects.length).toBe(STUB_DISCIPLINE_METADATA.subjects.length);
        expect(metadata.years).toBe(STUB_DISCIPLINE_METADATA.years);
    });

    it('getIDisciplineMetadata(): returns IDisciplineMetadata correctly', async () => {
        const metadata: DisciplineMetadata = factory.getIDisciplineMetadata(STUB_DISCIPLINE_METADATA);
        expect(metadata.subjects.length).toBe(STUB_DISCIPLINE_METADATA.subjects.length);
        expect(metadata.years).toBe(STUB_DISCIPLINE_METADATA.years);
    });

    it('getUser(): incorrectly returns an administrator with an an unknown type of IUser', async () => {
        const unknown: IUnknownUser = { imageUrl: 'unknown', name: 'unknown', lastname: 'lastname', email: 'email' };
        const error: Administrator = factory.getUser(STUB_ID, unknown);
        expect(error).toBeTruthy();
    });

    it('getUser(): returns the correct Educator when input an IEducator', async () => {
        const educator: Educator = <Educator>factory.getUser(STUB_ID, STUB_EDUCATOR);
        expect(educator.id).toBe(STUB_ID);
        expect(educator.imageUrl).toBe(STUB_EDUCATOR.imageUrl);
        expect(educator.name).toBe(STUB_EDUCATOR.name);
        expect(educator.lastname).toBe(STUB_EDUCATOR.lastname);
        expect(educator.email).toBe(STUB_EDUCATOR.email);
        expect(educator.phone).toBe(STUB_EDUCATOR.phone);
        expect(educator.joined).toBe(STUB_EDUCATOR.joined);
    });

    it('getIUser(): returns the correct IEducator when input an IEducator', async () => {
        const educator: IEducator = <IEducator>factory.getIUser(STUB_EDUCATOR);
        expect(educator.imageUrl).toBe(STUB_EDUCATOR.imageUrl);
        expect(educator.name).toBe(STUB_EDUCATOR.name);
        expect(educator.lastname).toBe(STUB_EDUCATOR.lastname);
        expect(educator.email).toBe(STUB_EDUCATOR.email);
        expect(educator.phone).toBe(STUB_EDUCATOR.phone);
        expect(educator.joined).toBe(STUB_EDUCATOR.joined);
    });
    
    it('getUser(): returns the correct Administrator when input an IAdministrator', async () => {
        const administrator: Administrator = <Administrator>factory.getUser(STUB_ID, STUB_ADMINISTRATOR);
        expect(administrator.id).toBe(STUB_ID);
        expect(administrator.imageUrl).toBe(STUB_ADMINISTRATOR.imageUrl);
        expect(administrator.name).toBe(STUB_ADMINISTRATOR.name);
        expect(administrator.lastname).toBe(STUB_ADMINISTRATOR.lastname);
        expect(administrator.email).toBe(STUB_ADMINISTRATOR.email);
    });

    it('getEducatorRequest(): returns the correct EducatorRequest when input an IEducatorRequest', async () => {
        const STUB_STATE: EducatorRequestState = EducatorRequestState.PENDING;
        const request: EducatorRequest = factory.getEducatorRequest(STUB_ID, STUB_DATE, STUB_STATE, STUB_EDUCATOR_REQUEST);
        expect(request.id).toBe(STUB_ID);
        expect(request.name).toBe(STUB_EDUCATOR_REQUEST.name);
        expect(request.lastname).toBe(STUB_EDUCATOR_REQUEST.lastname);
        expect(request.email).toBe(STUB_EDUCATOR_REQUEST.email);
        expect(request.phone).toBe(STUB_EDUCATOR_REQUEST.phone);
        expect(request.address.latitude).toBe(STUB_EDUCATOR_REQUEST.address.latitude);
        expect(request.address.longitude).toBe(STUB_EDUCATOR_REQUEST.address.longitude);
        expect(request.address.name).toBe(STUB_EDUCATOR_REQUEST.address.name);
        expect(request.birthday).toBe(STUB_EDUCATOR_REQUEST.birthday);
        expect(request.organization).toBe(STUB_EDUCATOR_REQUEST.organization);
        expect(request.issued).toBe(STUB_DATE);
        expect(request.state).toBe(STUB_STATE);
    });

    it('getIEducatorRequest(): returns the correct IEducatorRequest when input an IEducatorRequest', async () => {
        const request: IEducatorRequest = factory.getIEducatorRequest(STUB_EDUCATOR_REQUEST);
        expect(request.name).toBe(STUB_EDUCATOR_REQUEST.name);
        expect(request.lastname).toBe(STUB_EDUCATOR_REQUEST.lastname);
        expect(request.email).toBe(STUB_EDUCATOR_REQUEST.email);
        expect(request.phone).toBe(STUB_EDUCATOR_REQUEST.phone);
        expect(request.address.latitude).toBe(STUB_EDUCATOR_REQUEST.address.latitude);
        expect(request.address.longitude).toBe(STUB_EDUCATOR_REQUEST.address.longitude);
        expect(request.address.name).toBe(STUB_EDUCATOR_REQUEST.address.name);
        expect(request.birthday).toBe(STUB_EDUCATOR_REQUEST.birthday);
        expect(request.organization).toBe(STUB_EDUCATOR_REQUEST.organization);
    });

    it('getImplementable(): returns the correct Module when input an IModule', async () => {
        const module: Module = <Module>factory.getImplementable(STUB_ID, STUB_MODULE);
        expect(module.id).toBe(STUB_ID);
        expect(module.name).toBe(STUB_MODULE.name);
        expect(module.color).toBe(STUB_MODULE.color);
        expect(module.imageUrl).toBe(STUB_MODULE.imageUrl);
        expect(module.bannerImageUrl).toBe(STUB_MODULE.bannerImageUrl);
        expect(module.publisherId).toBe(STUB_MODULE.publisherId);
        expect(module.publisherName).toBe(STUB_MODULE.publisherName);
        expect(module.publisherLastname).toBe(STUB_MODULE.publisherLastname);
        expect(module.recommendedAge).toBe(STUB_MODULE.recommendedAge);
        expect(module.antecedents).toBe(STUB_MODULE.antecedents);
        expect(module.objective).toEqual(STUB_MODULE.objective);
        expect(module.disciplines.length).toBe(STUB_MODULE.disciplines.length);
    });

    it('getIImplementable(): returns the correct IModule when input an IModule', async () => {
        const module: IModule = <IModule>factory.getIImplementable(STUB_MODULE);
        expect(module.name).toBe(STUB_MODULE.name);
        expect(module.color).toBe(STUB_MODULE.color);
        expect(module.imageUrl).toBe(STUB_MODULE.imageUrl);
        expect(module.bannerImageUrl).toBe(STUB_MODULE.bannerImageUrl);
        expect(module.publisherId).toBe(STUB_MODULE.publisherId);
        expect(module.publisherName).toBe(STUB_MODULE.publisherName);
        expect(module.publisherLastname).toBe(STUB_MODULE.publisherLastname);
        expect(module.recommendedAge).toBe(STUB_MODULE.recommendedAge);
        expect(module.antecedents).toBe(STUB_MODULE.antecedents);
        expect(module.objective).toEqual(STUB_MODULE.objective);
        expect(module.disciplines.length).toBe(STUB_MODULE.disciplines.length);
    });

    it('getImplementable(): returns the correct Event when input an IEvent', async () => {
        const event: Event = <Event>factory.getImplementable(STUB_ID, STUB_EVENT);
        expect(event.id).toBe(STUB_ID);
        expect(event.name).toBe(STUB_EVENT.name);
        expect(event.color).toBe(STUB_EVENT.color);
        expect(event.imageUrl).toBe(STUB_EVENT.imageUrl);
        expect(event.bannerImageUrl).toBe(STUB_EVENT.bannerImageUrl);
        expect(event.publisherId).toBe(STUB_EVENT.publisherId);
        expect(event.publisherName).toBe(STUB_EVENT.publisherName);
        expect(event.publisherLastname).toBe(STUB_EVENT.publisherLastname);
        expect(event.objective).toEqual(STUB_EVENT.objective);
        expect(event.date).toBe(STUB_EVENT.date);
    });

    it('getIImplementable(): returns the correct IEvent when input an IEvent', async () => {
        const event: IEvent = <IEvent>factory.getIImplementable(STUB_EVENT);
        expect(event.name).toBe(STUB_EVENT.name);
        expect(event.color).toBe(STUB_EVENT.color);
        expect(event.imageUrl).toBe(STUB_EVENT.imageUrl);
        expect(event.bannerImageUrl).toBe(STUB_EVENT.bannerImageUrl);
        expect(event.publisherId).toBe(STUB_EVENT.publisherId);
        expect(event.publisherName).toBe(STUB_EVENT.publisherName);
        expect(event.publisherLastname).toBe(STUB_EVENT.publisherLastname);
        expect(event.objective).toEqual(STUB_EVENT.objective);
        expect(event.date).toBe(STUB_EVENT.date);
    });

    it('getSection(): fails with an unknown type of ISection', async () => {
        const unknown: IUnknownSection = { index: -1 };
        expect(() => factory.getSection(STUB_ID, unknown)).toThrowError(
            FactoryError.UNKNOWN_ISECTION
        );
    });

    it('getISection(): fails with an unknown type of ISection', async () => {
        const unknown: IUnknownSection = { index: -1 };
        expect(() => factory.getISection(unknown)).toThrowError(
            FactoryError.UNKNOWN_ISECTION
        );
    });

    it('getSection(): returns the correct ActivitySection when input an IActivitySection', async () => {
        const activity: ActivitySection = <ActivitySection>factory.getSection(STUB_ID, STUB_ACTIVITY);
        expect(activity.id).toBe(STUB_ID);
        expect(activity.index).toBe(STUB_ACTIVITY.index);
        expect(activity.description).toBe(STUB_ACTIVITY.description);
        expect(activity.estimatedMinutes).toBe(STUB_ACTIVITY.estimatedMinutes);
        expect(activity.tools).toBe(STUB_ACTIVITY.tools);
    });

    it('getISection(): returns the correct IActivitySection when input an IActivitySection', async () => {
        const activity: IActivitySection = <IActivitySection>factory.getISection(STUB_ACTIVITY);
        expect(activity.index).toBe(STUB_ACTIVITY.index);
        expect(activity.description).toBe(STUB_ACTIVITY.description);
        expect(activity.estimatedMinutes).toBe(STUB_ACTIVITY.estimatedMinutes);
        expect(activity.tools).toBe(STUB_ACTIVITY.tools);
    });

    it('getSection(): returns the correct ParagraphSection when input an IParagraphSection', async () => {
        const paragraph: ParagraphSection = <ParagraphSection>factory.getSection(STUB_ID, STUB_PARAGRAPH);
        expect(paragraph.id).toBe(STUB_ID);
        expect(paragraph.index).toBe(STUB_PARAGRAPH.index);
        expect(paragraph.text).toBe(STUB_PARAGRAPH.text);
    });

    it('getISection(): returns the correct IParagraphSection when input an IParagraphSection', async () => {
        const paragraph: IParagraphSection = <IParagraphSection>factory.getISection(STUB_PARAGRAPH);
        expect(paragraph.index).toBe(STUB_PARAGRAPH.index);
        expect(paragraph.text).toBe(STUB_PARAGRAPH.text);
    });

    it('getSection(): returns the correct ImageSection when input an IImageSection', async () => {
        const image: ImageSection = <ImageSection>factory.getSection(STUB_ID, STUB_IMAGE);
        expect(image.id).toBe(STUB_ID);
        expect(image.index).toBe(STUB_IMAGE.index);
        expect(image.footing).toBe(STUB_IMAGE.footing);
        expect(image.url).toBe(STUB_IMAGE.url);
        expect(image.reference).toBe(STUB_IMAGE.reference);
    });

    it('getISection(): returns the correct IImageSection when input an IImageSection', async () => {
        const image: IImageSection = <IImageSection>factory.getISection(STUB_IMAGE);
        expect(image.index).toBe(STUB_IMAGE.index);
        expect(image.footing).toBe(STUB_IMAGE.footing);
        expect(image.url).toBe(STUB_IMAGE.url);
        expect(image.reference).toBe(STUB_IMAGE.reference);
    });

    it('getSection(): returns the correct TitleSection when input an ITitleSection', async () => {
        const title: TitleSection = <TitleSection>factory.getSection(STUB_ID, STUB_TITLE);
        expect(title.id).toBe(STUB_ID);
        expect(title.index).toBe(STUB_TITLE.index);
        expect(title.size).toBe(STUB_TITLE.size);
        expect(title.text).toBe(STUB_TITLE.text);
    });

    it('getISection(): returns the correct ITitleSection when input an ITitleSection', async () => {
        const title: ITitleSection = <ITitleSection>factory.getISection(STUB_TITLE);
        expect(title.index).toBe(STUB_TITLE.index);
        expect(title.size).toBe(STUB_TITLE.size);
        expect(title.text).toBe(STUB_TITLE.text);
    });

    it('getSection(): returns the correct YoutubeVideoSection when input an IYoutubeVideoSection', async () => {
        const video: YoutubeVideoSection = <YoutubeVideoSection>factory.getSection(STUB_ID, STUB_YOUTUBE_VIDEO);
        expect(video.id).toBe(STUB_ID);
        expect(video.index).toBe(STUB_YOUTUBE_VIDEO.index);
        expect(video.url).toBe(STUB_YOUTUBE_VIDEO.url);
    });

    it('getISection(): returns the correct IYoutubeVideoSection when input an IYoutubeVideoSection', async () => {
        const video: IYoutubeVideoSection = <IYoutubeVideoSection>factory.getISection(STUB_YOUTUBE_VIDEO);
        expect(video.index).toBe(STUB_YOUTUBE_VIDEO.index);
        expect(video.url).toBe(STUB_YOUTUBE_VIDEO.url);
    });

    it('getFile(): returns the correct File when input an IFile', async () => {
        const file: File = factory.getFile(STUB_ID, STUB_FILE);
        expect(file.id).toBe(STUB_ID);
        expect(file.url).toBe(STUB_FILE.url);
        expect(file.name).toBe(STUB_FILE.name);
        expect(file.uploaded).toBe(STUB_FILE.uploaded);
        expect(file.bytes).toBe(STUB_FILE.bytes);
    });

    it('getQuestion(): returns the correct Question when input an IQuestion', async () => {
        const question: Question = factory.getQuestion(STUB_ID, STUB_QUESTION);
        expect(question.id).toBe(STUB_ID);
        expect(question.question).toBe(STUB_QUESTION.question);
        expect(question.options).toBe(STUB_QUESTION.options);
    });

    it('getIQuestion(): returns the correct IQuestion when input an IQuestion', async () => {
        const question: IQuestion = factory.getIQuestion(STUB_QUESTION);
        expect(question.question).toBe(STUB_QUESTION.question);
        expect(question.options).toBe(STUB_QUESTION.options);
    });

    it('getImplementation(): returns the correct Implementation when input an IImplementation', async() => {
        const STUB_DELETED: boolean = false;
        const STUB_COMPLETED: boolean = false;
        const implementation: Implementation = factory.getImplementation(STUB_ID, STUB_DELETED, STUB_COMPLETED, STUB_IMPLEMENTATION);
        expect(implementation.id).toBe(STUB_ID);
        expect(implementation.deleted).toBe(STUB_DELETED);
        expect(implementation.completed).toBe(STUB_COMPLETED);
        expect(implementation.date).toBe(STUB_IMPLEMENTATION.date);
        expect(implementation.maleParticipants).toBe(STUB_IMPLEMENTATION.maleParticipants);
        expect(implementation.femaleParticipants).toBe(STUB_IMPLEMENTATION.femaleParticipants);
        expect(implementation.otherParticipants).toBe(STUB_IMPLEMENTATION.otherParticipants);
        expect(implementation.location.name).toBe(STUB_IMPLEMENTATION.location.name);
        expect(implementation.location.latitude).toBe(STUB_IMPLEMENTATION.location.latitude);
        expect(implementation.location.longitude).toBe(STUB_IMPLEMENTATION.location.longitude);
        expect(implementation.educatorId).toBe(STUB_IMPLEMENTATION.educatorId);
        expect(implementation.educatorName).toBe(STUB_IMPLEMENTATION.educatorName);
        expect(implementation.educatorLastname).toBe(STUB_IMPLEMENTATION.educatorLastname);
        expect(implementation.implementableId).toBe(STUB_IMPLEMENTATION.implementableId);
        expect(implementation.implementableName).toBe(STUB_IMPLEMENTATION.implementableName);
    });

    it('getIImplementation(): returns the correct IImplementation when input an IImplementation', async() => {
        const implementation: IImplementation = factory.getIImplementation(STUB_IMPLEMENTATION);
        expect(implementation.date).toBe(STUB_IMPLEMENTATION.date);
        expect(implementation.maleParticipants).toBe(STUB_IMPLEMENTATION.maleParticipants);
        expect(implementation.femaleParticipants).toBe(STUB_IMPLEMENTATION.femaleParticipants);
        expect(implementation.otherParticipants).toBe(STUB_IMPLEMENTATION.otherParticipants);
        expect(implementation.location.name).toBe(STUB_IMPLEMENTATION.location.name);
        expect(implementation.location.latitude).toBe(STUB_IMPLEMENTATION.location.latitude);
        expect(implementation.location.longitude).toBe(STUB_IMPLEMENTATION.location.longitude);
        expect(implementation.educatorId).toBe(STUB_IMPLEMENTATION.educatorId);
        expect(implementation.educatorName).toBe(STUB_IMPLEMENTATION.educatorName);
        expect(implementation.educatorLastname).toBe(STUB_IMPLEMENTATION.educatorLastname);
        expect(implementation.implementableId).toBe(STUB_IMPLEMENTATION.implementableId);
        expect(implementation.implementableName).toBe(STUB_IMPLEMENTATION.implementableName);
    });

    it('getAnswer(): returns the correct Answer when input an IAnswer', async () => {
        const answer: Answer = factory.getAnswer(STUB_ID, STUB_ANSWER);
        expect(answer.id).toBe(STUB_ID);
        expect(answer.question).toBe(STUB_ANSWER.question);
        expect(answer.option).toBe(STUB_ANSWER.option);
        expect(answer.score).toBe(STUB_ANSWER.score);
    });

    it('getIAnswer(): returns the correct IAnswer when input an IAnswer', async () => {
        const answer: IAnswer = factory.getIAnswer(STUB_ANSWER);
        expect(answer.question).toBe(STUB_ANSWER.question);
        expect(answer.option).toBe(STUB_ANSWER.option);
        expect(answer.score).toBe(STUB_ANSWER.score);
    });

    it('getAlly(): returns the correct Ally when input an IAlly', async () => {
        const ally: Ally = factory.getAlly(STUB_ID, STUB_ALLY);
        expect(ally.id).toBe(STUB_ID);
        expect(ally.name).toBe(STUB_ALLY.name);
        expect(ally.imageUrl).toBe(STUB_ALLY.imageUrl);
        expect(ally.link).toBe(STUB_ALLY.link);
    });

    it('getIAlly(): returns the correct IAlly when input an IAlly', async () => {
        const ally: IAlly = factory.getIAlly(STUB_ALLY);
        expect(ally.name).toBe(STUB_ALLY.name);
        expect(ally.imageUrl).toBe(STUB_ALLY.imageUrl);
        expect(ally.link).toBe(STUB_ALLY.link);
    });
});