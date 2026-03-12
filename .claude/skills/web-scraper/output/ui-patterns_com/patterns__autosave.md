# Autosave design pattern

> Source: https://ui-patterns.com/patterns/autosave

---

# Autosave
 
 Design Pattern


 
 
 
 
 
 
 
 
 

 
 

 
 
 

 

 
 
 
 
 
 - Design Patterns

 - Getting input

 - Forms

 
 - Autosave

 

 
 
 
 

 
 
 


 


 
 
 - Flagging & Reporting

 - Morphing Controls

 
 


 
 
 
 
 
 74% 
 of 280 votes liked this 
 
 
 

 

 
 
 
 
 
 


 
 
 

## Problem summary


 
 The user wants to keep their data safe and saved while focusing on working without having to remember to do so.


 

 

## Example


 
 
 

 
 

## Usage


 
 - Use when you want to help the user focus on producing great content without worrying about whether their data is safe and saved.

 
 
 
 
 
 
 
 
 
 
 

 
 

### This card is part of the UI Patterns printed card deck


 A collection of 60 User Interface design patterns, presented in a manner easily referenced and used as a brainstorming tool.


 Get your deck! 
 
 
 
 

 


 
 
 

## Solution


 
 Prevent accidental data loss by automatically saving user input at fixed intervals or at events of interest.


Consider at what frequency it makes sense to auto-save inputted content for your application, and at what events it makes sense to trigger an auto-save. The most obvious event is clicking the save-button, but the event of moving the focus to another field might also be interesting to observe.


### The save button


To better guide users as to what state their document is in, consider changing the label of the save button from &#8220;Save&#8221;, when the form contains uncommited changes to &#8220;Saved&#8221; when the current form represents what has been saved in storage.


 
 

## Rationale


 
 Let users worry about creating great content rather than about loosing it. Removing the save button entirely can create fear, so consider keeping it around to make users feel safe. Leave an unobtrusive trace of conducted user actions and consider complementing with the Undo pattern.


 
 

## Discussion


 
 When implementing auto-save functionality, consider not removing the &#8220;Save&#8221; button. Users tend to panic, when there is no &#8220;Save and close&#8221; button. Even though the &#8220;Save&#8221; button does nothing or only closes the window, it provides confidence and reassurance in users that their data is safe. It&#8217;s an issue of trust. Did the system hear me? Am I sure that I am sure?


 


 
 
 
 138 
 142 
 
 
 
 
 
 
 
 
 
 


 

 
 
 
 

## User Interface Design Patterns


 
 
 
 
 
 Getting input 
 
 


 - Forms
 

 
 Drag and drop

 - Structured Format

 - Captcha

 - Rule Builder

 - Keyboard Shortcuts

 - Inplace Editor

 - Morphing Controls

 - Fill in the Blanks

 - Password Strength Meter

 - Input Feedback

 - WYSIWYG

 - Calendar Picker

 - Autosave

 - Preview

 - Expandable Input

 - Settings

 - Forgiving Format

 - Input Prompt

 - Undo

 - Good Defaults


 

 
 - Explaining the process
 

 
 Wizard

 - Inline Help Box

 - Completeness meter

 - Steps Left


 

 
 - Community driven
 

 
 Rate Content

 - Pay To Promote

 - Vote To Promote

 - Wiki

 - Flagging & Reporting


 

 
 

 
 
 
 
 
 Navigation 
 
 


 - Tabs
 

 
 Navigation Tabs

 - Module Tabs


 

 
 - Jumping in hierarchy
 

 
 Breadcrumbs

 - Shortcut Dropdown

 - Fat Footer

 - Modal

 - Notifications

 - Home Link


 

 
 - Menus
 

 
 Vertical Dropdown Menu

 - Accordion Menu

 - Horizontal Dropdown Menu


 

 
 - Content
 

 
 Adaptable View

 - Article List

 - Tagging

 - Pagination

 - Categorization

 - Cards

 - Carousel

 - Progressive Disclosure

 - Continuous Scrolling

 - Tag Cloud

 - Archive

 - Event Calendar

 - Thumbnail

 - Favorites


 

 
 - Gestures
 

 
 Pull to refresh


 

 
 

 
 
 
 
 
 Dealing with data 
 
 


 - Tables
 

 
 Alternating Row Colors

 - Table Filter

 - Sort By Column


 

 
 - Formatting data
 

 
 Frequently Asked Questions (FAQ)

 - Dashboard

 - Copy Box


 

 
 - Images
 

 
 Gallery

 - Slideshow

 - Image Zoom


 

 
 - Search
 

 
 Autocomplete

 - Search Filters


 

 
 

 
 
 
 
 
 Social 
 
 


 - Reputation
 

 
 Testimonials

 - Leaderboard

 - Collectible Achievements


 

 
 - Social interactions
 

 
 Activity Stream

 - Auto-sharing
 Mini

 - Chat

 - Friend list
 Mini

 - Invite friends

 - Friend

 - Follow

 - Reaction


 

 
 

 
 
 
 
 
 Miscellaneous 
 
 


 - Shopping
 

 
 Coupon

 - Pricing table

 - Product page

 - Shopping Cart


 

 
 - Increasing frequency
 

 
 Tip A Friend


 

 
 

 
 
 
 
 
 Onboarding 
 
 


 - Guidance
 

 
 Coachmarks

 - Playthrough

 - Guided Tour

 - Inline Hints

 - Walkthrough

 - Blank Slate


 

 
 - Registration
 

 
 Lazy Registration

 - Paywall

 - Account Registration


 

 
 

 
 
 
 
 
 
 
 
 

## Persuasive Design Patterns


 
 
 
 
 
 Cognition 
 
 


 - Loss Aversion
 

 
 Status-Quo Bias

 - Optimism Bias

 - Framing

 - Decoy Effect

 - IKEA effect

 - Loss Aversion

 - Sunk Cost Effect

 - Endowment Effect

 - Negativity bias


 

 
 - Other cognitive biases
 

 
 Illusion of control

 - Set Completion

 - Present Bias

 - Delay Discounting

 - Need for Closure

 - Curiosity

 - Priming Effect

 - Value Attribution

 - Peak-end rule

 - Temptation Bundling

 - Cashless Effect

 - Inaction Inertia Effect

 - Choice Closure


 

 
 - Scarcity
 

 
 Limited Choice

 - Scarcity

 - Limited duration


 

 
 

 
 
 
 
 
 Game mechanics 
 
 


 - Gameplay design
 

 
 Appropriate Challenge

 - Storytelling

 - Intentional Gaps

 - Investment Loops

 - Periodic Events

 - Hedonic Adaptation

 - Levels

 - Self-Monitoring


 

 
 - Fundamentals of rewards
 

 
 Variable Rewards

 - Fixed rewards

 - Shaping


 

 
 - Gameplay rewards
 

 
 Goal-Gradient Effect

 - Privileges

 - Unlock Features

 - Delighters

 - Achievements

 - Praise

 - Appointment Dynamic

 - Prolonged Play


 

 
 

 
 
 
 
 
 Perception and memory 
 
 


 - Attention
 

 
 Tunnelling

 - Reduction

 - Isolation Effect

 - Picture Superiority Effect

 - Zeigarnik Effect


 

 
 - Comprehension
 

 
 Chunking

 - Anchoring

 - Serial Positioning Effect

 - Recognition over Recall

 - Pattern Recognition

 - Conceptual Metaphor

 - Sequencing


 

 
 

 
 
 
 
 
 Feedback 
 
 


 - Timing
 

 
 Kairos

 - Feedback Loops

 - Tailoring

 - Trigger

 - Simulation

 - Fresh Start Effect


 

 
 

 
 
 
 
 
 Social 
 
 


 - Social biases
 

 
 Authority Bias

 - Liking

 - Retaliation

 - Role Playing

 - Self-Expression

 - Reciprocation

 - Social Proof

 - Cognitive Dissonance

 - Positive Mimicry

 - Commitment & Consistency

 - Reputation

 - Halo Effect

 - Nostalgia Effect

 - Competition

 - Autonomy

 - Status

 - Noble Edge Effect
