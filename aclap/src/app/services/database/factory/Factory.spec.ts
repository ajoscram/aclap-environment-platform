import { ActivitySection, Administrator, DisciplineMetadata, Educator, IActivitySection, IAdministrator, IDisciplineMetadata, IEducator, IImageSection, ImageSection, IModule, IParagraphSection, ISection, ITitleSection, IUser, IYoutubeVideoSection, Module, ParagraphSection, Question, TitleSection, TitleSectionSize, YoutubeVideoSection } from "../../../models";
import { Factory, FactoryError } from './Factory.service';

interface IUnknownUser extends IUser{}
interface IUnknownSection extends ISection{}

describe('Factory', () => {
    const STUB_ID: string = 'id';

    const STUB_DISCIPLINE_METADATA: IDisciplineMetadata = {
        subjects: [
            { name: 'subject1', color: 'color1'},
            { name: 'subject2', color: 'color2'},
            { name: 'subject3', color: 'color3'}
        ],
        years: ['1', '2', '3']
    };

    const STUB_EDUCATOR: IEducator = {
        $imageUrl: 'STUB_EDUCATOR.$imageUrl',
        name: 'STUB_EDUCATOR.name',
        lastname: 'STUB_EDUCATOR.lastname',
        email: 'STUB_EDUCATOR.email',
        phone: 'phone',
        joined: new Date()
    };

    const STUB_ADMINISTRATOR: IAdministrator = {
        $imageUrl: 'STUB_ADMINISTRATOR.$imageUrl',
        name: 'STUB_ADMINISTRATOR.name',
        lastname: 'STUB_ADMINISTRATOR.lastname',
        email: 'STUB_ADMINISTRATOR.email'
    };

    const STUB_MODULE: IModule = {
        name: 'name',
        $imageUrl: '$imageUrl',
        publisherId: 'publisherId',
        publisherName: 'publisherName',
        publisherLastname: 'publisherLastname',
        recommendedAge: 7,
        objectives: ['objective 1', 'objective 2', 'objective 3'],
        requirements: ['requirement 1', 'requirement 2'],
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

    const STUB_ACTIVITY: IActivitySection = {
        index: 0,
        description: "STUB_ACTIVITY.description",
        estimatedMinutes: 2,
        tools: "STUB_ACTIVITY.tools",
        questions: [ { question: "is this a question?", options: new Map() } ]
    };
    
    const STUB_PARAGRAPH: IParagraphSection = {
        index: 1,
        text: "STUB_PARAGRAPH.text"
    };

    const STUB_IMAGE: IImageSection = {
        index: 2,
        footing: "STUB_IMAGE.footing",
        $url: "STUB_IMAGE.$url",
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

    const factory: Factory = new Factory();

    it('getDisciplineMetadata(): returns DisciplineMetadata correctly', async () => {
        const metadata: DisciplineMetadata = factory.getDisciplineMetadata(STUB_DISCIPLINE_METADATA);
        expect(metadata.subjects.length).toBe(STUB_DISCIPLINE_METADATA.subjects.length);
        expect(metadata.years).toBe(STUB_DISCIPLINE_METADATA.years);
    });

    it('getUser(): incorrectly returns an administrator with an an unknown type of IUser', async () => {
        const unknown: IUnknownUser = { $imageUrl: 'unknown', name: 'unknown', lastname: 'lastname', email: 'email' };
        const error: Administrator = factory.getUser(STUB_ID, unknown);
        expect(error).toBeTruthy();
    });

    it('getUser(): returns the correct Educator when input an IEducator', async () => {
        const educator: Educator = <Educator>factory.getUser(STUB_ID, STUB_EDUCATOR);
        expect(educator.id).toBe(STUB_ID);
        expect(educator.imageUrl).toBe(STUB_EDUCATOR.$imageUrl);
        expect(educator.name).toBe(STUB_EDUCATOR.name);
        expect(educator.lastname).toBe(STUB_EDUCATOR.lastname);
        expect(educator.email).toBe(STUB_EDUCATOR.email);
        expect(educator.phone).toBe(STUB_EDUCATOR.phone);
        expect(educator.joined).toBe(STUB_EDUCATOR.joined);
    });
    
    it('getUser(): returns the correct Administrator when input an IAdministrator', async () => {
        const administrator: Administrator = <Administrator>factory.getUser(STUB_ID, STUB_ADMINISTRATOR);
        expect(administrator.id).toBe(STUB_ID);
        expect(administrator.imageUrl).toBe(STUB_ADMINISTRATOR.$imageUrl);
        expect(administrator.name).toBe(STUB_ADMINISTRATOR.name);
        expect(administrator.lastname).toBe(STUB_ADMINISTRATOR.lastname);
        expect(administrator.email).toBe(STUB_ADMINISTRATOR.email);
    });

    it('getModule(): returns Module correctly', async () => {
        const module: Module = factory.getModule(STUB_ID, STUB_MODULE);
        expect(module.id).toBe(STUB_ID);
        expect(module.name).toBe(STUB_MODULE.name);
        expect(module.imageUrl).toBe(STUB_MODULE.$imageUrl);
        expect(module.publisherId).toBe(STUB_MODULE.publisherId);
        expect(module.publisherName).toBe(STUB_MODULE.publisherName);
        expect(module.publisherLastname).toBe(STUB_MODULE.publisherLastname);
        expect(module.recommendedAge).toBe(STUB_MODULE.recommendedAge);
        expect(module.objectives).toEqual(STUB_MODULE.objectives);
        expect(module.requirements).toBe(STUB_MODULE.requirements);
        expect(module.disciplines.length).toBe(STUB_MODULE.disciplines.length);
    });

    it('getSection(): fails with an unknown type of ISection', async () => {
        const unknown: IUnknownSection = { index: -1 };
        expect(() => factory.getSection(STUB_ID, unknown)).toThrowError(
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
        expect(activity.questions[0].question).toBe(STUB_ACTIVITY.questions[0].question);
    });

    it('getSection(): returns the correct ParagraphSection when input an IParagraphSection', async () => {
        const paragraph: ParagraphSection = <ParagraphSection>factory.getSection(STUB_ID, STUB_PARAGRAPH);
        expect(paragraph.id).toBe(STUB_ID);
        expect(paragraph.index).toBe(STUB_PARAGRAPH.index);
        expect(paragraph.text).toBe(STUB_PARAGRAPH.text);
    });

    it('getSection(): returns the correct ImageSection when input an IImageSection', async () => {
        const image: ImageSection = <ImageSection>factory.getSection(STUB_ID, STUB_IMAGE);
        expect(image.id).toBe(STUB_ID);
        expect(image.index).toBe(STUB_IMAGE.index);
        expect(image.footing).toBe(STUB_IMAGE.footing);
        expect(image.url).toBe(STUB_IMAGE.$url);
        expect(image.reference).toBe(STUB_IMAGE.reference);
    });

    it('getSection(): returns the correct TitleSection when input an ITitleSection', async () => {
        const title: TitleSection = <TitleSection>factory.getSection(STUB_ID, STUB_TITLE);
        expect(title.id).toBe(STUB_ID);
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
});