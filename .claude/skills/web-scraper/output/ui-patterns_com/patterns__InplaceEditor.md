# Inplace Editor design pattern

> Source: https://ui-patterns.com/patterns/InplaceEditor

---

# Inplace Editor
 
 Design Pattern


 
 
 
 
 
 
 
 
 

 
 

 
 
 

 

 
 
 
 
 
 - Design Patterns

 - Getting input

 - Forms

 
 - Inplace Editor

 

 
 
 
 

 
 
 


 


 
 
 - Good Defaults

 - Sort By Column

 
 


 
 
 
 
 
 79% 
 of 192 votes liked this 
 
 
 

 

 
 
 
 Alternate titles:
 Direct Manipulation.


 
 


 
 
 

## Problem summary


 
 The user needs to quickly and easily edit a value on a page


 

 

## Example


 
 
 

 
 

## Usage


 
 - Use when the user only needs to edit one value (or very few) and not many

 - Use when the value the user needs to edit is of a simple format, i.e. a text string, in a dropdown box.

 - Use if you want the user to be able to edit a value without actually going to an administration page, but by staying on the same page.

 
 
 
 
 
 
 
 
 
 
 

 
 

### This card is part of the UI Patterns printed card deck


 A collection of 60 User Interface design patterns, presented in a manner easily referenced and used as a brainstorming tool.


 Get your deck! 
 
 
 
 

 

 
 
 
 

## More examples


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 See all 2 example screenshots 
 
 

 
 
 

## Solution


 
 Let users edit values in the same place as they are displayed. Provide an easy way to let users edit parts of a page without having to be redirected to an edit page. Typically, hover effects are used to invite editing.


The Inplace Editor pattern allows for localized editing of elements on the fly. The pattern provides ease of editing by placing the controls right next to the elements they affect.


For example, when in editing mode of an application, a page title element will display editing controls when the user hovers their mouse over it. The elements background color is highlighted and a tooltip is shown prompting the user to click the element to edit it. Once the user clicks the element, it is transformed into an input field (text, dropdown, etc.). A save button and a cancel button are also displayed. Often, the input field matches the styling of the original element. If the original element was a header written in size 20pt, the size of the font in the input field would also be 20pt. This styling is mirrored to ensure that the user can connect the original element with the new editable


The user can then edit the value of the input field (which is the same as the original elements value) and click save or cancel. If ‘save’ is clicked, the value is saved through an AJAX call to the underlying database, the value of the element is updated and the element is returned to normal view. If cancel is clicked, the element is changed back to the original view without any changes.


This pattern is often combined with AJAX techniques, which is an asynchronous call to the server through javascript that does not require a refresh of the page. There are many javascript libraries available online that deliver ready-to-use inplace editors.


 
 

## Rationale


 
 An in-place editor provides an easy way to let the user edit parts of a page without having to be redirected to an edit page. Instead, the user can just click around on a page and edit the elements he or she wishes to change – without reloading the page.


 


 
 
 This article has been commented 4 times .
 
 

 
 
 4 
 
 
 115 
 77 
 
 
 
 
 
 
 
 
 
 

 
 
 

## More examples of the Inplace Editor pattern
 See all 2 example screenshots


 
 

 
 

 

 

 
 28 
 1 
 
 
 

 
 
 
 
 
 
 
 From facebook.com 
 
 
 
 
 
 
 
 
 
 
 
 


 

 
 
 See all 2 example screenshots 
 
 

 

 
 
 
 

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


 

 
 

 
 
 
 
 


 
 
 
 
 
 

## 4 comments


 
 - #### Lindsey
 
 on May 28, 2008


 
 Very useful! I love this feature in Google docs&#8230;I&#8217;m able to edit the title of a document without leaving the page or dealing with a popup window. One of the best UI developments I&#8217;ve seen recently.

 - #### Peter
 
 on Aug 15, 2008


 
 I would add a bullet to the usage list:

 Use when there is a clear distinction between verb and information (Don&#8217;t mix words that are links and actions with words that can be edited).

 
I.e. &#8211; the text that can be edited shouldn&#8217;t contain verbs (links, actions), only information. If the texts on the page are intermixed information and verbs, than do not use inline editing. This is based on maintaining a clear distinction between usage and administration.


 
 
 
 - #### syed sabir
 
 on Sep 24, 2010


 
 This type feature is available in meebo too&#8230;

 - #### Jay K
 
 on Oct 26, 2010


 
 The affordance that Google Contacts (consumer edition, not the enterprise edition) gives upon mouseover &#8212; displaying an input box around the text &#8212; is much clearer to my mind than a simple highlight. I think this will become more and more popular.

 


 
 

## Comments have been closed
