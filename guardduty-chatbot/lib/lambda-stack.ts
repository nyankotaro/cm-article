import * as path from "path";

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as iam from "aws-cdk-lib/aws-iam";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as sns from "aws-cdk-lib/aws-sns";

export interface props extends StackProps {
  projectName: String;
  envName: String;
  snsTopicForHigh: sns.ITopic;
  snsTopicForMiddleLow: sns.ITopic;
}

export class LambdaStack extends Stack {
  public readonly lambdaFunction: lambda.IFunction;

  constructor(scope: Construct, id: string, props: props) {
    super(scope, id, props);

    /**
     * Create a Role
     */
    const role = new iam.Role(this, `${props.projectName}-${props.envName}-role`, {
      assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com"),
    });
    role.addManagedPolicy(iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonSNSFullAccess"));
    role.addManagedPolicy(
      iam.ManagedPolicy.fromManagedPolicyArn(
        this,
        `${props.projectName}-${props.envName}-lambdabasic`,
        "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
      )
    );

    /**
     *  Create a Lambda
     */
    this.lambdaFunction = new lambda.Function(this, `${props.projectName}-${props.envName}-lambda`, {
      functionName: `${props.projectName}-${props.envName}-lambda`,
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: "lambda_function.lambda_handler",
      environment: {
        SNS_TOPIC_ARN_HIGH: props.snsTopicForHigh.topicArn,
        SNS_TOPIC_ARN_MIDDLE_LOW: props.snsTopicForMiddleLow.topicArn,
      },
      code: lambda.Code.fromAsset(path.join(__dirname, "./assets")),
      role: role,
    });
  }
}
