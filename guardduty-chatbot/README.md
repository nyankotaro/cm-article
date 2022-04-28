# guardduty-chatbot stacks

## ディレクトリのコピー

```shell
svn export https://github.com/nyankotaro/cm-article/trunk/guardduty-chatbot
```

## npm install

```shell
cd guardduty-chatbot;npm install
```

## chatbotの変数設定

`bin/`配下ファイルに以下を設定する。

- slackWorkspaceId
- slackChannelId

```typescript
new ChatBotStack(app, `${projectName}-${envValues.envName}-chatbot-stack`, {
  projectName: projectName,
  envName: envValues.envName,
  env: env,
  snsTopicForHigh: snsStack.snsTopicForHigh,
  snsTopicForMiddleLow: snsStack.snsTopicForMiddleLow,
  slackWorkspaceId: "your_workspace_id", //AWS chatbotのWorkspace id
  slackChannelId1: "your_slackchannel_id", //SlackのチャンネルID(high)
  slackChannelId2: "your_slackchannel_id", //SlackのチャンネルID(middle-low)
});
```

[./bin/guardduty-cahtbot.ts](./bin/guardduty-chatbot.ts)

## デプロイ

```shell
npx cdk deploy --all -c env=dev --require-aproval never
```

## ブログリンク

[重要度別にGuardDutyをSlackに通知してみた](https://dev.classmethod.jp/articles/notify_guardduty_by_severity/)
