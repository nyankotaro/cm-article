import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as sns from "aws-cdk-lib/aws-sns";

export interface props extends StackProps {
  projectName: String;
  envName: String;
}

export class SnsStack extends Stack {
  public readonly snsTopicForHigh: sns.ITopic;
  public readonly snsTopicForMiddleLow: sns.ITopic;

  constructor(scope: Construct, id: string, props: props) {
    super(scope, id, props);

    /**
     *  Create a SNS for the eventbridge
     */
    this.snsTopicForHigh = new sns.Topic(this, `${props.projectName}-${props.envName}-for-guardduty-high`, {
      topicName: `${props.projectName}-${props.envName}-for-guardduty-high`,
      displayName: `${props.projectName}-${props.envName}-for-guardduty-high`,
    });

    this.snsTopicForMiddleLow = new sns.Topic(this, `${props.projectName}-${props.envName}-for-guardduty-middle-low`, {
      topicName: `${props.projectName}-${props.envName}-for-guardduty-middle`,
      displayName: `${props.projectName}-${props.envName}-for-guardduty-middle`,
    });
  }
}
