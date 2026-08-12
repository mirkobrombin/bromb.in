---
title: "Yes, I use artificial intelligence"
description: "I have no intention of denying it, and I think it is worth explaining how."
layout: "post"
lang: "en"
date: "2026-08-04"
published: true
---

Every now and then, under one of my posts or in the comments to my tweets, the observation shows up: "it is pretty obvious that Mirko uses AI", usually it is not even an accusation, and some people go as far as saying they trust the way I use it. Still, I would rather not leave this open to interpretation: I use it, I have said it many times already, and I want to put it in writing once and for all.

## Time is the variable that matters

I have many projects to carry forward and the same twenty-four hours as everyone else, and Singularity is not a GTK theme: it is a desktop environment, a compositor, a widget framework, an operating system with a custom boot chain, transactional images and a permission model rethought from scratch, and anyone who has touched even one of these parts knows how much work is behind it. And to be clear: I have been working on the whole Singularity project for about three years, since the very first piece, Atom Loops, which at the beginning was just a small idea, booting the operating system from a loopback file and getting rid of partitions.

In a project like this, a huge part of the code does not require thought, it requires patience: mapping API values onto a struct, repeating the same pattern for the twentieth time with different names, writing the boilerplate that sits between an idea and its first interesting line, re-reading for the hundredth time documentation I have already read, things that teach me nothing and do not improve the project, they only take hours away from me and wear me down.

## What I delegate, and what I do not

I use AI for code comments and documentation, I am not good at commenting, it does not come naturally to me, and it takes a lot of my time: it is a weakness of mine and I have no problem admitting it, and the result is that today my code is documented better than it would be if I had kept doing it alone.

I use it for boilerplate, for the repetitive parts, for everything that is "look at this thing and implement another one just like it with different values".

I do not even let it invent freely: on Go projects I constrain it to my SDKs, go-foundation above all, so it moves inside a super set I know by heart instead of coming up with its own solutions or shortcuts that, in any case, I would catch, because I review everything.

I do not use it to design: the architecture, the complex logic, the security model, the sandbox, the design and the user experience remain mine, not out of pride, but because that is exactly the part I love, it is the reason I do this work, and delegating it would take away the craft, not the weight.

I do use it to reason though: before writing a single line I discuss the idea, I have it look for the weak spots, the cases I have not considered, what would break three months later. And make no mistake, I bother a lot of people about my projects, and many problems surface just by talking about them, but the ones I catch this way, before I even have to face them, are more, and each of them is weeks or months of useless work saved, and time is not just money: it is energy, it is mental health.

## It lets me aim at something bigger

This is the part almost nobody considers, because Singularity OS is the system I always wanted to build, and the funny thing is that most of it already existed: the boot chain, booting the whole system from an image file instead of partitions, the update model, things I had designed and written down years ago and had then made my peace with, nice but realistically I will never build it.

The wall was not the design, it was actually writing it and above all actually testing it, because when you work on a boot chain or on a permission model with no privilege escalation it is not enough for the code to compile: it has to return exactly the value you expect, under every condition, and that work is made of cycles, I change a limit, I rerun the test, it does not match, I change again, I rerun, for hours, for days.

Today I can say: this endpoint must return this exact value, and let an automated loop insist until it gets there, handing me back only the assertion that failed, so I know where to step in. And when I have thirty ideas on how to solve a problem, I can leave an agent to try them all and find out which one holds, instead of picking two by gut feeling because the other twenty-eight would cost too much time.

The result is not that I write the same software faster, it is that a project I had shelved as unrealistic is in people's hands today.

## Automating is nothing new

On Bottles I had almost two hundred open issues, there were years when I would close a dozen and just as many would come in, I simply could not keep up. Today that backlog is under control, but it is not like AI closed them on its own: we started the way it has always been done, me on one issue, then another, then another one still, until I said wait, I see a pattern here, and I put an agent on finding it, on filtering the real issues from the invalidated or badly formatted ones, the bugs still present from the ones long gone, the feature requests from the actual bugs, and finally on splitting everything into batches by similarity, so I would not lose my mind. From there the loop was simple: I provided the fix, the AI tested it.

It is not like I did not try before: I got notifications on Telegram, I had scripts to act in bulk on similar issues, a Levenshtein distance algorithm to spot duplicates, I automated with what I had, and I do not pretend to compare those scripts to a model, they did a much dumber and much more limited job, but the direction was already that one. Artificial intelligence did not change my philosophy, it raised my ceiling by a lot.

## The same rule applies to everyone else

When someone opens a pull request, I do not care whether they wrote it by hand, with a model, or with the help of a friend, I do not ask and I do not try to guess, I look at the code: if it is good, if it follows the project's conventions, if it does what it says it does, it goes in, otherwise it does not.

I find it makes little sense to apply to myself a different standard than the one I apply to others: the measure is the quality of the result, not the biography of the tool.

## A tool, not a shortcut

The open source world has been arguing for years about tools that change the way we write software: from the first IDEs to linters, from code generators to package managers, the same dynamic every time, and every time the useful question is not "did you use it?", but "does the result hold up?".

Artificial intelligence has real problems, and I do not want to pretend otherwise: energy use, licenses, datasets, the concrete risk of someone using it to fill repositories with code they have never read, these are discussions worth having, but about the real consequences, not about the use itself, otherwise we stay at the surface, as often happens when a complex matter gets reduced to a stance.

## Study, and aim higher

If there is one piece of advice I feel like giving, especially to those who are starting now, it is to study: do not rely on AI for everything, because if you cannot recognize a mistake in what it writes you are not delegating the mechanical work, you are delegating the understanding, and that does not come back. These tools amplify what you know: if you know little, they amplify little! Do not be stingy with your ambitions: I picked up again an operating system I had shelved as unrealistic, and I see no reason why your ideas should be smaller than mine. The ceiling has risen for everyone, it would be a shame to keep designing as if it were still low.

And let's face it: this is the direction our craft is moving in, not a passing trend. I do not think those who do not use it today will vanish tomorrow, but in a few years the difference between those who moved forward and those who stood still will not be made by the tool itself, it will be made by those who kept studying while learning to use it, and those who instead kept arguing about whether it was even acceptable to touch it.

## The time I take, and who I take it from

At this point someone would say: then cut down the number of projects, but I carry them forward because I love them, and because I would like to build something that stays in people's lives, something worth being remembered for.

There is another thing though, and it is the one that weighs the most: the hours I spend chasing a test that does not match, or rewriting the same pattern for the twentieth time, I am not taking them away from another project, I am taking them away from the family I am building, and my time is limited like everyone's, I do not want to choose between the two, I want them to live side by side.

When someone tells me that using AI is a shortcut, this is what I think about: I am not cheating on a school test, I am trying to fit two lives into one, and every hour I do not spend on mechanical work is an hour that goes back where it truly matters.
