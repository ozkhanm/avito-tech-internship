import React from "react";
import renderer from "react-test-renderer";

import Comment from "./Comment";

it(`Comment component without kids renders correctly`, () => {
    const comment = {
        by: "vbphprubyjsgo",
        id: 30387743,
        parent: 30386645,
        text: "Isn&#x27;t that just a techspam website? I only read their monitor reviews and they were all wrong.",
        time: 1645201625,
        type: "comment"
    };
    const tree = renderer
        .create(<Comment comment={comment}/>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});

it(`Comment component with kids renders correctly`, () => {
    const comment = {
        by: "awill",
        id: 30389916,
        kids: [{
            by: "IanCutress",
            id: 30390027,
            parent: 30389916,
            text: "Simply understaffed. Since I&#x27;ve been full time, we&#x27;ve only ever had two full time employees.<p>Also, Samsung doesn&#x27;t sample AnandTech.",
            time: 1645212533,
            type: "comment"
        }],
        parent: 30386645,
        text: "I feel AT is great for enthusiasts. I want them to become more mainstream, as their reviews are so much better than generic tech sites, but they need a better balance. They sometimes release iPhone, Galaxy or Pixel reviews weeks or even months after launch. Just look at Youtube, and impact on views from being first with a review. Reviews that arrive weeks after a product launch don&#x27;t have mass-market appeal. AT either doesn&#x27;t understand the market, or is understaffed.<p>I get a thorough review can&#x27;t come out on day one, but they need to get something out. Maybe a first look with some opinions, followed by a more thorough review a week later.",
        time: 1645211797,
        type: "comment"
    };
    const tree = renderer
        .create(<Comment comment={comment}/>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});