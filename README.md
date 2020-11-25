<br />
<p align="center">
  <a href="/">
    <img src="https://fabricai.fi/wp-content/uploads/2019/09/FabricAI-Banner-Logo.png" alt="FabricAI Oy" width="730" height="150">
  </a>

  <h3 align="center">Free AI for everyone (for demonstration purposes)</h3>

  <p align="center">
    This repository provides <b>a trivial example</b> for demonstration purposes of an Deep Learning AI that can be trained to predict purchase invoices' routing, cost centers, accounts and vatStatuses.
  </p>
  <p align="center">
    This repo does <b>not</b> reflect how <a href="https://fabricai.fi/ai-inside/" target="_blank">AI Inside by FabricAI</a> is trained and used.
  </p>
</p>

<!-- ABOUT -->

## Warning

With this repository, anyone can **_technically_** claim

> "We have developed a Deep Learning AI with Tensorflow, that is tailored for our clients' purchase invoice data. Our Deep Learning models can achieve accuracy of over 95 %.".

So be aware of the marketing hype and only make judgements based on real data!

## About

Artificial Intelligence in accounting is quickly gaining interest in larger corporations and government agencies, who are trying to both increase quality and lower cost of their purchase invoice processes.

Nowadays, it seems that traditional RPA and manual rule-based solutions have had their time in the spotlight, and everyone is either

-   planning to, or
-   actively investigating on how to

implement a custom Deep Learning AI into their purchase invoice processes.

Currently most [advanced Deep Learning AI solutions](https://fabricai.fi/) are used everyday by SMEs who are using Netvisor, Procountor, Fivaldi or Tripletex as their accounting software.

This repository is meant to be a warning to anyone who is planning to invest in a custom AI project:

-   without a deeper understanding on what an AI is, and
-   how an AI actually works.

With this repository, anyone with minimal coding experience and no AI experience, can train their own Deep Learning AI with Tensorflow to predict purchase invoices' `routing`, `cost centers`, `accounts` and `vatStatuses`.

## Note

There are currently [off-the-shelf options](https://github.com/fabricai/ai-inside) for purchase invoice AI that can be objectively compared and evaluated.

## Getting started

By running this code you have trained a Deep Learning AI that can (technically) predict with more than 95 % accuracy.

### Prerequisites

You need to have installed:

-   [Node.js](https://nodejs.org/en/) version 12.x or 14.x
-   [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

and Typescript

```sh
  npm install -g typescript
```

### Installation

Clone this repo

```sh
  git clone https://github.com/fabricai/invoice-prediction-trivial-sample.git ; cd ./invoice-prediction-trivial-sample
```

Then run

```sh
  npm install ; tsc
```

### Usage

Run

```sh
  node build
```

This will:

-   Generate training and validation data sets with `--noise={noise}`
-   Generate other files required for training the model
-   Train the model for `--epochs={epochs}`
-   Print out the accuracy (who many of the unseed samples were correct)
    -   If you only run `node build/` this will achieve validation accuracy of around 93,5 %
