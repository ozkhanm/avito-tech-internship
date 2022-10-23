import {reducer} from "./reducer";
import {ActionCreator} from "./action-creator";
import initialState from "./initial-state";

const mockArticles = [
    {
        "by" : "yarapavan",
        "descendants" : 0,
        "id" : 30406481,
        "score" : 1,
        "time" : 1645371224,
        "title" : "How to Lose Time and Money",
        "type" : "story",
        "url" : "https://prachinain.medium.com/how-to-lose-time-and-money-e2d8c54c5c4d"
    },
    {
        "by" : "idletom",
        "descendants" : 0,
        "id" : 30406473,
        "score" : 1,
        "time" : 1645371191,
        "title" : "Technical Analysis of the DDoS Attacks Against Ukrainian Websites",
        "type" : "story",
        "url" : "https://www.cadosecurity.com/technical-analysis-of-the-ddos-attacks-against-ukrainian-websites/"
    },
    {
        "by" : "wrp",
        "descendants" : 1,
        "id" : 30406031,
        "kids" : [ 30406036 ],
        "score" : 2,
        "time" : 1645367930,
        "title" : "Absence of evidence is not evidence of absence: Bayesian view? (2021)",
        "type" : "story",
        "url" : "https://stats.stackexchange.com/questions/512678/absence-of-evidence-is-not-evidence-of-absence-what-does-bayesian-probability-h"
    }
];

const mockComments = [
    {
        by: "bavell",
        id: 30388248,
        kids: [
        {
            by: "uluyol",
            id: 30388813,
            parent: 30388248,
            text: "I&#x27;ve always enjoyed Ryan Smith&#x27;s articles, but I think he&#x27;s been busy with other duties since taking over. I have noticed that the quality of work coming from their junior writers improves over time. I mean just look at Ian. I always enjoyed his writing, but in the past few years it has gotten really really good and he&#x27;s expanded to doing many Q&amp;As and interviews (where you know, he actually asks interesting and tough questions).",
            time: 1645206579,
            type: "comment"
        },
        {
            by: "awiesenhofer",
            id: 30389859,
            parent: 30388248,
            text: "Don&#x27;t count them out just yet - they still got Billy Tallis excellently covering the storage side of things. At least I think they do, haven&#x27;t seen much of him in a while.",
            time: 1645211488,
            type: "comment"
        }
        ],
        length: 2,
        parent: 30386645,
        text: "RIP Anandtech. It was the first tech news site I followed as a teen and got me into hardware, letting me peer behind the curtain of these mysterious machines we all use. Probably responsible for me choosing computer engineering in university. Many good memories of flashes of insight, wonder and amazement.<p>Haven&#x27;t been frequenting the site as much since Anand left and I felt the site&#x27;s days were numbered. They still had good content coming out but with Ian leaving, I think most (all?) of the old guard has left and this is probably the final nail in the coffin.",
        time: 1645203926,
        type: "comment"
    },
    {
        by: "kapilvt",
        id: 30391920,
        parent: 30386645,
        text: "I appreciate so much two folks in tech reporting Ian and Jon (Corbet at lwn.net), over the last decade they have both put out so much content, that frankly pulls the behind the layers to make them not magic but, science and journalism with integrity.. kudos and if we find ourselves in go fund me journalism, know that I’m happy to contribute to the cause.",
        time: 1645223013,
        type: "comment"
    }
];

const mockArticle = {
    "by" : "yarapavan",
    "descendants" : 0,
    "id" : 30406481,
    "score" : 1,
    "time" : 1645371224,
    "title" : "How to Lose Time and Money",
    "type" : "story",
    "url" : "https://prachinain.medium.com/how-to-lose-time-and-money-e2d8c54c5c4d"
};

const updateInitialState = (data) => {
    return Object.assign({}, initialState, data);
};

describe(`Reducer works correctly`, () => {
    it(`Reducer without parameters returns initial state`, () => {
        expect(reducer(undefined, {})).toEqual(initialState);
    });

    it(`Reducer should change articles correclty`, () => {
        expect(reducer(initialState, ActionCreator.getArticles(mockArticles))).toEqual(updateInitialState({
            articles: mockArticles
        }));
    });

    it(`Reducer should change articles loading status correctly`, () => {
        expect(reducer(initialState, ActionCreator.changeLoadingStatus(true))).toEqual(updateInitialState({
            isDataLoaded: true
        }));
        expect(reducer(initialState, ActionCreator.changeLoadingStatus(false))).toEqual(updateInitialState({
            isDataLoaded: false
        }));
    });

    it(`Reducer should change active article id correctly`, () => {
        expect(reducer(initialState, ActionCreator.changeActiveArticleId(129))).toEqual(updateInitialState({
            activeArticleId: 129
        }));
    });

    it(`Reducer should change article comments correctly`, () => {
        expect(reducer(initialState, ActionCreator.getArticleComments(mockComments))).toEqual(updateInitialState({
            articleComments: mockComments
        }));
    });

    it(`Reducer should change article comments loading status correctly`, () => {
        expect(reducer(initialState, ActionCreator.changeCommentsLoadingStatus(false))).toEqual(updateInitialState({
            isCommentLoaded: false
        }));
        expect(reducer(initialState, ActionCreator.changeCommentsLoadingStatus(true))).toEqual(updateInitialState({
            isCommentLoaded: true
        }));
    });

    it(`Reducer should change active article correctly`, () => {
        expect(reducer(initialState, ActionCreator.getActiveArticle(mockArticle))).toEqual(updateInitialState({
            activeArticle: mockArticle
        }));
    });

    it(`Reducer should change active article loading status correctly`, () => {
        expect(reducer(initialState, ActionCreator.changeActiveArticleLoadingStatus(false))).toEqual(updateInitialState({
            isActiveArticleLoaded: false
        }));
        expect(reducer(initialState, ActionCreator.changeActiveArticleLoadingStatus(true))).toEqual(updateInitialState({
            isActiveArticleLoaded: true
        }));
    });

    it(`Reducer should change active article on drop correctly`, () => {
        expect(reducer(initialState, ActionCreator.dropActiveArticle())).toEqual(updateInitialState({
            activeArticle: null
        }));
    });

    it(`Reducer should change refresh status correctly`, () => {
        expect(reducer(initialState, ActionCreator.changeRefreshStatus(false))).toEqual(updateInitialState({
            refreshStatus: false
        }));
        expect(reducer(initialState, ActionCreator.changeRefreshStatus(true))).toEqual(updateInitialState({
            refreshStatus: true
        }));
    });
});