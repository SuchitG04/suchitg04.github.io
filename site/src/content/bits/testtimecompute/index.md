---
title: "Test-time compute, but for humans."
toc: true
date: "2024-11-11"
author: "Suchit G"
description: "Imagine writing lol. No, actually, imagine writing."
---

The way [O1](https://openai.com/index/learning-to-reason-with-llms/) works is cool.

Researchers have been figuring out that you can't get models to, you know, * just * reason. Like, dude, just train it more, and it'll start reasoning well.
This is not the case because it predicts the next token mimicking the training data.

The training data also contains text (blogs, papers, etc.) where humans have written detailed explanations on why they have done what they have done.
So, naturally (or based on evals, you cheeky vibe-based-eval person), you can expect the model to perform better at solving problems by first spitting out the steps or what it thinks about the problem.
It's essentially the model giving more context to itself for better next token prediction.

This is reffered to as Chain of Thought (CoT). It is one interesting way to get them to reason (or a dumbed down way of actual human reasoning). The models are explicitly ~~begged~~ asked to think out before giving out an answer.

OpenAI took this to next level by training an LLM to be good at this.

This maps to humans as well in the sense that we see a lot of benefits when we think out loud or write down our thoughts.
I know that we can reason/think quite well "in our brains" but it's better the other way in most cases.

This especially applies to writing about some material you just learnt.
You identify a lot of gaps in your understanding when you do this and are using your "test-time compute" to understand, make connections and discover new things in your head.
