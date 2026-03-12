# Captcha design pattern

> Source: https://ui-patterns.com/patterns/Captcha

---

# Captcha
 
 Design Pattern


 
 
 
 
 
 
 
 
 

 
 

 
 
 

 

 
 
 
 
 
 - Design Patterns

 - Getting input

 - Forms

 
 - Captcha

 

 
 
 
 

 
 
 


 


 
 
 - Good Defaults

 - Sort By Column

 
 


 
 
 
 
 
 69% 
 of 321 votes liked this 
 
 
 

 

 
 
 
 
 
 


 
 
 

## Problem summary


 
 The application needs to verify that the data submitted originates from an actual human and not a robot.


 

 

## Example


 
 
 

 
 

## Usage


 Websites featuring the ability for visitors to comment, register as a user, or otherwise actively post content on the website are often exposed to attacks from spam-robots. The content posted by such spam-robots can be compared to spam sent by e-mail. The main purpose of spam-robots on the web is to create and spread links to a specific website, in order to increase the websites search rating on search engines like google.com. These spam-posts rarely have anything to do with the subject of the website, hence the spam categorization.


To avoid such spam, captchas are introduced. The whole idea behind Captchas is to create a way to distinguish real human beings from automated robots.


 
 - Use when your web application experiences attacks from malicious web-robots trying to post spam-content on your site

 - Use to protect your website from automated robots

 - Use when the capability to post content to your website is not blocked by the need to be logged in. Registration processes are included.

 
 
 
 
 
 
 

 

 
 
 
 

## More examples


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 See all 13 example screenshots 
 
 

 
 
 

## Solution


 
 The most popular form of Captchas are images that represent letters and numbers inside. The user is prompted to write in a separate form field what the image reads in a separate form field. To prevent spammers from using OCR software to read the image, the image is manipulated in different ways, which makes it hard for computers while maintaining readability for humans.


If the user succeeds in typing what the image says, his content is posted to the website. If not, the action will be refused. It is common to allow a number of tries to enter the captcha text, as some captcha images are even unreadable to humans due to the strong image manipulation is has been exposed to.


 
 

## Rationale


 
 Captchas are short for &#8216;Completely Automated Public Turing test to tell Computers and Humans Apart&#8217;. The whole idea behind Captchas is to distinguish humans from computers letting the user perform an action a computer can&#8217;t. A captcha is a simple Turing test.


There is a fine line between making a captcha unrecognizable for OCR scanners and still readable for human beings. Readability for the human has to come first. Other problems with implementing captchas to protect your website include a lock-out from visually impaired users as they can&#8217;t use voice software to speak what the captcha reads.


Other forms of protection from malicious spammers are asking questions like &#8220;what is 2 + 3&#8221; or &#8220;what is two plus three&#8221; or using voice captchas,


 


 
 
 This article has been commented 6 times .
 
 

 
 
 6 
 
 
 127 
 194 
 
 
 
 
 
 
 
 
 
 

 
 
 

## More examples of the Captcha pattern
 See all 13 example screenshots


 
 

 
 

 

 

 
 25 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 14 
 0 
 
 
 

 
 
 
 
 
 
 
 From youtube.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 8 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 7 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 5 
 0 
 
 
 

 
 
 
 
 
 
 
 From stumbleupon.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 9 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 10 
 0 
 
 
 

 
 
 
 
 
 
 
 From evelmerch.com 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 6 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 
 
 See all 13 example screenshots 
 
 

 

 
 
 
 

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


 

 
 

 
 
 
 
 


 
 
 
 
 
 

## 6 comments


 
 - #### Chris
 
 on Aug 26, 2008


 
 Perhaps what&#8217;s good practice as documented in this pattern should also be implemented in this &#8220;Post a comment&#8221; feature as well. UI-Patterns is lacking accessibility and refresh featires for your CAPTCHA.
Just an observation =)

 - #### Anders Toxboe
 
 on Oct 11, 2008


 
 Chris: You&#8217;ve got a good point there. But then again&#8230; you always have to compare the costs of implementing a better captcha to the potential benefits. In the case of UI-patterns.com, I believe that the potential benefits do not come close to matching the costs (time) of implementing it.
But definitely a good point ;-)

 - #### damasta
 
 on May 10, 2009


 
 40 to 60 percent of youtube captchas are human unreadable themselves, serously
also, I did the captcha on this site wrong twice too, but that&#8217;s just because I&#8217;m not wearing my contacts

 - #### online gambling forum
 
 on Jul 01, 2009


 
 Has anyone here tried to leave a comment with success. It&#8217;s nearly impossible. I refreshed the screen over 20 times to read the captcha. It always comes up as invalid. Try and let me know.My users are able to comment fine, but the Captcha images are kinda hard to read. There are others out there that are easier to read and still have the same effect, so maybe we could get ours updated.

 - #### Website Redesign
 
 on Aug 27, 2009


 
 Definitely, captcha is one thing thing that has controlled teh spam bots. As far as the human spamming is concerned, nofollow has done that. Though I am a strong believer that it all evens out in the end but still&#8230;

 - #### Web 2.0 Design
 
 on Aug 31, 2009


 
 Thnak you. The captcha can be an effective way of controlling comment spam.

 


 
 

## Comments have been closed
