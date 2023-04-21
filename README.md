# Skewlup

[Skewlup](https://skewlup.org) is a GPT experiment that aims to provide a directory of local resources for cities around the world.

## How it works

Content for Skewlup is produced with the following workflow:

1. A human chooses a topic of interest for a region. For example "Math lessons located in Sao Paulo Brazil".
2. A conventional search engine is used to find results for the topic.
3. GPT is prompted to confirm that the content of each result matches the intended query. The prompt is also used to filter out indirect results like news articles or "top N" lists. The result must be a direct provider of the resource.
4. For the valid results, GPT is prompted to summarize the content, and categorize it using tags. GPT is instructed to answer with a specific JSON structure.
5. The summaries, tags and links are stored. A thumbnail is captured for the result, and the results are presented to visitors in an organized directory.

## Development

A docker-compose configuration encapsulates the application's dev and prod environments, including postgres and redis dependencies.
The application is implemented using next.js and sequelize. A job and worker system is implemented with bullmq. Web content is scraped and captured with puppeteer.

Required OpenAI and Bing API keys and configurations are specified in the `.env` file. `.env.sample` should be used as a template.

```console
docker compose up
./scripts/run.sh init-db
./scripts/run.sh add-place brazil sao-paulo
./scripts/run.sh job-runner brazil sao-paulo math lessons
```
