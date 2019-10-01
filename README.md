# Week 9 Day 4: OAuth Studio

# Studio Design
- prepacked code
- install and run
- design prompts of ways to use the server to see the outcome
    - tie them to the different components of the oauth flow
    - display content on the page that describes each step as it occurrs
- success / failure dialog for each step
    - initiate authentication / authorization button
    - redirect successful
    - code received by app server
        - separate branch that implements an AJAX request to send the code
    - server completed / failed handshake with provider 
- present the components of the app server and client side by side with an oauth flow diagram
    - what role does each component play in terms of security
- purpose is not to write the code but be educated on participating in the flow
- github API navigation tips
- lesson notes for teaching  
- serve client content from app server
    - bonus mission separates client (served by python server) from app server and introduces CORS
    - discuss what CORS is
    - mention that this is a browser policy that can be circumvented by headless requests
    - discuss but without implementation for black/white list 
    - how to fix the error

- use paths to separate the different fixes
    - next will change the request path
    - shows what was fixed with a code snippet
    - 

# Background
In your professional career as a developer you will undoubtedly encounter new languages, frameworks, libraries and design patterns. Initially you want to focus your efforts on a single language and framework to expediate your path to employability. Spreading yourself thin across too many technologies will lead to a "jack of all trades master of none" outcome.

At this point you are likely feeling comfortable working with the Java language and the Spring framework and its associated utilities like Hibernate. You have also been exposed to some client-side (in the browser) JavaScript and maybe even the JQuery library. You should be familiar with the concepts of AJAX requests and its usage in making asynchronous HTTP requests through JavaScript.

In today's studio we will explore another side of JavaScript. While JavaScript was initially conceived as a language to be run in the browser it has since expanded to be used in a "headless" state outside of the browser. 

We will be creating a simple NodeJS API server to use as the backend component in an Authorization Code / Web Application OAuth Flow implementation with GitLab. Before we begin let's explore what NodeJS is and how it is used. 

## NodeJS
Recall that JavaScript is an interpreted scripting language. Instead of compiling the code before execution, like Java, it is instead interpreted and compiled at run time. JavaScript is a dynamically typed language while Java uses static typing. One of the downsides to this approach is that JavaScript is not "type safe". Errors are discovered at run time rather than compile time.

JavaScript execution an engine that . 

Every modern browser has its own engine, the most famous (and performant) of which is the Google V8 JavaScript Engine. In browsers this engine works inside the JavaScript browser runtime which provides APIs for interacting with the host machine and other browser features. For example the runtime will provide mechanisms for JavaScript to interact with user events like mouse and keyboard clicks.

In 2010 a new JavaScript runtime was released called NodeJS. NodeJS uses the V8 engine under its hood but exposes a different set of APIs. Its purpose was to provide a runtime that was "headless" meaning it can be run without a browser GUI. Rather than providing UI based APIs like a browser NodeJS exposes file system APIs as it is designed to be run from the command line.

One of the hardships that client-side JavaScript faces is a requirement to support 100% backwards compatibility. Websites have been using JavaScript since it was released in 1995. Decades of different versions (JavaScript standards) have been used on the internet. If any new additions or changes to the language break those previous versions then older websites would cease to function. There is no feasible way to reach out and enforce these site owners upgrading to newer JavaScript so backwards compatibility is a must.

In contrast, server-side NodeJS does not have these issues. Or at least the baggage it does have only extends back to its release in 2010 when JavaScript had already matured quite a bit. In addition, because NodeJS is used for developing web application servers it is often a high priority for teams to upgrade more frequently for security and performance benefits. 

Because NodeJS is used on your local or cloud hosted machine it has no dependency on what users have installed on their machines. As a result the NodeJS runtime can support the most modern syntax by simply upgrading it to the version with the features you would like to use.

NodeJS also contains a more hearty, while still relatively sparse, standard library. With out of the box support for common web development features like file system access and performant HTTP abstractions.

## NodeJS On the Web

One of the reasons NodeJS has become so popular in web development is its capabilites when used as an HTTP server. 

NodeJS, like JavaScript, is a single threaded language. It has been designed from the ground up to not expose any blocking capabilities. It uses an event loop to handle tasks asynchronously that would normally block its thread.

This means that all of its IO (in/out) operations are inherently non-blocking. Web servers are most concerned with IO capabilities. What are some common IO operations a web server may encounter? 

An incoming request, backend requests to data stores, and sending responses are all IO operations. In reality these are the most common use case of a web server. 

A good analogy to compare Java to NodeJS is to think in terms of brain power and number of hands. Java has a massive brain but only two hands. NodeJS has a small brain but the capability of millions of hands.

The brain (CPU) is what is needed for intensive calculations. Not many languages can outperform Java in that  

If you have a CPU intensive calculation to perform that large brain will outperform NodeJS and even C++ in some cases. But IO has to do with the number of available hands.   


 

## Node & NPM Basics
NodeJS is a JavaScript runtime environment that can be installed on your local (or cloud hosted) machines. When NodeJS is installed it comes prepackaged with NPM, the Node Package Manager. NPM, like all package managers, is a host and CLI for packages ranging from small utilities to full blown frameworks.

Because JavaScript as a standard has a very thin standard library (compared to nearly every other language) most common tasks and utilities can either be hand written or installed from NPM. The JavaScript ecosystem, for better or for worse, has a tremendous number of packages with solutions for nearly every problem you may come across. Searching for "problem you have + NPM" will likely result in a package link.

Be wary that while NPM does audit package code you are still ultimately responsible for everything you install. This has as much to do with security as it does with maintenance and support. Don't install something unless its worthwhile and looks to have longevity. 

Some tips for finding worthwhile packages are:

- is it in active development?
    - **do the maintainers of this package intend to fix or improve it?** 
    - are repo issues being engaged with by the package maintainers?
    - are there updates within the last several months? 
- is it popular?
    - **will this package be maintained and updated long term because of community demand and involvement?** 
    - is this a solution that many people have written tutorials or have active forum discussions about?
    - is this something the community at large tends to reccommend?
    - 

To use NodeJS you run it from the command line starting with the program `node` and the path to the JavaScript file you'd like to execute:

```sh
$ node script.js
```

NPM can be used from the command line to search, install, upgrade and perform security audits on packages. It behaves similarly to Maven and Gradle in that there is a CLI along with a configuration file (like a `build.gradle`). NPM uses a file called `package.json` to store its configuration. 

To begin using NPM in a project you first initialize it running the `init` command :

```sh
$ npm init
```

# Side By Side Java and NodeJS

# Steps

# setup
- [axios docs](https://www.npmjs.com/package/axios)

# GitLab
- [GitLab OAuth Provider docs](https://docs.gitlab.com/ee/api/oauth2.html#web-application-flow)

