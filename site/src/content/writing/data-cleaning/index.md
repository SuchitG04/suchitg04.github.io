---
title: "Data Cleaning and Augmentation"
toc: true
date: "2023-06-27"
author: "Suchit G"
description: "The counter-intuitive idea of data cleaning after training a model and creating data by ourselves."
image: "./pexels-elīna-arāja-3336523.jpg"
categories:
    - Data Processing
    - Beginner
---

## Data Cleaning

It is a pretty intuitive thought that data is cleaned before training a model so that the model achieves good accuracy. What's data cleaning in the first place? Naively, it is removing unrelated data that might have creeped through or removing data unrelated to what the model needs in training. I believe you get my point.

Let's take an example of a model that you are building to, say, classify between the faces of Elon Musk and Mark Zuckerberg. You'll probably download the images for your dataset from Google or Bing or any such search engines. With Mark rumored to be an alien and people taking a huge liking to the "female version" of Elon, it is very certain that your dataset will contain a few such memes.

![AI generated image of Mark Zuckerberg appearing to be an alien](./mark-alien.jpg)

*Alien Zuckerberg*

![AI generated image of a female version of Elon Musk](./elon-female.png)

*Elona Musk*

Now, sifting through the data in the hopes of finding such memes can be tedious. How about we let the model decide what images are faulty? Here's how it works. You quickly train a model, the "losses" and accuracies get recorded, and then you pop up some images in decreasing order of "loss" and/or accuracy (there are some tools already that can do that). There you go, the model now helped you find some black sheeps in your data that it found difficult to classify and/or has low confidence about.

## Data Augmentation

The world's gone dystopian and governments are crumbling, and Elon and Mark have decided to collaborate and take advantage of this calamity. You are the hero in this situation.

You observe that there is a lot of movement in and out of the abandoned Twitter office (Elon's selling tickets to Mars to the elites lol). Looks like someone's having some in-person meetings 🤨. Now you install a camera along with a image/video recognition model to alert you whenever Elon or Mark comes and goes in/out of the office, but you don't get even a single trigger for days!

You scratch your head thinking about what could be wrong for hours until you realise that you had trained the model using just headshots and few such "presentable" images that you scavenged from what's left of the internet, but you have installed your camera in such a place that it does not get such good images.

What's the solution you may ask? This is where Data Augmentation comes into the picture. You use this technique and apply certain effects on the images like cropping of random parts of the image, applying different colour filters, distorting the image, etc. Not only does this expand the dataset, but it also enables the model to better understand the object it is learning (Elon and Mark, in this case).

Here's an example of what data augmentation does:

![Examples of image transformations used for data augmentation](./data-aug.png)

Data augmentation is particularly useful when you have a small dataset. It helps bring some variance and helps avoid overfitting if done properly. Give this interesting article a read: [Regularization Effect of Data Augmentation](https://towardsdatascience.com/balancing-the-regularization-effect-of-data-augmentation-eb551be48374).

Cover photo by [Elīna Arāja](https://www.pexels.com/photo/black-and-white-collage-of-eyes-3336523/).

Thank you for reading my blog. You can reach out to me through my socials here:

- Discord - "lostsquid."
- LinkedIn - /in/suchitg04/

I hope to see you soon. Until then 👋
