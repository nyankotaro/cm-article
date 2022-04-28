import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as events from "aws-cdk-lib/aws-events";
import * as targets from "aws-cdk-lib/aws-events-targets";
import * as lambda from "aws-cdk-lib/aws-lambda";

export interface props extends StackProps {
  projectName: String;
  envName: String;
  lambdaFunction: lambda.IFunction;
}

export class EventBridgeStack extends Stack {
  constructor(scope: Construct, id: string, props: props) {
    super(scope, id, props);

    /**
     *  Create a EventBridge
     */
    const rule = new events.Rule(this, `${props.projectName}-${props.envName}-events-rule`, {
      ruleName: `${props.projectName}-${props.envName}-events-rule`,
      eventPattern: {
        source: ["aws.guardduty"],
        detailType: ["GuardDuty Finding"],
      },
      targets: [new targets.LambdaFunction(props.lambdaFunction)],
    });
  }
}
