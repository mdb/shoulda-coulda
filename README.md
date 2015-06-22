# shoulda-coulda

> What _should_ technology do? Computers don't understand what _ought_ to be,
> only what _is_. Behind use of the word "should" lives the messy soup of human
> beliefs on how the world ought to function: emotions, perspective, culture,
> politics, and :turtle: :turtle: :turtle: all the way down.

A Slackbot that tracks how many times the word "should" is used in your software development
team's Slack channel.

Example:

![Example usage](example_usage.png)

## Running

shoulda-coulda works in concert with [should-counter-api](https://github.com/mdb/should-counter-api).
shoulda-coulda assumes you are running a `should-counter-api` to which "shoulds" can be saved and fetched.

shoulda-coulda assumes the presence of 3 environment variables:

```
SHOULDA_COULDA_TOKEN=the Slack access token for your bot's Slack
SHOULD_COUNTER_API_ENDPOINT=a should-counter-api /shoulds endpoint
SHOULDA_COULDA_CHANNEL=the Slack channel shoulda-coulda should monitor
```

Example:

```
export SHOULDA_COULDA_TOKEN=123
export SHOULDA_COULDA_CHANNEL=bottest
export SHOULD_COUNTER_API_ENDPOINT=http://admin:password@localhost:5000/shoulds
```
