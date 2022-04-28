import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as chatbot from "aws-cdk-lib/aws-chatbot";
import * as sns from "aws-cdk-lib/aws-sns";

export interface props extends StackProps {
  projectName: String;
  envName: String;
  snsTopicForHigh: sns.ITopic;
  snsTopicForMiddleLow: sns.ITopic;
  slackWorkspaceId: string;
  slackChannelId1: string;
  slackChannelId2: string;
}

export class ChatBotStack extends Stack {
  constructor(scope: Construct, id: string, props: props) {
    super(scope, id, props);

    /**
     *  Create a Chatbot
     */
    const slackChannel1 = new chatbot.SlackChannelConfiguration(this, `${props.projectName}-${props.envName}-guardduty-high`, {
      slackChannelConfigurationName: "guardduty-high",
      slackWorkspaceId: props.slackWorkspaceId,
      slackChannelId: props.slackChannelId1,
      notificationTopics: [props.snsTopicForHigh],
    });

    const slackChannel2 = new chatbot.SlackChannelConfiguration(this, `${props.projectName}-${props.envName}-guardduty-middle-low`, {
      slackChannelConfigurationName: "guardduty-middle-low",
      slackWorkspaceId: props.slackWorkspaceId,
      slackChannelId: props.slackChannelId2,
      notificationTopics: [props.snsTopicForMiddleLow],
    });
  }
}
