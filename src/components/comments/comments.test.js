import React from "react";
import renderer from "react-test-renderer";

import {Comments} from "./Comments";

it(`Comments container renders correctly if data is fetching`, () => {
    const tree = renderer
        .create(<Comments articleComments={[]} isCommentLoaded={false}/>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});
  
it(`Comments container renders correctly if data fetched`, () => {
    const articleComments = [
        {
            by: "georgeburdell",
            id: 30387999,
            parent: 30386645,
            kids: [
                {
                    by: "CitizenKane",
                    id: 30390670,
                    parent: 30386645,
                    text: "Hey Ian, thanks for all the very thoughtful content over the years. I started reading Anandtech shortly before Anand left and I remember being worried. However, in hindsight there was clearly nothing to worry about.<p>Your analysis helped convince me to go all in on some AMD stock purchases that ended up really saving me over past year. It’s beyond appreciated, and I’m far more knowledgeable about semiconductors thanks to you! Best of luck in your new journey",
                    time: 1645216278,
                    type: "comment"
                }
            ],
            text: "Not unexpected.  He’s been building his own brand (TechTechPotato) on YouTube for a while.",
            time: 1645202735,
            type: "comment"
        },
        {
            by: "Katydid",
            id: 30389216,
            parent: 30386645,
            text: "Cheers to the best in the business, here&#x27;s wishing Ian incredible success. Thanks for so much great reporting and analysis over the years. Few understand how challenging such a job is, having your daily work product (which has to balance technical depth and reader appeal) on stage for the world to grill, year in and out. Ian nailed it with depth, energy, and humor. Can&#x27;t wait to see what&#x27;s next from the good Dr. Cutress. - N",
            time: 1645208546,
            type: "comment"
        }
    ];
    const tree = renderer
        .create(<Comments articleComments={articleComments} isCommentLoaded={true}/>)
        .toJSON();
  
    expect(tree).toMatchSnapshot();
});