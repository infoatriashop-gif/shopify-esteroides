# Rule Builder design pattern

> Source: https://ui-patterns.com/patterns/rule-builder

---

# Rule Builder
 
 Design Pattern


 
 
 
 
 
 
 
 
 

 
 

 
 
 

 

 
 
 
 
 
 - Design Patterns

 - Getting input

 - Forms

 
 - Rule Builder

 

 
 
 
 

 
 
 


 


 
 
 - Pull to refresh

 - Halo Effect

 
 


 
 
 
 
 
 73% 
 of 185 votes liked this 
 
 
 

 

 
 
 
 Alternate titles:
 Query Builder, Smart Filter, Segment Builder.


 
 


 
 
 

## Problem summary


 
 The user needs to, often repeatedly, conduct a search query based on a custom set of rules


 

 

## Example


 
 
 ▲ An example of binding a remove rule button to each rule and of providing an input for setting the matching criteria for the rules


 

 
 

## Usage


 
 - Use to build a search query based on several conditions

 - Use to save a segment rather than static selection

 - Use to help users build dynamic lists, making the selected rules static rather than the actual search result

 - Use when a search query involves an unknown number of undefined conditions

 - Do not use when users can find what they need using only a text input.

 - Do not use when the type of search query requires the same types of variables to be chosen every single time.

 
 
 
 
 
 
 

 

 
 
 
 

## More examples


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 See all 6 example screenshots 
 
 

 
 
 

## Solution


 
 Let the user build a dynamic list of rules to narrow down matching results from a dataset. Each rule is represented by a separate line or box and divided from each other vertically.


### Any or all


The user must specify whether a rule is needed (AND) or is optional (OR). A common approach to simplify the implementation of this pattern is to provide an option to choose whether all rules chosen should be matched – or just any of the rules.


A more nuanced approach is to allow each rule to be a required match or just an optional match.


### Treat each rule type differently?


As the user choses the kind of rule he or she wants to impose, those rules can have very different impacts on what corresponding data needs to be entered for the rule to give meaning.


This is why many rule builders provide smart mini-forms that vary depending on what kind of rule is selected. One rule might impose a text search, wherein options like &#8220;contains&#8221;, &#8220;does not contain&#8221;, &#8220;matches&#8221;, or &#8220;do not match&#8221; make sense. Other rules could be to select an option from a dynamic list or to provide numeric- or range inputs.


### Adding and removing rules


The smartest feature rule builders provide is to dynamically add and remove rules.


The &#8220;Add&#8221; button is typically located either directly under the rules and remains so as new rules are added or removed, or it located alongside the remove rule button. In the case of the latter, this allows for new rules to be inserted directly beneath a desired rule.


Removing a rule is most often allowed at the beginning or end of the line the rule is presented on.


 
 

## Rationale


 
 A rule builder allows a user to specify unique conditions to discover and group items across one or more datasets.


The results returned by an active rule can be dynamic in nature as its related datasets change over time. An active rule can trigger a set of actions to be performed when the conditions, criteria and values of the rule are met. Rules sets can be grouped into discrete units and linked together with condition logic to create highly complex rule conditions.


 
 

## Discussion


 
 

### Pattern authors


 
 - Richard Barrett

 - Anders Toxboe

 
 

 
 
 Sources
 
 
 1 UI design for rule builder by Two Rivers Consulting


2 Interesting StackExchange discussion


 
 

 
 
 
 88 
 97 
 
 
 
 
 
 
 
 
 
 

 
 
 

## More examples of the Rule Builder pattern
 See all 6 example screenshots


 
 

 
 

 

 

 
 5 
 0 
 
 
 

 
 
 
 
 
 
 
 From g2crowd.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 3 
 0 
 
 
 

 
 
 
 
 
 
 
 From blogs.oracle.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 9 
 0 
 
 
 

 
 
 
 
 
 
 
 From blog.frevvo.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 5 
 0 
 
 
 

 
 
 
 
 
 
 
 From help.talon.one 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 5 
 0 
 
 
 

 
 
 
 
 
 
 
 From easyforms.baluart.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 
 
 See all 6 example screenshots 
 
 

 

 
 
 
 

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
