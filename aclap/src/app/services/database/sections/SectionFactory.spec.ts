import { ActivitySection, IActivitySection, IImageSection, ImageSection, IParagraphSection, ISection, ITitleSection, IYoutubeVideoSection, ParagraphSection, Question, TitleSection, TitleSectionSize, YoutubeVideoSection } from "../../../models";
import { SectionFactory, SectionFactoryError } from './SectionFactory.service';

interface IUnknownSection extends ISection{}

describe('SectionFactory', () => {
    const STUB_ACTIVITY: IActivitySection = {
        index: 0,
        description: "STUB_ACTIVITY.description",
        estimatedMinutes: 2,
        tools: "STUB_ACTIVITY.tools",
        questions: [ new Question("is this a question?", new Map())]
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

    const factory: SectionFactory = new SectionFactory();

    it('getSection(): fails on null or undefined iSection', async () => {
        expect(() => factory.getSection(null)).toThrowError(
            SectionFactoryError.NULL_OR_UNDEFINED_ISECTION
        );
        expect(() => factory.getSection(undefined)).toThrowError(
            SectionFactoryError.NULL_OR_UNDEFINED_ISECTION
        );
    });

    it('getSection(): fails with an unknown type of ISection', async () => {
        const unknown: IUnknownSection = { index: -1 };
        expect(() => factory.getSection(unknown)).toThrowError(
            SectionFactoryError.UNKNOWN_ISECTION
        );
    });

    it('getSection(): returns the correct ActivitySection when input an IActivitySection', async () => {
        const activity: ActivitySection = <ActivitySection>factory.getSection(STUB_ACTIVITY);
        expect(activity.index).toBe(STUB_ACTIVITY.index);
        expect(activity.description).toBe(STUB_ACTIVITY.description);
        expect(activity.estimatedMinutes).toBe(STUB_ACTIVITY.estimatedMinutes);
        expect(activity.tools).toBe(STUB_ACTIVITY.tools);
        expect(activity.questions).toBe(STUB_ACTIVITY.questions);
    });

    it('getSection(): returns the correct ParagraphSection when input an IParagraphSection', async () => {
        const paragraph: ParagraphSection = <ParagraphSection>factory.getSection(STUB_PARAGRAPH);
        expect(paragraph.index).toBe(STUB_PARAGRAPH.index);
        expect(paragraph.text).toBe(STUB_PARAGRAPH.text);
    });

    it('getSection(): returns the correct ImageSection when input an IImageSection', async () => {
        const image: ImageSection = <ImageSection>factory.getSection(STUB_IMAGE);
        expect(image.index).toBe(STUB_IMAGE.index);
        expect(image.footing).toBe(STUB_IMAGE.footing);
        expect(image.url).toBe(STUB_IMAGE.$url);
        expect(image.reference).toBe(STUB_IMAGE.reference);
    });

    it('getSection(): returns the correct TitleSection when input an ITitleSection', async () => {
        const title: TitleSection = <TitleSection>factory.getSection(STUB_TITLE);
        expect(title.index).toBe(STUB_TITLE.index);
        expect(title.size).toBe(STUB_TITLE.size);
        expect(title.text).toBe(STUB_TITLE.text);
    });

    it('getSection(): returns the correct YoutubeVideoSection when input an IYoutubeVideoSection', async () => {
        const video: YoutubeVideoSection = <YoutubeVideoSection>factory.getSection(STUB_YOUTUBE_VIDEO);
        expect(video.index).toBe(STUB_YOUTUBE_VIDEO.index);
        expect(video.url).toBe(STUB_YOUTUBE_VIDEO.url);
    });
});