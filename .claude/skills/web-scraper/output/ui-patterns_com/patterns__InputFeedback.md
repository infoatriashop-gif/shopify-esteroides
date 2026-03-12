# Input Feedback design pattern

> Source: https://ui-patterns.com/patterns/InputFeedback

---

# Input Feedback
 
 Design Pattern


 
 
 
 
 
 
 
 
 

 
 

 
 
 

 

 
 
 
 
 
 - Design Patterns

 - Getting input

 - Forms

 
 - Input Feedback

 

 
 
 
 

 
 
 


 


 
 
 - Account Registration

 - Rate Content

 
 


 
 
 
 
 
 79% 
 of 373 votes liked this 
 
 
 

 

 
 
 
 Alternate titles:
 Confirmation notice, Error notice, Alert, Inline Form Validation.


 
 


 
 
 

## Problem summary


 
 The user has entered data into the system and expects to receive feedback on the result of that submission.


 

 

## Example


 
 
 ▲ When signing up at twitter, you instantly, as you type, receive feedback to what you have typed.


 

 
 

## Usage


 
 - Use when you want to provide feedback to the user upon submitting content to your site.

 - Use when you want to notify your users about errors that happened during form submission.

 - Use when you want to let your users know that everything went as planned upon content submission.

 
 
 
 
 
 
 

 

 
 
 
 

## More examples


 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 See all 19 example screenshots 
 
 

 
 
 

## Solution


 
 When users submit content to your site via forms, errors in the are bound to happen from time to time. The goal of this pattern is to improve the user experience by minimizing input errors.


A paradigm called data validation is well suited for catching errors at the time of submitting a form. A common way to tell if data validates is to set up rules for each input field in the form. The data entered must pass these rules to be considered valid. Such validation rules can be:


 
 - Validate presence of content &#8211; at least some content must be entered

 - Validate exclusion of content &#8211; prohibited values &#8211; for instance inserting &#8216;admin&#8217; as username

 - Validate inclusion of content &#8211; data must contain certain data or must be within a certain range

 - Validate acceptance (of for instance terms of service) &#8211; often with a checkbox

 - Validate confirmation &#8211; two input fields needs to match &#8211; seen with for instance passwords

 - Validate format &#8211; an email for instance needs an &#8216;@&#8217; sign and a number of dots
- for instance that the user must be above 18 year of age.

 - Validate length &#8211; A password must in many cases be at least 6 characters long.

 - Validate uniqueness &#8211; Many systems only allow one user with a given username

 
If the data submitted by the user validates, it is good practice to let the user know that everything went as planned. Even better, redirect the user to a page, where he or she can see the newly submitted content in a context.


However, if the data submitted by the user does not validate, an error message should be presented to the user explaining how to correct the data and request for a re-submit. Such an error message should explain that:


 
 - An error has occurred. Display box at the top of the page (so that the user does not need to scroll the page to find out that an error occurred), preferably colored red to signal an error.

 - Where the error occurred. This can be done by listing the fields that caused the error in the error message, as well as highlighting the fields (by changing their colors) that caused the error.

 - How the error can be repaired. Provide information on what needs to be different in order for the field to validate. This can either be listed in the top error box or directly next to the field causing the error.

 
The visual representation of the input feedback should correspond with the message you want to give. If the submission went successfully, consider letting the user know in a green box. If the message is neutral, a color often used is yellow. If something went wrong, red is often used. But beware &#8211; red means danger &#8211; is the user experiencing a dangerous situation?


 
 

## Rationale


 
 As the user fills out a form on a web page, he or she is conducting the process of converting mental data structured in one way to a written form structured in another way. As all humans do not think alike, we are bound to enter the data in different ways as we try to convert our individually structured data to a shared structure defined by the system.


Data entered in web forms is prone to contain errors, which we must be prepared for in our design. The user must be made aware of the fact that the data entered did not match the structure that we designed for. Using visually distinct feedback notices, the user will be made aware of such errors and how to correct them.


 
 

## Discussion


 
 It can be argued that you should focus more on preventing errors before the user submits his or her data than on providing a good error message after data has been submitted. Consider constraining input with select boxes.


Consider the language of your error messages, as these may have an emotional impact on your users. What tone of voice is appropriate for your users?


### Provide clear feedback after every action


Users will feel more confident and informed when they receive feedback from the system. Feedback includes notifications, dialog message boxes, colored or disabled buttons, loading animations, inline alerts, tooltips, hover effects and so on. Bridge the gap created between performing an action and evaluation of the system after an action.


 


 
 
 This article has been commented 5 times .
 
 

 
 
 5 
 
 
 220 
 153 
 
 
 
 
 
 
 
 
 
 

 
 
 

## More examples of the Input Feedback pattern
 See all 19 example screenshots


 
 

 
 

 

 

 
 22 
 0 
 
 
 

 
 
 
 
 
 
 
 From linkedin.com 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 36 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 24 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 14 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 34 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 33 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 22 
 0 
 
 
 

 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 

 
 3 
 0 
 
 
 

 
 
 
 
 
 
 
 From diapers.com 
 
 
 
 
 
 
 
 
 
 
 
 
 


 

 
 
 See all 19 example screenshots 
 
 

 

 
 
 
 

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


 

 
 

 
 
 
 
 


 
 
 
 
 
 

## 5 comments


 
 - #### Jasper Kennis
 
 on Mar 20, 2008


 
 A great method, witch I think works best if you use both a warning at the top of the form, and one at the &#8220;breaking point&#8221; location, so that the user is quickly attended somethings wrong, and can then easily find where he&#8217;s made his mistake.

 - #### satyashish
 
 on May 22, 2008


 
 I always come across this dilemma: Inline vs modal pop-up message box. In which context we should use each of them.
Pls provide a Pattern for the modal window message/ error message.

 - #### Mohammed Alaa
 
 on Jun 20, 2008


 
 i like the idea of linked in and i love the inline validation method
thanks for sharing your information,
Mohammed

 - #### Michael Parenteau
 
 on Sep 03, 2009


 
 Sorry&#8230;
I just re-read the article and use cases&#8230; because I would think that LinkedIn is hip to the as input fields are entered & out-of-focus validation. It says:
&#8220;Use when you want to notice your users about errors that happened during form submission.&#8221;
However, it then also says, &#8220;Upon Submission&#8221;&#8230;
What is being covered here? I guess I am not clear as to what is being said.

 - #### web design egypt
 
 on Nov 09, 2009


 
 yeah Michael .. I am tottaly agree with you

 


 
 

## Comments have been closed
